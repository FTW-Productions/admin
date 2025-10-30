"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCustomerAction } from "@/app/customers/create/action";

export default function CustomerForm() {
  return (
    <form action={createCustomerAction} className="space-y-4">
      <Input name="name" placeholder="Name" required />
      <Input name="phone" placeholder="Phone" required type="tel" />
      <Button type="submit">Create Customer</Button>
    </form>
  );
}
