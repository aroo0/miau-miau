"use client";
import { Trash } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { Input } from "./ui/Input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: Record<"url", string>[];
  disabled: boolean;
  onChange: (url: Record<"url", string>[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  value,
}) => {
  const [urls, setUrls] = useState<Record<"url", string>[]>([]); // Initialize with an empty array

  const supabase = createClientComponentClient();

  const uploadImage = async (imageFile: File) => {
    const uniqueID = uniqid();
    console.log(imageFile);

    const { data: photo, error } = await supabase.storage
      .from("product_images")
      .upload(`${uniqueID}_${imageFile.name}`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      return toast.error("Something went wrong.");
    }

    return `${uniqueID}_${imageFile.name}`;
  };

  const deleteImage = async (url: string) => {
    const {error:  storageError } = await supabase.storage
      .from("product_images")
      .remove([url]);

    if (storageError) {
      return toast.error("Something went wrong.");
    }

    const { error: productTableError } = await supabase
      .from("product_image")
      .delete()
      .eq("url", url);

    if (productTableError) {
      return toast.error("Something went wrong.");
    }

    setUrls((prev) => prev.filter((current) => current.url !== url));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedUrls = await Promise.all(
      acceptedFiles.map(async (file) => {
        const url = await uploadImage(file);
        setUrls((prevUrls) => [...prevUrls, { url }]);
      })
    );
  }, []);

  useEffect(() => {
    onChange(urls);
  }, [urls]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setUrls(value);
  }, []);

  return (
    <>
      <div className="mb-4 flex items-center gap-4">

        {value.map((url, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => deleteImage(url.url)}
                variant={"destructive"}
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image
              fill
              className="object-cover"
              alt="image"
              src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${url.url}`}
            />
          </div>
        ))}
      </div>
      <div>
        <div
          {...getRootProps()}
          className="border-dashed border p-6 text-center cursor-pointer "
        >
          <Input
            placeholder="Select images..."
            disabled={disabled}
            type="file"
            accept="image/*"
            {...getInputProps()}
          />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>Drag 'n' drop some images here, or click to select files</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
