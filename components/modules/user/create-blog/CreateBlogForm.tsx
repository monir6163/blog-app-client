"use client";
import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const API_URL = env.NEXT_PUBLIC_API_URL;

const CreateBlogSchema = z.object({
  "blog-title": z.string().min(1, "Blog title is required"),
  "blog-description": z.string().min(1, "Blog description is required"),
  tags: z.string().min(1, "At least one tag is required"),
});

export default function CreateBlogForm() {
  const form = useForm({
    defaultValues: {
      "blog-title": "",
      "blog-description": "",
      tags: "",
    },
    validators: {
      onSubmit: CreateBlogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating blog post...");
      const title = value["blog-title"];
      const content = value["blog-description"];
      const tags = value["tags"];
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
      const res = await createBlogPost(blogData);
      if (res.success) {
        toast.success("Blog post created successfully!", { id: toastId });
        form.reset();
      } else {
        toast.error(
          `Failed to create blog post: ${res.error?.message || "Unknown error"}`,
          { id: toastId },
        );
      }
    },
  });
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog Form</CardTitle>
        <CardDescription>
          This is where the blog creation form will go.
        </CardDescription>
        <CardContent>
          <form
            id="blog-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="blog-title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Blog Title</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        placeholder="Enter your blog title"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="blog-description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Blog Description
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        placeholder="Enter your blog description"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="tags"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        placeholder="Enter tags separated by commas"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="blog-form"
            variant="default"
            className="w-full cursor-pointer"
          >
            Create Blog
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
