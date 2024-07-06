import { Facebook, Twitter, LinkedinIcon, Github } from "lucide-react";
const CustomFooter = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 w-full max-w-7xl mx-auto  z-40">
      <div className="rounded-lg p-6">
        <ul className="flex justify-center items-center space-x-4 mt-2">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100052570209705"
              target="_blank"
              className="text-blue-500"
            >
              <Facebook />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/MDRifat263141"
              target="_blank"
              className="text-blue-500"
            >
              <Twitter />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/md-rifat-taluckdar/"
              target="_blank"
              className="text-blue-500"
            >
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Rifat7432"
              target="_blank"
              className="text-blue-500"
            >
              <Github />
            </a>
          </li>
        </ul>
      </div>
      <div className="w-11/12 mx-auto mb-5 border-dashed border-1 "></div>
      <div>
        <p>
          &copy; 2024 M<span className="text-blue-500">D</span> Rifat
        </p>
      </div>
    </footer>
  );
};

export default CustomFooter;
