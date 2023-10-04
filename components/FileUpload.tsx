"use client";

import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";

import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return(
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="upload" className="rounded-full"/>
            <button onClick={()=>onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-1 right-0 shadow-sm hover:cursor-pointer" type="button">
                <X className="h-4 w-4"/>
            </button>
            </div>
        )
    }
    return (
        <div>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.log(error);
                }}
            />
        </div>
    );
};

export default FileUpload;
