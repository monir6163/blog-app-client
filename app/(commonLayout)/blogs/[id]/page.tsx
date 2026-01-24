import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.types";
import { Calendar, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();
  if (!data?.data) {
    return [];
  }
  return data.data
    .map((blog: BlogPost) => ({
      id: blog.post_id,
    }))
    .splice(0, 2);
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await blogService.getBlogPostById(id);

  if (!response.success || !response.data?.data) {
    notFound();
  }

  const blog = response.data.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header Section */}
      <div className="mb-8">
        {blog.isFeatured && (
          <Badge variant="default" className="mb-4">
            Featured
          </Badge>
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{blog.views} views</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{blog._count.comments} comments</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Status Badge */}
            <Badge
              variant={blog.status === "PUBLISHED" ? "default" : "outline"}
            >
              {blog.status}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            width={800}
            height={400}
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{blog.content}</p>
          </div>
        </CardContent>
      </Card>
      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Updated Date */}
      {blog.updated_at !== blog.created_at && (
        <div className="text-sm text-muted-foreground text-right">
          Last updated: {formatDate(blog.updated_at)}
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({blog._count.comments})
        </h2>
        {/* {blog.comments && blog.comments.length > 0 ? (
          <div className="space-y-4">
            {blog.comments.map((comment: any) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No comments yet. Be the first to comment!
              </p>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
}
