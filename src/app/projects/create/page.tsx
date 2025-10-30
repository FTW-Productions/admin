"use client";
import ProjectForm from "@/components/ProjectForm";
import { useSearchParams } from "next/navigation";

export default function CreateProjectPage() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  if (!customerId) {
    return (
      <div className="p-8">Customer ID is required to create a project.</div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <ProjectForm customerId={customerId} />
    </div>
  );
}
