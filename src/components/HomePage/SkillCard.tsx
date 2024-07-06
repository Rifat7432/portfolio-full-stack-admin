import {  Card, CardFooter, Image } from "@nextui-org/react";

const SkillCard = ({ skill }: { skill: { icon: string; name: string } }) => {
  return (
    <div className="flex justify-center items-center">
      <Card isFooterBlurred radius="lg" className="border-none w-72 h-60">
        <Image
          alt="Woman listing to music"
          className="w-72 object-cover h-60"
          src={skill.icon}
        />
        <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-slate-800 text-center">{skill.name}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkillCard;
