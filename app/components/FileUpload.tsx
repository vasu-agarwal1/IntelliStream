"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";


interface FileUploadProps{
    onSuccess: (res:any) => void
    onProgress: (progress:number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File) => {
        if(fileType === "video" ){
            if(!file.type.startsWith("video/")){
                setError("please Upload a valid video file")
            }
        }
        if(file.size > 100 * 1024 * 1024){
            setError("File size must be less than 100MB")
        }
        return true
    }

    return (
        <>
            <input type="file" ref={fileInputRef} />
            <button type="button" onClick={handleUpload}>
                Upload file
            </button>
            <br />
            Upload progress: <progress value={progress} max={100}></progress>
        </>
    );
};

export default FileUpload;