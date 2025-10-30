import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getProjects, type Project } from "@/lib/data";

interface ProjectListProps {
  customerId?: string;
}

export default async function ProjectList({ customerId }: ProjectListProps) {
  const projects: Project[] = await getProjects(customerId);
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">{project.name}</div>
            <div className="text-sm text-muted-foreground">
              Customer: {project.customerId}
            </div>
            <div className="text-sm text-muted-foreground">
              Created at: {new Date(project.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Created by: {project.createdBy}
            </div>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="text-primary underline"
          >
            View
          </Link>
        </Card>
      ))}
    </div>
  );
}
