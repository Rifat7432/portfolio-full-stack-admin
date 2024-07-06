import { Button, Link } from "@nextui-org/react";

const NotFoundPage = () => {
  return (
    <div className="w-[90%] mx-auto text-5xl font-bold pt-80 text-center">
      <div>
        <p>404 | Not found</p>
      </div>
      <div>
        <Button as={Link} color="primary" variant="flat" href="/">
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
