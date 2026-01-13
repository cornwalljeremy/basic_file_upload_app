"use client";
import { useRef, useState, useEffect, useCallback } from "react";
// Added renameS3File to the imports
// Change deleteS3File to deleteFile
import { getS3Files, uploadFile, deleteFile, renameS3File } from "./actions";

interface S3File {
  key: string;
  size: number;
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<S3File[]>([]);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  // 1. PURE DATA FUNCTION
  const loadFileData = useCallback(async () => {
    try {
      const data = await getS3Files();
      return (data || []).map((f) => ({
        key: (f as { key: string }).key || "unknown",
        size: (f as { size: number }).size || 0,
      }));
    } catch (error) {
      console.error("Data loading error:", error);
      return [];
    }
  }, []);

  // 2. THE EFFECT
  useEffect(() => {
    let isMounted = true;
    loadFileData().then((formattedFiles) => {
      if (isMounted) {
        setFiles(formattedFiles);
      }
    });
    return () => { isMounted = false; };
  }, [loadFileData]);

  // 3. REFRESH HELPER
  const refreshList = async () => {
    const data = await loadFileData();
    setFiles(data);
  };

  async function uploadFile() {
    if (!file) return;
    setUploading(true);
    setStatus("Uploading...");
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (res.ok) {
      setStatus("Upload successful ✅");
      setFile(null);
      await refreshList();
    } else {
      setStatus("Upload failed ❌");
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <main style={{ padding: 40, maxWidth: 800, fontFamily: "sans-serif" }}>
      <h1>S3 Storage Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={openFilePicker}>Select File</button>
        <button
          onClick={uploadFile}
          disabled={!file || uploading}
          style={{ marginLeft: 10 }}
        >
          {uploading ? "Uploading..." : "Upload to S3"}
        </button>
        {file && <span style={{ marginLeft: 15 }}>Selected: {file.name}</span>}
      </div>

      <p>{status}</p>
      <hr />

      <section style={{ marginTop: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Your Bucket Files</h3>
          <button onClick={refreshList}>Refresh List</button>
        </div>
        
        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          {files.length === 0 ? (
            <li>No files found.</li>
          ) : (
            files.map((f) => (
              <li key={f.key} style={{ padding: "12px 0", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ flex: 1, marginRight: "20px" }}>
                  <strong>{f.key}</strong> — {(f.size / 1024).toFixed(2)} KB
                </span>
                
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={async () => {
                      const url = await getDownloadUrl(f.key);
                      window.open(url, "_blank");
                    }}
                    style={{ padding: "4px 8px", cursor: "pointer" }}
                  >
                    Download
                  </button>

                  {/* RENAME BUTTON */}
                  <button 
                    onClick={async () => {
                      const newName = prompt("Enter new filename:", f.key);
                      if (newName && newName !== f.key) {
                        setStatus("Renaming...");
                        const result = await renameS3File(f.key, newName);
                        if (result.success) {
                          setStatus("Renamed successfully ✅");
                          await refreshList();
                        } else {
                          setStatus("Rename failed ❌");
                        }
                      }
                    }}
                    style={{ padding: "4px 8px", cursor: "pointer", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
                  >
                    Rename
                  </button>

                  <button 
                    onClick={async () => {
                      if (confirm(`Are you sure you want to delete ${f.key}?`)) {
                        setStatus("Deleting...");
                        const result = await deleteS3File(f.key);
                        if (result.success) {
                          setStatus("Deleted successfully ✅");
                          await refreshList(); 
                        } else {
                          setStatus("Delete failed ❌");
                        }
                      }
                    }}
                    style={{ 
                      padding: "4px 8px", 
                      cursor: "pointer", 
                      backgroundColor: "#ff4444", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "4px" 
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}