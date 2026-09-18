/**
 * The demo course behind the homepage search. Every item is something a
 * student in Math 53 or a neighbouring class would actually have open, so the
 * search looks like the real thing.
 */

export type FragmentKind = "pdf" | "due" | "page" | "slide" | "code" | "notes";

export type Fragment = {
  id: string;
  kind: FragmentKind;
  title: string;
  meta: string;
  /** Extra words a query can match on. */
  tags: string;
  /** Code fragments show a line of source. */
  code?: string;
};

export const kindLabel: Record<FragmentKind, string> = {
  pdf: "PDF",
  due: "Due",
  page: "Page",
  slide: "Slide",
  code: "Code",
  notes: "Notes",
};

export const fragments: Fragment[] = [
  { id: "pm2-sol", kind: "pdf", title: "Practice Midterm 2 solutions.pdf", meta: "Math 53, Files, Exams", tags: "midterm practice exam solutions" },
  { id: "pm2-blank", kind: "pdf", title: "Practice Midterm 2 (blank).pdf", meta: "Math 53, Files, Exams", tags: "midterm practice exam" },
  { id: "mt2", kind: "due", title: "Midterm 2, in class", meta: "Thu Nov 5, Assignments", tags: "midterm exam due" },
  { id: "syllabus", kind: "page", title: "Syllabus: exam policy", meta: "Math 53, Pages", tags: "midterm exam policy syllabus calculator" },
  { id: "ps4", kind: "pdf", title: "Problem Set 4.pdf", meta: "Math 53, Files, Homework", tags: "problem set 4 pset homework substitution" },
  { id: "ps4-due", kind: "due", title: "Problem Set 4 due Thursday", meta: "Math 53, Assignments", tags: "problem set 4 pset homework due" },
  { id: "oh", kind: "page", title: "Office hours this week", meta: "Math 53, Announcements", tags: "problem set 4 pset office hours help" },
  { id: "l14", kind: "slide", title: "Lecture 14, slide 22: u-substitution", meta: "Math 53, Lecture slides", tags: "substitution integral lecture 14 cos theta" },
  { id: "notes14", kind: "notes", title: "Your notes on Lecture 14", meta: "Lectra Notes, handwritten", tags: "substitution notes lecture 14 integral" },
  { id: "ps4-q3", kind: "page", title: "Problem 3 hint: try u = cos θ", meta: "Math 53, Discussion", tags: "substitution problem set 4 pset hint" },
  { id: "quiz", kind: "due", title: "Quiz Friday, sections 5.1 to 5.4", meta: "Chem 1A, Assignments", tags: "quiz chem due" },
  { id: "bioe", kind: "slide", title: "New slides posted, Week 9", meta: "BioE 141, Lecture slides", tags: "slides week 9 lecture" },
  { id: "orgo", kind: "pdf", title: "Orgo midterm review.pdf", meta: "Chem 3A, Files", tags: "midterm review organic chemistry exam" },
  { id: "sn2", kind: "slide", title: "Lecture 12: SN2 mechanisms", meta: "Chem 3A, Lecture slides", tags: "mechanism lecture 12 organic chemistry" },
  { id: "rot", kind: "pdf", title: "Rotational dynamics reading.pdf", meta: "Physics 7A, Files", tags: "reading physics torque rotation" },
  { id: "statics", kind: "pdf", title: "Statics lab worksheet.pdf", meta: "Physics 7A, Files, Labs", tags: "lab worksheet statics physics" },
  { id: "lab6", kind: "code", title: "lab6.ipynb", meta: "Data C100, Notebooks", tags: "lab notebook python pandas data", code: "df.groupby('site').mean()" },
  { id: "hw3", kind: "code", title: "hw3.py", meta: "CS 61B, Assignments", tags: "homework code java python", code: "def integrate(f, a, b):" },
  { id: "grades", kind: "page", title: "Grading breakdown", meta: "Math 53, Syllabus", tags: "grades syllabus midterm final weight" },
  { id: "lab6-due", kind: "due", title: "Lab 6 due Monday", meta: "Data C100, Assignments", tags: "lab due data notebook" },
  { id: "week9", kind: "page", title: "Week 9 announcements", meta: "BioE 141, Announcements", tags: "announcements week 9" },
  { id: "final", kind: "page", title: "Final exam room assignments", meta: "Chem 1A, Pages", tags: "final exam room" },
];

/** Which page in the hero's stack each query lifts out. */
export type StackPage = "exam" | "pset" | "slide";

export type DemoQuery = { text: string; ids: string[]; page: StackPage };

/** The queries the hero types on its own, in order. */
export const demoQueries: DemoQuery[] = [
  { text: "practice midterm", ids: ["pm2-sol", "pm2-blank", "mt2", "syllabus"], page: "exam" },
  { text: "problem set 4", ids: ["ps4", "ps4-due", "ps4-q3", "oh"], page: "pset" },
  { text: "substitution", ids: ["l14", "notes14", "ps4-q3", "ps4"], page: "slide" },
];

/** A visitor's own query: every word has to appear somewhere in the fragment. */
export function searchFragments(query: string): Fragment[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return fragments
    .filter((fragment) => {
      const haystack = `${fragment.title} ${fragment.meta} ${fragment.tags}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    })
    .slice(0, 4);
}
