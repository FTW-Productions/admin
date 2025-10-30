"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { v7 as uuidv7 } from "uuid";

export async function createCustomerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`;
  const apiBody = { name, phone, createdBy: user.id, id: uuidv7() };
  const result = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiBody),
  });

  if (!result.ok) {
    const errorData = await result.json();
    console.error(
      "Error creating customer:",
      errorData.error || "Unknown error"
    );
    throw new Error(
      `Failed to create customer: ${errorData.error || "Unknown error"}`
    );
  }

  redirect("/customers");
}
