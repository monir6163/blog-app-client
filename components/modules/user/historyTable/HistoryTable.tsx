import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types/blog.types";

export default function HistoryTable({ blogs }: { blogs: BlogPost[] }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog: BlogPost) => (
            <TableRow key={blog.post_id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.tags}</TableCell>
              <TableCell>{blog.views}</TableCell>
              <TableCell>{blog.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter></TableFooter> */}
      </Table>
    </div>
  );
}
