import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function CreateBlogForm() {
  async function createBlogPost(formData: FormData) {
    "use server";
    const cookieStore = await cookies();
    const title = formData.get("blog-title") as string;
    const content = formData.get("blog-description") as string;
    const tags = formData.get("tags") as string;
    const blogData = {
      title,
      content,
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [],
    };
    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });
    if (res.ok) {
      revalidateTag("blog-posts", "max");
    }
  }
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog Form</CardTitle>
        <CardDescription>
          This is where the blog creation form will go.
        </CardDescription>
        <CardContent>
          <form id="blog-form" action={createBlogPost}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="blog-title">Blog Title</FieldLabel>
                <Input
                  id="blog-title"
                  name="blog-title"
                  placeholder="Enter your blog title"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="blog-description">
                  Blog Description
                </FieldLabel>
                <Textarea
                  id="blog-description"
                  name="blog-description"
                  placeholder="Enter your blog description"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="blog-form"
            variant="default"
            className="w-full"
          >
            Create Blog
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
