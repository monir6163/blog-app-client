import BlogCard from "@/components/modules/blogs/blogCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.types";

export default async function BlogPage() {
  const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });
  return (
    <section className={cn("py-32")}>
      <div className="container mx-auto flex flex-col gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl mx-auto">
            Blog Posts
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl mx-auto lg:text-lg">
            Discover the latest trends, tips, and best practices in modern web
            development. From UI components to design systems, stay updated with
            our expert insights.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {data?.data?.map((post: BlogPost) => (
            <BlogCard key={post.post_id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
