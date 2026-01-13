'use client';
import { useState, useEffect } from 'react';
import { getS3Files } from './actions';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';

export default function S3Manager() {
  const [files, setFiles] = useState<any[]>([]);

  const fetchFiles = async () => {
    const data = await getS3Files();
    setFiles(data);
  };

  useEffect(() => { fetchFiles(); }, []);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 italic">S3 Cloud Storage</h1>
      
      <UploadForm onUploadSuccess={fetchFiles} />
      
      <h2 className="text-lg font-semibold mb-4">Your Files</h2>
      <FileList files={files} onRefresh={fetchFiles} formatSize={formatSize} />
    </main>
  );
}