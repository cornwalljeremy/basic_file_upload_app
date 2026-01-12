"use server";

import { 
  S3Client, 
  ListObjectsV2Command, 
  GetObjectCommand, 
  DeleteObjectCommand, 
  CopyObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize the S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Fetches all objects from the S3 bucket
 */
export async function getS3Files() {
  try {
    const { Contents } = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
      })
    );
    
    // Log to server terminal for debugging
    console.log("Found in S3:", Contents?.length || 0);

    return Contents?.map((f) => ({
      key: f.Key,
      size: f.Size,
    })) || [];
  } catch (err) {
    console.error("AWS List Error:", err);
    return [];
  }
}

/**
 * Generates a temporary secure URL to download a private file
 */
export async function getDownloadUrl(key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    // URL expires in 1 hour (3600 seconds)
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (err) {
    console.error("Presigned URL Error:", err);
    throw new Error("Could not generate download link");
  }
}

/**
 * Deletes a file from the S3 bucket
 */
export async function deleteS3File(key: string) {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      })
    );
    return { success: true };
  } catch (err) {
    console.error("Delete Error:", err);
    return { success: false, error: err };
  }
}

/**
 * Renames a file by copying it to a new key and deleting the old one
 */
export async function renameS3File(oldKey: string, newKey: string) {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME!;

    // 1. Copy the object to the new name
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: bucketName,
        CopySource: `${bucketName}/${oldKey}`,
        Key: newKey,
      })
    );

    // 2. Delete the original object
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: oldKey,
      })
    );

    return { success: true };
  } catch (err) {
    console.error("Rename Error:", err);
    return { success: false, error: err };
  }
}