"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Spiner from "../Spiner/Spiner";

const Bio = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (loading) {
    return <Spiner></Spiner>;
  }
  if (!user) {
    return <div></div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-3 pt-20">
      <div className="flex items-center justify-center relative">
        <div className="absolute left-10 text-center">
          <h1 className="text-4xl font-semibold text-blue-500">B</h1>
          <h1 className="text-4xl font-semibold text-slate-600">I</h1>
          <h1 className="text-4xl font-semibold text-teal-400">O</h1>
          <p className="w-1 h-48 ml-[10px] rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
        </div>
        <div className="mb-6 w-72 h-[400px] relative">
          <Image
            src={user?.image}
            alt="MD Rifat Talukdar"
            className="w-72 h-[400px] border-2  rounded-lg object-cover mx-auto z-30"
          />
          <div className="w-72 h-full rounded-lg z-10 bg-gradient-to-r from-blue-500 to-teal-400 absolute bottom-0"></div>
        </div>
      </div>
      <div className="text-slate-600 text-base py-5 flex flex-col items-center justify-center">
        <p className="w-11/12 my-1">
          Hello! My name is MD Rifat Talukdar, a dedicated and motivated Full
          Stack Developer with 2 years of learning experience. I have a strong
          background in JavaScript, React.js, and other modern web technologies,
          and I am passionate about building innovative and user-friendly web
          applications. My journey in web development began with a comprehensive
          training course led by Jhankar Mahbub, where I honed my skills in both
          frontend and backend technologies. This foundation allowed me to dive
          into various projects and internships, where I applied my knowledge
          and continuously learned new technologies.
        </p>
        <Button onPress={onOpen} color="primary" variant="ghost">
          Read More
        </Button>
        <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  My Full Bio
                </ModalHeader>
                <ModalBody>
                  <p className="w-11/12 my-1">
                    Hello! My name is MD Rifat Talukdar, a dedicated and
                    motivated Full Stack Developer with 2 years of learning
                    experience. I have a strong background in JavaScript,
                    React.js, and other modern web technologies, and I am
                    passionate about building innovative and user-friendly web
                    applications. My journey in web development began with a
                    comprehensive training course led by Jhankar Mahbub, where I
                    honed my skills in both frontend and backend technologies.
                    This foundation allowed me to dive into various projects and
                    internships, where I applied my knowledge and continuously
                    learned new technologies.
                  </p>
                  <p className="w-11/12 my-1">
                    I have successfully developed and deployed several web
                    applications, including Mobile Bazzar, BD Bikes, and Bark
                    Buddies. These projects showcase my ability to integrate
                    complex features such as user authentication, data storage
                    with MongoDB, and seamless navigation using React Router and
                    Next.js. I am comfortable working with a range of tools and
                    libraries, including Tailwind, Bootstrap, Daisy UI, Next UI,
                    and Antd, to create visually appealing and functional web
                    interfaces.
                  </p>
                  <p className="w-11/12 my-1">
                    During my internship at Suvidha Mahila Mandal, I gained
                    valuable experience in website design and project handling,
                    further solidifying my expertise and adaptability in various
                    aspects of web development. My ability to quickly learn new
                    technologies and adapt to different project requirements
                    makes me a versatile and efficient developer.
                  </p>
                  <p className="w-11/12 my-1">
                    Beyond my technical skills, I am a self-motivated and
                    deadline-oriented individual, always eager to tackle new
                    challenges and contribute to impactful projects. I am
                    proficient in Bangla and comfortable communicating in
                    English, which allows me to collaborate effectively in
                    diverse teams.
                  </p>
                  <p className="w-11/12 my-1">
                    Currently, I am focused on expanding my knowledge in cloud
                    computing and exploring new front-end frameworks to enhance
                    my skill set further. I am excited about the opportunity to
                    work on innovative projects that push the boundaries of web
                    development and make a significant impact.
                  </p>
                  <p className="w-11/12 my-1">
                    Feel free to get in touch with me through{" "}
                    <Link href="https://www.linkedin.com/in/md-rifat-taluckdar/">
                      Linkedin
                    </Link>{" "}
                    or <Link href="https://github.com/Rifat7432">GitHub</Link>{" "}
                    to discuss potential opportunities or projects.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Bio;
