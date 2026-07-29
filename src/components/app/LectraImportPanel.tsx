"use client";

import { ChangeEvent, DragEvent, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileUp, LoaderCircle, UploadCloud } from "lucide-react";

interface CourseOption {
  courseId: number | null;
  courseKey: string;
  courseName: string;
}

interface ImportedDocument {
  id: string;
  title: string;
}

export default function LectraImportPanel({
  courses,
}: {
  courses: CourseOption[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState<ImportedDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [, startRefresh] = useTransition();

  async function uploadFiles(files: FileList | File[]) {
    const entries = Array.from(files);
    if (entries.length === 0) {
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    entries.forEach((file) => {
      formData.append("files", file);
    });

    if (selectedCourseId) {
      formData.append("courseId", selectedCourseId);
    }

    try {
      const response = await fetch("/api/workspace/imports/lectra", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        error?: string;
        documents?: ImportedDocument[];
      };

      if (!response.ok) {
        setError(payload.error ?? "Unable to import files right now.");
        return;
      }

      setUploaded(payload.documents ?? []);
      startRefresh(() => {
        router.refresh();
      });
    } catch {
      setError("Unable to reach the import route right now.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      void uploadFiles(event.target.files);
      event.target.value = "";
    }
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files?.length) {
      void uploadFiles(event.dataTransfer.files);
    }
  }

  return (
    <section className="app-card rounded-[1.75rem] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="app-label">Import to Lectra</p>
          <h2 className="mt-2 text-2xl">Drop PDFs and move them into your study flow</h2>
          <p className="mt-3 max-w-2xl app-copy">
            Drag in one or more PDFs and they will be stored for Lectra review. Pick a course first if you want the import tied back to class context.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <label className="app-label" htmlFor="lectra-course-select">
            Attach to course
          </label>
          <select
            id="lectra-course-select"
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="mt-3 h-12 w-full rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none"
          >
            <option value="">No course selected</option>
            {courses
              .filter((course) => course.courseId !== null)
              .map((course) => (
                <option key={course.courseKey} value={String(course.courseId)}>
                  {course.courseName}
                </option>
              ))}
          </select>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="hidden"
        onChange={handleFileSelection}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        disabled={isUploading}
        className={`mt-6 flex min-h-48 w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed px-6 py-10 text-center transition ${
          isDragging
            ? "border-[rgba(241,106,97,0.9)] bg-[rgba(213,50,40,0.12)]"
            : "border-white/14 bg-[rgba(255,255,255,0.03)]"
        } ${isUploading ? "cursor-wait opacity-80" : "cursor-pointer"}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(213,50,40,0.16)] text-[var(--color-shell-accent)]">
          {isUploading ? <LoaderCircle className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>
        <p className="mt-5 text-xl font-semibold text-white">
          {isUploading ? "Importing to Lectra..." : "Drop PDFs here or click to choose files"}
        </p>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-shell-copy-muted)]">
          PDF only, up to 25 MB per file. Files appear in your workspace as soon as the import finishes.
        </p>
      </button>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="button-primary"
        >
          <FileUp className="h-4 w-4" />
          Choose PDFs
        </button>
        <Link href="/app/documents" className="button-secondary !border-white/10 !bg-white/5 !text-white">
          Open files
        </Link>
      </div>

      {error ? (
        <div className="mt-4 rounded-[1.25rem] border border-[rgba(243,179,90,0.28)] bg-[rgba(243,179,90,0.08)] px-4 py-3 text-sm text-[#ffd08f]">
          {error}
        </div>
      ) : null}

      {uploaded.length > 0 ? (
        <div className="mt-5 rounded-[1.25rem] border border-[rgba(69,193,141,0.2)] bg-[rgba(69,193,141,0.08)] p-4">
          <p className="text-sm font-semibold text-[#8de0b8]">Imported successfully</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {uploaded.map((document) => (
              <Link
                key={document.id}
                href={`/app/documents/${document.id}`}
                className="rounded-full border border-[rgba(69,193,141,0.28)] px-3 py-2 text-sm text-[#c9f4de]"
              >
                {document.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
