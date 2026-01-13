"use client";
import { useState } from "react";
import { deleteFile, getDownloadUrl } from "../app/actions";

export default function FileList({ files, onRefresh, formatSize }: any) {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // 1. Extract unique folder names from the file keys
  const folders = Array.from(
    new Set(
      files
        .filter((f: any) => f.key.includes("/"))
        .map((f: any) => f.key.split("/")[0])
    )
  );

  // 2. Filter files: Show root files if no folder selected, or show files inside selected folder
  const displayedFiles = files.filter((f: any) => {
    if (!currentFolder) return !f.key.includes("/"); // Root files
    return f.key.startsWith(`${currentFolder}/`); // Files in folder
  });

  const handleDelete = async (key: string) => {
    if (!confirm(`Delete ${key}?`)) return;
    await deleteFile(key);
    onRefresh();
  };

  const handleDownload = async (key: string) => {
    const url = await getDownloadUrl(key);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      {/* Breadcrumb Navigation */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 text-sm font-medium bg-gray-50/50 dark:bg-gray-800/30">
        <button
          onClick={() => setCurrentFolder(null)}
          className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">
          Home
        </button>

        {currentFolder && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-bold px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
              {currentFolder}
            </span>
          </>
        )}
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {/* Render Folders (only if at root) */}
        {!currentFolder &&
          folders.map((folder) => (
            <li
              key={folder}
              onClick={() => setCurrentFolder(folder)}
              className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
              <span className="text-xl">📁</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {folder}
              </span>
            </li>
          ))}

        {/* Render Files */}
        {displayedFiles.map((f: any) => (
          <li
            key={f.key}
            className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
            <div className="flex items-center gap-3">
              <span className="text-xl">📄</span>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {currentFolder ? f.key.split("/").pop() : f.key}
                </span>
                <span className="text-xs text-gray-500">
                  {formatSize(f.size)}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleDownload(f.key)}
                className="text-blue-600 hover:underline text-sm font-semibold">
                Download
              </button>
              <button
                onClick={() => handleDelete(f.key)}
                className="text-red-600 hover:underline text-sm font-semibold">
                Delete
              </button>
            </div>
          </li>
        ))}

        {folders.length === 0 && displayedFiles.length === 0 && (
          <li className="p-8 text-center text-gray-500">Folder is empty</li>
        )}
      </ul>
    </div>
  );
}
