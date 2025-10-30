import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ProjectList />
      <Link
        href="/projects/create"
        className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded"
      >
        Create Project
      </Link>
    </div>
  );
}
