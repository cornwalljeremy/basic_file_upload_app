'use client';

import { useState, useRef, useEffect } from 'react';
import { checkFileExists, uploadFile, getS3Files } from './actions';

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]); // State for the file list
  const [isUploading, setIsUploading] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  
  // 1. Create the Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. Load files on mount
  const fetchFiles = async () => {
    const data = await getS3Files();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadClick = async () => {
    if (!file) return alert("Please select a file first");

    setIsUploading(true);
    try {
      const exists = await checkFileExists(file.name);
      if (exists) {
        setShowConflictModal(true);
        setIsUploading(false);
      } else {
        await executeUpload(false);
      }
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const executeUpload = async (shouldRename: boolean) => {
    setIsUploading(true);
    setShowConflictModal(false);

    const formData = new FormData();
    formData.append("file", file!);

    try {
      await uploadFile(formData, shouldRename);
      
      // --- THE FIXES ---
      setFile(null); // Reset React state
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset HTML input visually
      }
      
      await fetchFiles(); // Refresh the list after upload
      alert("Upload successful!");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">S3 File Manager</h1>
      
      <div className="flex gap-4 mb-8 items-center">
        <input 
          type="file" 
          ref={fileInputRef} // Attach the ref here
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded bg-white dark:bg-gray-800"
        />
        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded disabled:bg-gray-400 transition"
        >
          {isUploading ? "Uploading..." : "Upload to S3"}
        </button>
      </div>

      {/* --- FILE LIST --- */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files found in bucket.</p>
        ) : (
          <ul className="divide-y border rounded-lg overflow-hidden">
            {files.map((f) => (
              <li key={f.key} className="p-4 flex justify-between items-center bg-white dark:bg-gray-900">
                <span>{f.key}</span>
                <span className="text-sm text-gray-400">{(f.size / 1024).toFixed(2)} KB</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- CONFLICT MODAL --- */}
      {showConflictModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-2">File Already Exists</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <b>{file?.name}</b> is already in S3.
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => executeUpload(true)} className="bg-blue-600 text-white py-2 rounded font-medium">Keep Both (Rename)</button>
              <button onClick={() => executeUpload(false)} className="bg-red-600 text-white py-2 rounded font-medium">Replace Existing</button>
              <button onClick={() => setShowConflictModal(false)} className="text-gray-500 py-1 hover:underline">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}