"use client";
import { Input, Button } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TResponse } from "@/globalInterface/Interface";
import { useRef, useState } from "react";
import { useCreateSkillMutation } from "@/redux/features/skill/skillApi";

const AddSkill = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imgError, setImgError] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useRouter();
  const [createSkill, { isLoading,error }] = useCreateSkillMutation();
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (blogData: FieldValues) => {
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
            blogData.icon = data.data.url;
          }
        });
      try {
        console.log(blogData);
        const res = (await createSkill(blogData)) as TResponse<{
          icon: string;
          name: string;
        }>;
        if (res?.error && !res?.error?.data?.success) {
          return toast.error(res.error.data.message);
        }
        if (res.data.success) {
          reset({ title: "" });
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
  };
  return (
    <div className=" flex items-center rounded-lg pt-20  justify-center">
      <div className=" bg-opacity-40 w-11/12 mx-auto text-center shadow-l">
        <h2 className="text-2xl font-semibold w-11/12 my-5">Add A Skill</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-start">
            <Input
              label="Name"
              {...register("name", {
                required: "Name is required",
              })}
              fullWidth
              placeholder="Enter your Name"
              className="mb-6"
            />
            {errors.name && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.name?.message as string}
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
              Add Skill
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
