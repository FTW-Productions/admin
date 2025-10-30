import { getProject } from "@/lib/data";
import Link from "next/link";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) return <div>Project not found.</div>;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <div className="mb-4 text-muted-foreground">
        Customer ID: {project.customerId}
      </div>
      <Link
        href={`/customers/${project.customerId}`}
        className="text-primary underline"
      >
        View Customer
      </Link>
    </div>
  );
}
