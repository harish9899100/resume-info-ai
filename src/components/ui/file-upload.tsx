import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
}

export function FileUpload({ 
  onFileSelect, 
  acceptedTypes = ['.pdf', '.docx'],
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setUploadError('');
    
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setUploadError('File is too large. Maximum size is 10MB.');
      } else if (error.code === 'file-invalid-type') {
        setUploadError('Invalid file type. Please upload PDF or DOCX files only.');
      } else {
        setUploadError('Invalid file. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    setUploadError('');
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
          "hover:border-primary hover:bg-primary/5",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25",
          selectedFile && "border-green-500 bg-green-50 dark:bg-green-950/20"
        )}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="animate-scale-in">
            <FileText className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
              File Selected Successfully!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              variant="outline"
              size="sm"
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <Upload className={cn(
              "mx-auto h-12 w-12 mb-4 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )} />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop your PDF or DOCX file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOCX • Maximum size: 10MB
            </p>
          </div>
        )}
      </div>
      
      {uploadError && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md animate-slide-up">
          <p className="text-sm text-destructive">{uploadError}</p>
        </div>
      )}
    </div>
  );
}