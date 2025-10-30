import { getCustomers, createCustomer } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ELECTRIC_PROTOCOL_QUERY_PARAMS } from "@electric-sql/client";

const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  phone: z.string().optional(),
  createdBy: z.uuid().min(1, "A valid user ID is required"),
});

const originUrl = new URL(`/v1/shape`, `https://api.electric-sql.cloud`);

export async function GET(req: NextRequest) {
  try {
    // Pass parameters from the incoming request to the Electric Cloud
    const proxyUrl = new URL(req.url);
    proxyUrl.searchParams.forEach((value, key) => {
      if (ELECTRIC_PROTOCOL_QUERY_PARAMS.includes(key)) {
        originUrl.searchParams.set(key, value);
      }
    });

    // set the table and any where clause params
    originUrl.searchParams.set("table", "customers");
    originUrl.searchParams.set(
      "where",
      `created_by='f031c146-74da-40f1-ae4c-22f3ccebd181'`
    );

    // Add the source params.
    originUrl.searchParams.set(`source_id`, process.env.ELECTRIC_SOURCE_ID!);
    originUrl.searchParams.set(`secret`, process.env.ELECTRIC_SOURCE_SECRET!);

    const response = await fetch(originUrl);
    const headers = new Headers(response.headers);
    headers.delete(`content-encoding`);
    headers.delete(`content-length`);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
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
      return NextResponse.json(
        { error: "Invalid request data", issues: customerData.error.issues },
        { status: 400 }
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
