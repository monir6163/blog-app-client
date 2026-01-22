export interface BlogUrlParams {
  s?: string;
  tag?: string[];
  isFeatured?: string;
  status?: string;
  authorId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
