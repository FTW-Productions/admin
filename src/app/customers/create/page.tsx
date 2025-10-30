"use client";
import CustomerForm from "@/components/CustomerForm";

export default function CreateCustomerPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>
      <CustomerForm />
    </div>
  );
}
