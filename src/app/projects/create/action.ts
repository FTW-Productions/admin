"use server";
import { createProject } from "@/lib/data";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProjectAction(formData: FormData) {
  const name = formData.get("name") as string;
  const customerId = formData.get("customerId") as string;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  await createProject({ name, customerId, createdBy: user.id });
  redirect(`/customers/${customerId}`);
}
