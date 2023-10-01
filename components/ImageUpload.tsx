"use client";
import { Trash } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { Input } from "./ui/Input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string[];
  disabled: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const supabase = createClientComponentClient();

  const uploadImage = async (imageFile: File) => {
    const uniqueID = uniqid();
    console.log(imageFile);

    // const { data: photo, error } = await supabase.storage
    //   .from("product_images")
    //   .upload(`${uniqueID}_${imageFile.name}`, imageFile, {
    //     cacheControl: "3600",
    //     upsert: false,
    //   });
    // if (error) {
    //   return toast.error("Something went wrong.");
    // } else {
      onChange('223')
    



    console.log(value);
  };

  const deleteImage = async (url: string) => {
    const { error } = await supabase.storage
      .from("product_images")
      .remove([url]);
    if (error) {
      toast.error("Something went wrong.");
    } else {
      onRemove(url);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file) => {
      uploadImage(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => deleteImage(url)}
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
              src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${url}`}
            />
          </div>
        ))}
      </div>
      <div>
        {/* <div className="pb-1">Select images</div> */}
        <div
          {...getRootProps()}
          className="border-dashed border p-6 text-center cursor-pointer "
        >
          <Input
            placeholder="Select images..."
            disabled={disabled}
            type="file"
            accept="image/*"
            id="image"
            // onChange={uploadImage}
            multiple
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
