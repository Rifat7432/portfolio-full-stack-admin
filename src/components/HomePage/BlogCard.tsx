import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
const BlogCard = ({
  blog,
}: {
  blog: { _id: string; image: string; title: string; description: string };
}) => {
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
            <h5 className="text-small tracking-tight text-default-400">
              {blog.description.length > 200
                ? `${blog.description.slice(0, 200)}...`
                : `${blog.description}...`}
              <span>
                <Link href={`/blog/${blog._id}`} className="text-small">
                  See more
                </Link>
              </span>
            </h5>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
