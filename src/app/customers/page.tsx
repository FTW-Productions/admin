import CustomerList from "@/components/CustomerList";
import Link from "next/link";

export default function CustomersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerList />
      <Link
        href="/customers/create"
        className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded"
      >
        Create Customer
      </Link>
    </div>
  );
}
