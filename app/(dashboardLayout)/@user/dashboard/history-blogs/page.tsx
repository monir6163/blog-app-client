import HistoryTable from "@/components/modules/user/historyTable/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";
export default async function HistoryBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page } = await searchParams;
  const res = await blogService.getBlogPosts({ page: page || 1 });
  const blogs = res.data.data;
  const pagination = res.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">History Blogs</h1>
      <HistoryTable blogs={blogs} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
