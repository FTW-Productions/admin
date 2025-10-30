import { createAttachment } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const attachmentSchema = z.object({
  id: z.uuidv7(),
  path: z.string(),
  createdBy: z.uuid().min(1, "A valid user ID is required"),
  createdAt: z.coerce.date(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const attachmentData = attachmentSchema.safeParse(body);

    if (!attachmentData.success) {
      console.log(attachmentData.error.issues);
      return NextResponse.json(
        { error: "Invalid request data", issues: attachmentData.error.issues },
        { status: 422 }
      );
    }

    await createAttachment(attachmentData.data);
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
