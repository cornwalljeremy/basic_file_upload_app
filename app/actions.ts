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
 * Checks if a file exists in the bucket
 */
export async function checkFileExists(fileName: string) {
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
    }));
    return true; 
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) return false;
    throw error;
  }
}

/**
 * Fetches the list of files
 */
export async function getS3Files() {
  try {
    const { Contents } = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
      })
    );
    return Contents?.map((file) => ({
      key: file.Key,
      size: file.Size,
      lastModified: file.LastModified,
    })) || [];
  } catch (error) {
    console.error("AWS List Error:", error);
    return [];
  }
}

/**
 * Uploads a file with logic for manual rename OR automatic (n) incrementing
 */
export async function uploadFile(formData: FormData, manualRename: boolean = false) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    let fileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. If user clicked "Rename & Save", we add a timestamp first
    if (manualRename) {
      const lastDot = fileName.lastIndexOf(".");
      const base = lastDot !== -1 ? fileName.substring(0, lastDot) : fileName;
      const ext = lastDot !== -1 ? fileName.substring(lastDot) : "";
      fileName = `${base}_${Date.now()}${ext}`;
    }

    // 2. Double check for duplicates and add (1), (2) if needed 
    let finalFileName = fileName;
    let fileExists = true;
    let counter = 1;

    while (fileExists) {
      const exists = await checkFileExists(finalFileName);
      if (exists && !manualRename) { // Only increment if we aren't overwriting
        const lastDot = fileName.lastIndexOf(".");
        const base = lastDot !== -1 ? fileName.substring(0, lastDot) : fileName;
        const ext = lastDot !== -1 ? fileName.substring(lastDot) : "";
        finalFileName = `${base}(${counter})${ext}`;
        counter++;
      } else {
        fileExists = false;
      }
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: finalFileName,
      Body: buffer,
      ContentType: file.type,
    }));

    revalidatePath("/");
    return { success: true, fileName: finalFileName };
  } catch (error) {
    console.error("Upload Error:", error);
    throw new Error("Failed to upload file");
  }
}

/**
 * Deletes a file
 */
export async function deleteFile(key: string) {
  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: key }));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete");
  }
}

/**
 * Renames a file (Copy + Delete)
 */
export async function renameS3File(oldKey: string, newKey: string) {
  try {
    const bucket = process.env.AWS_BUCKET_NAME!;
    await s3Client.send(new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${oldKey}`,
      Key: newKey,
    }));
    await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: oldKey }));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to rename");
  }
}