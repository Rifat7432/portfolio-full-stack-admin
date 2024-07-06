import BlogDetailCard from "@/components/BlogPage/BlogDetailCard";

const BlogDetailPage = ({ params }: { params: { blogId: string } }) => {
  return (
    <div>
      <BlogDetailCard id={params.blogId}></BlogDetailCard>
    </div>
  );
};

export default BlogDetailPage;
