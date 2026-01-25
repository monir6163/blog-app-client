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

export default function CreateBlogForm() {
  async function createBlogPost(formData: FormData) {
    "use server";
    const title = formData.get("blog-title") as string;
    const description = formData.get("blog-description") as string;
    const tags = formData.get("tags") as string;

    // Here you would typically send the data to your backend or database
    console.log("Creating blog post with title:", title);
    console.log("Description:", description);
    console.log("Tags:", tags);
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
