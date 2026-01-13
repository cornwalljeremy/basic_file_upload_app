"use client";
import { useState, useRef } from "react";
import { uploadFile } from "../app/actions";

export default function UploadForm({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("uploads");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      await uploadFile(formData);

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onUploadSuccess();
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <select
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        className="bg-white dark:bg-gray-800 border p-2 rounded text-sm">
        <option value="images">Images</option>
        <option value="Sound Vision">Sound Vision</option>
        <option value="Network Manager">Network Manager</option>
        <option value="Riders">Riders</option>
        <option value="General">General</option>
      </select>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium disabled:bg-gray-400 hover:bg-blue-700 transition whitespace-nowrap">
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
