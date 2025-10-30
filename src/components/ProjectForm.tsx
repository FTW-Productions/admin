"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProjectAction } from "@/app/projects/create/action";

interface ProjectFormProps {
  customerId?: string;
}

export default function ProjectForm({ customerId }: ProjectFormProps) {
  return (
    <form action={createProjectAction} className="space-y-4">
      <Input name="name" placeholder="Project Name" required />
      <Input
        name="customerId"
        placeholder="Customer ID"
        defaultValue={customerId}
        required
        readOnly={!!customerId}
      />
      <Button type="submit">Create Project</Button>
    </form>
  );
}
