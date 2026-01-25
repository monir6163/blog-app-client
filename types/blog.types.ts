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
// {
//       post_id: '01dfcafe-d323-4faf-90d9-ca3718e4afe1',
//       title: 'This is new post',
//       content: 'I love my agency',
//       thumbnail: null,
//       isFeatured: false,
//       status: 'PUBLISHED',
//       tags: [Array],
//       views: 0,
//       authorId: 'dfsddsa5484',
//       created_at: '2026-01-14T09:02:42.458Z',
//       updated_at: '2026-01-14T09:02:42.458Z',
//       _count: [Object]
//     }

export interface BlogPost {
  post_id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  status: string;
  tags?: string[];
  views: number;
  authorId: string;
  created_at: string;
  updated_at: string;
  _count: {
    comments: number;
  };
}

export interface CreateBlogPostDTO {
  title: string;
  content: string;
  tags?: string[];
  thumbnail?: string | null;
  isFeatured?: boolean;
  status?: string;
}
