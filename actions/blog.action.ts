"use server";

import { blogService } from "@/services/blog.service";
import { CreateBlogPostDTO } from "@/types/blog.types";

export const getBlogPosts = async () => {};
export const getBlogPostById = async (id: string) => {};
export const createBlogPost = async (blogData: CreateBlogPostDTO) => {
  const res = await blogService.createBlogPost(blogData);
  return res;
};
