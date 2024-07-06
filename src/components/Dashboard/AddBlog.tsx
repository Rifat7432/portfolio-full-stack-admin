"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Input, Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import React, { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TResponse } from "@/globalInterface/Interface";
import { useCreateBlogMutation } from "@/redux/features/blogs/blogApi";
import TextEditor from "./TextEditor";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const [imgError, setImgError] = useState("");
  const [text, setText] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useRouter();
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (blogData: FieldValues) => {
    if (htmlContent) {
      blogData.description = htmlContent;
      if (img) {
        const formData = new FormData();
        formData.append("image", img);
        await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.data.url) {
              blogData.image = data.data.url;
            }
          });
        try {
          const res = (await createBlog(blogData)) as TResponse<{
            image: string;
            title: string;
            description: string;
          }>;
          if (res?.error && !res?.error?.data?.success) {
            return toast.error(res.error.data.message);
          }
          if (res.data.success) {
            reset({ title: "" });
            if (textAreaRef.current) {
              textAreaRef.current.innerHTML = "";
              setHtmlContent("");
            }
            setImg(null);
            toast.success(res.data.message);
            navigate.push("/dashboard");
          }
        } catch (err) {
          toast.error("Register Failed");
        }
      } else {
        return setImgError("Image is require");
      }
    } else {
      return setText("Description is require");
    }
  };
  return (
    <div className=" flex items-center rounded-lg pt-20  justify-center">
      <div className=" bg-opacity-40 w-11/12 mx-auto text-center shadow-l">
        <h2 className="text-2xl font-semibold w-11/12 my-5">Write A Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-start">
            <Input
              label="Title"
              {...register("title", {
                required: "Email is required",
              })}
              fullWidth
              placeholder="Enter your title"
              className="mb-6"
            />
            {errors.title && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.title?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start" onClick={handleFileClick}>
            <Input
              readOnly
              label="Upload Photo"
              placeholder="Choose a image..."
              value={img ? img.name : ""}
              className="cursor-pointer"
            />
            {imgError && (
              <p className="text-red-600 text-xs font-semibold">
                {imgError as string}
              </p>
            )}
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImg(file);
              }
            }}
          />
          <div className="flex flex-col items-start">
            <TextEditor
              htmlContent={htmlContent}
              setHtmlContent={setHtmlContent}
              textAreaRef={textAreaRef}
            ></TextEditor>
            {text && (
              <p className="text-red-600 text-xs font-semibold">
                {text as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Button
              type="submit"
              color="primary"
              onClick={() => {
                if (!img) {
                  return setImgError("Image is equire");
                }
                setImgError("");
              }}
              isLoading={isLoading}
            >
              Add Blog
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddBlog;
