import { getProjects, createProject, type Project } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  createdBy: z.string().uuidv7("A valid user ID is required"),
  customerId: z.string().uuidv7("A valid customer ID is required"),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  try {
    const projects = await getProjects(params.customerId);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  try {
    const body = await req.json();
    body.customerId = params.customerId; // Ensure the customerId from the URL is used
    const projectData = projectSchema.safeParse(body);

    if (!projectData.success) {
      return NextResponse.json(
        { error: "Invalid request data", issues: projectData.error.issues },
        { status: 400 }
      );
    }

    const project = await createProject(projectData.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
