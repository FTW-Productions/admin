import { getCustomers, createCustomer } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const customerSchema = z.object({
  id: z.uuidv7(),
  name: z.string().min(1, "Customer name is required"),
  phone: z.string().nullable(),
  attachmentId: z.uuidv7().nullish(),
  createdBy: z.uuid().min(1, "A valid user ID is required"),
  createdAt: z.coerce.date(),
});

export async function GET(req: NextRequest) {
  try {
    const customers = await getCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerData = customerSchema.safeParse(body);

    if (!customerData.success) {
      console.log(customerData.error.issues);
      return NextResponse.json(
        { error: "Invalid request data", issues: customerData.error.issues },
        { status: 422 }
      );
    }

    await createCustomer(customerData.data);
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
