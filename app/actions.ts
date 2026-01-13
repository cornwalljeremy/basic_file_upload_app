"use server";

import { 
  S3Client, 
  ListObjectsV2Command, 
  PutObjectCommand, 
  HeadObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand, 
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

// Initialize the S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Fetches the list of files currently in the S3 bucket
 */
export async function getS3Files() {
  console.log("DEBUG - Region:", process.env.AWS_REGION);
  console.log("DEBUG - Bucket:", process.env.AWS_BUCKET_NAME);

  try {
    const { Contents } = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
      })
    );

    return (
      Contents?.map((file) => ({
        key: file.Key,
        size: file.Size,
        lastModified: file.LastModified,
      })) || []
    );
  } catch (error) {
    console.error("AWS List Error:", error);
    return [];
  }
}

/**
 * Uploads a file to S3 with automatic (n) renaming if the name exists
 */
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fileName = file.name;
    let fileExists = true;
    let counter = 1;

    // --- CHECK FOR DUPLICATES LOOP ---
    while (fileExists) {
      try {
        await s3Client.send(
          new HeadObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
          })
        );
        
        // If HeadObject succeeds, the file exists. Rename and try again.
        const lastDot = file.name.lastIndexOf(".");
        const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
        const extension = lastDot !== -1 ? file.name.substring(lastDot) : "";
        
        fileName = `${baseName}(${counter})${extension}`;
        counter++;
      } catch (error: any) {
        // S3 returns "NotFound" (404) if the key is available
        if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
          fileExists = false;
        } else {
          throw error;
        }
      }
    }

    // --- UPLOAD FINAL FILENAME ---
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    revalidatePath("/"); // Refresh the UI list
    return { success: true, fileName };
  } catch (error) {
    console.error("Upload Error:", error);
    throw new Error("Failed to upload file");
  }
}

/**
 * Deletes a file from S3
 */
export async function deleteFile(key: string) {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      })
    );
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete file");
  }
}
 export async function renameS3File(oldKey: string, newKey: string) {
  try {
    const bucket = process.env.AWS_BUCKET_NAME!;

    // 1. Copy the object to the new name
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${oldKey}`,
        Key: newKey,
      })
    );

    // 2. Delete the old object
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: oldKey,
      })
    );

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Rename Error:", error);
    throw new Error("Failed to rename file");
  }
}