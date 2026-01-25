import { env } from "@/env";
import {
  BlogUrlParams,
  CreateBlogPostDTO,
  ServiceOptions,
} from "@/types/blog.types";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const blogService = {
  getBlogPosts: async (params?: BlogUrlParams, options?: ServiceOptions) => {
    try {
      const paramsUrl = new URL(`${API_URL}/api/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            if (Array.isArray(value)) {
              value.forEach((val) => paramsUrl.searchParams.append(key, val));
            } else {
              paramsUrl.searchParams.append(key, value);
            }
          }
        });
      }
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate !== undefined) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blog-posts"] };

      const res = await fetch(paramsUrl.toString(), config);
      const data = await res.json();
      return {
        success: true,
        data,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },
  getBlogPostById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`);
      const data = await res.json();
      return {
        success: true,
        data,
        error: null,
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },

  createBlogPost: async (blogData: CreateBlogPostDTO) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();
      return {
        success: true,
        data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },
};
