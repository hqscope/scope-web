import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ActivityDashboard from "@/components/app/ActivityDashboard";
import { getAdminUser } from "@/lib/auth/admin";
import { getActivitySnapshot } from "@/lib/data/activity";

export const metadata: Metadata = {
  title: "Activity",
  robots: { index: false, follow: false },
};

// Live numbers; never serve a cached shell.
export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const admin = await getAdminUser();
  if (!admin) {
    notFound();
  }

  const snapshot = await getActivitySnapshot();

  return <ActivityDashboard initialSnapshot={snapshot} />;
}
