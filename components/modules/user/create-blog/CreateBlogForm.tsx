import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateBlogForm() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog Form</CardTitle>
        <CardDescription>
          This is where the blog creation form will go.
        </CardDescription>
        <CardContent>
          <form id="blog-form"></form>
        </CardContent>
        <CardFooter>
          <Button type="submit" id="blog-form" variant="default">
            Create Blog
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
