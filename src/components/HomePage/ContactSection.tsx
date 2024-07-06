"use client";

import { TResponse } from "@/globalInterface/Interface";
import { useEmailUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Mail, Phone, Send } from "lucide-react";
import { MutableRefObject } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
const ContactSection = ({
  contactRef,
}: {
  contactRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [sendEmail, { error }] = useEmailUserMutation();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (emailData: FieldValues) => {
    try {
      const res = (await sendEmail(emailData)) as TResponse<null>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        reset({
          from: "",
          text: "",
          subject: "",
        });
      }
    } catch (err) {
      toast.error("Email send Failed");
    }
  };
  if (!user) {
    return <div></div>;
  }
  return (
    <div ref={contactRef} className="pt-10 pb-32 bg-sky-100 rounded-lg">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-start py-5">
          <p className="w-full h-1 mr-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
          <h1 className="text-4xl font-semibold text-slate-600">
            <span className="text-blue-500">C</span>ONTACT
          </h1>
          <p className="w-full h-1 ml-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            disabled={true}
            type="email"
            value={user.email}
            variant="underlined"
            className="max-w-lg mx-auto"
            startContent={<Mail />}
          />
          <Input
            disabled={true}
            type="text"
            variant="underlined"
            value={user.phone}
            className="max-w-lg mx-auto"
            startContent={<Phone />}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-start pt-10"
        >
          <Input
            {...register("from")}
            type="email"
            label="From"
            variant="bordered"
            placeholder="Enter your email ..."
            className="max-w-xl py-5 "
            startContent={<Mail />}
          />
          <Input
            {...register("subject")}
            type="text"
            label="Subject"
            variant="bordered"
            placeholder="Enter your subject"
            className="max-w-xl py-5 "
          />
          <Textarea
            {...register("text")}
            label="Description"
            variant="bordered"
            placeholder="Enter your description"
            disableAnimation
            disableAutosize
            className="py-7"
            classNames={{
              base: "w-full",
              input: "resize-y min-h-[40px]",
            }}
          />
          <Button
            className="w-48 ml-auto mr-10"
            color="primary"
            type="submit"
            variant="flat"
          >
            Send Email
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
