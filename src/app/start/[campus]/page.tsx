import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CAMPUS_LINKS, campusLandingPath, findCampusLink } from "@/lib/campus-links";

import StartLanding from "../StartLanding";

// One static page per campus in the registry; anything else is a 404. The
// scan itself is counted by /go/<campus> before it redirects here, so this
// page stays static and loads fast.
export const dynamicParams = false;

export function generateStaticParams() {
  return CAMPUS_LINKS.map((campus) => ({ campus: campus.slug.toLowerCase() }));
}

type Props = { params: Promise<{ campus: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const campus = findCampusLink((await params).campus);
  return {
    title: campus ? `Scope at ${campus.name}` : "Get started",
    description:
      "Three free apps for Canvas and Brightspace students: Scope for Canvas, Lectra Notes, and Polya.",
    robots: { index: false, follow: true },
  };
}

export default async function CampusStartPage({ params }: Props) {
  const campus = findCampusLink((await params).campus);
  if (!campus) {
    notFound();
  }

  return <StartLanding campusName={campus.name} path={campusLandingPath(campus)} />;
}
