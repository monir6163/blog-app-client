import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Button variant="outline" size="sm" className="mb-4" asChild>
          <Link href={"/dashboard/analytics/weekly"}>View Weekly Report</Link>
        </Button>
        <Button variant="default" size="sm" className="mb-4 ml-2" asChild>
          <Link href={"/dashboard/analytics/monthly"}>View Monthly Report</Link>
        </Button>
      </div>
      {children}
    </>
  );
}
