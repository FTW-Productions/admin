import { getCustomerWithProjects } from "@/lib/data";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default async function CustomerDetailPage({
  params,
}: {
  params: { customerId: string };
}) {
  const { customerId } = await params;
  const customer = await getCustomerWithProjects(customerId);
  if (!customer) return <div>Customer not found.</div>;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{customer.name}</h1>
      <div className="mb-4 text-muted-foreground">{customer.phone}</div>
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      <ProjectList customerId={customer.id} />
      <Link
        href={`/projects/create?customerId=${customer.id}`}
        className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded"
      >
        Create Project
      </Link>
    </div>
  );
}
