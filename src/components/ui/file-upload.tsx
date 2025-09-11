"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from './progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  uploadType: 'institutions' | 'grants' | 'news';
}

interface UploadStatus {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
  progress?: number;
}

export function FileUpload({
  onFileUpload,
  acceptedFileTypes = ['.xlsx', '.xls', '.csv'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  uploadType
}: FileUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ status: 'idle' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      let errorMessage = 'File rejected';
      
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        errorMessage = `File is too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB`;
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        errorMessage = `Invalid file type. Please upload ${acceptedFileTypes.join(', ')} files only`;
      }
      
      setUploadStatus({ status: 'error', message: errorMessage });
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setUploadStatus({ status: 'idle' });
    }
  }, [acceptedFileTypes, maxFileSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxSize: maxFileSize,
    multiple: false
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadStatus({ status: 'uploading', progress: 0 });
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadStatus(prev => ({
          ...prev,
          progress: Math.min((prev.progress || 0) + 10, 90)
        }));
      }, 200);

      await onFileUpload(selectedFile);
      
      clearInterval(progressInterval);
      setUploadStatus({ 
        status: 'success', 
        message: `Successfully uploaded ${selectedFile.name}`,
        progress: 100 
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus({ status: 'idle' });
      }, 3000);
      
    } catch (error) {
      setUploadStatus({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Upload failed' 
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadStatus({ status: 'idle' });
  };

  const getUploadTypeLabel = () => {
    switch (uploadType) {
      case 'institutions': return 'Institutions';
      case 'grants': return 'Grants';
      case 'news': return 'News Updates';
      default: return 'Data';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Upload {getUploadTypeLabel()} Data
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload Excel (.xlsx, .xls) or CSV files to bulk import {uploadType} data
            </p>
          </div>

          {/* Upload Status Alert */}
          {uploadStatus.status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadStatus.message}</AlertDescription>
            </Alert>
          )}

          {uploadStatus.status === 'success' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {uploadStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* File Drop Zone */}
          {!selectedFile && uploadStatus.status !== 'success' && (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">
                {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to select a file
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: {acceptedFileTypes.join(', ')} • Max size: {maxFileSize / (1024 * 1024)}MB
              </p>
            </div>
          )}

          {/* Selected File Display */}
          {selectedFile && uploadStatus.status !== 'success' && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {uploadStatus.status === 'idle' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Upload Progress */}
              {uploadStatus.status === 'uploading' && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadStatus.progress}%</span>
                  </div>
                  <Progress value={uploadStatus.progress} className="h-2" />
                </div>
              )}

              {/* Upload Button */}
              {uploadStatus.status === 'idle' && (
                <div className="mt-4">
                  <Button onClick={handleUpload} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}