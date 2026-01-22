import { env } from "@/env";
import { BlogUrlParams, ServiceOptions } from "@/types/blog.types";

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
};
