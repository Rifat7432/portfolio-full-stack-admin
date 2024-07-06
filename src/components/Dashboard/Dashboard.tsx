"use client";
import { Input, Button, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TResponse } from "@/globalInterface/Interface";
import { useRef, useState } from "react";
import { TProject } from "@/redux/features/project/projectSlice";
import { useCreateProjectMutation } from "@/redux/features/project/projectApi";
const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imgError, setImgError] = useState("");
  const [img, setImg] = useState<File[] | []>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useRouter();
  const [createSkill, { isLoading, error }] = useCreateProjectMutation();
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  let imgInputValue = "";
  img.forEach((image) => {
    imgInputValue += `${image.name}` + " , ";
  });
  const onSubmit = async (blogData: FieldValues) => {
    if (img.length) {
      const allPhotos: string[] = [];
      const formData1 = new FormData();
      const formData2 = new FormData();
      const formData3 = new FormData();
      formData1.append("image", img[0]);
      formData2.append("image", img[1]);
      formData3.append("image", img[2]);
      await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
        method: "POST",
        body: formData1,
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data?.data?.url) {
            allPhotos.push(data.data.url);

            await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
              method: "POST",
              body: formData2,
            })
              .then((res) => res.json())
              .then(async (data) => {
                if (data?.data?.url) {
                  allPhotos.push(data.data.url);
                  await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
                    method: "POST",
                    body: formData3,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data?.data?.url) {
                        allPhotos.push(data.data.url);
                      }
                    });
                }
              });
          }
        });

      blogData.images = allPhotos;
    } else {
      return setImgError("Maximum Three Images Require");
    }
    blogData.details = blogData.details.split(";");
    blogData.technology = blogData.technology.split(",");
    try {
      console.log(blogData);
      const res = (await createSkill(blogData)) as TResponse<TProject>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({
          name: "",
          liveLink: "",
          gitHubClientLink: "",
          gitHubServerLink: "",
          technology: "",
          description: "",
          details: "",
        });
        setImg([]);
        toast.success(res.data.message);
        navigate.push("/dashboard");
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  return (
    <div className=" flex items-center rounded-lg py-20  justify-center">
      <div className=" bg-opacity-40 w-11/12 mx-auto text-center shadow-l">
        <h2 className="text-2xl font-semibold w-11/12 my-5">Add A Project</h2>
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
          <div className="flex flex-col items-start">
            <Input
              label="Live Link"
              {...register("liveLink", {
                required: "Live Link is required",
              })}
              fullWidth
              placeholder="Enter your Live Link"
              className="mb-6"
            />
            {errors.liveLink && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.liveLink?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Input
              label="GitHub Client Link"
              {...register("gitHubClientLink", {
                required: "GitHub Client Link is required",
              })}
              fullWidth
              placeholder="Enter your GitHub Client Link"
              className="mb-6"
            />
            {errors.gitHubClientLink && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.gitHubClientLink?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Input
              label="GitHub Server Link"
              {...register("gitHubServerLink", {
                required: "GitHub Server Link is required",
              })}
              fullWidth
              placeholder="Enter your GitHub Server Link"
              className="mb-6"
            />
            {errors.gitHubServerLink && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.gitHubServerLink?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Input
              label="Technology"
              {...register("technology", {
                required: "Technology is required",
              })}
              fullWidth
              placeholder="Enter your Technology.If ypu have multiple Technology then after writing a Technology add { , } this we will consider it a new Technology"
              className="mb-6"
            />
            {errors.technology && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.technology?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Input
              label="Description"
              {...register("description", {
                required: "Description is required",
              })}
              fullWidth
              placeholder="Enter your Description"
              className="mb-6"
            />
            {errors.description && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.description?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Textarea
              label="Details"
              {...register("details", {
                required: "Details is required",
              })}
              placeholder="Enter your Details.If ypu have multiple detail then after writing a detail add { ; } this we will consider it a new line"
              disableAnimation
              disableAutosize
              className="py-7"
              classNames={{
                base: "w-full",
                input: "resize-y min-h-[40px]",
              }}
            />
            {errors.details && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.details?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start" onClick={handleFileClick}>
            <Input
              readOnly
              label="Upload Photo"
              placeholder="Choose a image..."
              value={img ? imgInputValue : ""}
              className="cursor-pointer"
            />
            {imgError && (
              <p className="text-red-600 text-xs font-semibold">
                {imgError as string}
              </p>
            )}
          </div>
          <input
            multiple
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const allImg = [...img, file];
                setImg(allImg);
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

export default Dashboard;
