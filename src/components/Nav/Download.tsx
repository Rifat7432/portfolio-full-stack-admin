import { TUser } from "@/redux/features/user/userSlice";
import { Button } from "@nextui-org/react";

const Download = ({ user }: { user: TUser }) => {
  const extractFileId = (driveLink: string) => {
    const regex = /\/d\/(.*?)\/view/;
    const match = driveLink.match(regex);
    return match ? match[1] : null;
  };
  const fileId = extractFileId(user.resume);
  const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return (
    <a href={downloadLink} download>
      <Button color="primary" variant="flat">
        Download Resume
      </Button>
    </a>
  );
};

export default Download;
