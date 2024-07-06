import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { MutableRefObject, useEffect, useRef } from "react";
const BlogCard = ({
  blog,
}: {
  blog: { _id: string; image: string; title: string; description: string };
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = blog.description;
    }
  }, [blog.description]);

  return (
    <Card className="py-4 bg- px-2 xl:w-full w-80 mx-auto bg-sky-50">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover w-full rounded-xl"
          src={blog.image}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-col items-center justify-center"></CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-lg font-semibold leading-none text-default-600">
              {blog.title}
            </h4>
            <div
              ref={containerRef as MutableRefObject<HTMLDivElement | null>}
              className="text-small tracking-tight text-default-400"
            ></div>
            <Button color="primary" as={Link} href={`/blog/${blog._id}`}>
              View Detail
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
