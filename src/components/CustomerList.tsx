import { Card } from "@/components/ui/card";
import Link from "next/link";
import { type Customer } from "@/lib/data";

export default async function CustomerList() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`;
    const returnedJSON = await fetch(apiUrl, {
      cache: "no-store",
      method: "GET",
    });
    if (!returnedJSON.ok) {
      console.error("Failed API request for customers: ", returnedJSON);
    }

    const returnedCustomers: Customer[] = await returnedJSON.json();
    if (returnedCustomers.length === 0) {
      return <div>No customers found.</div>;
    }
    return (
      <div className="space-y-4">
        {returnedCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{customer.name}</div>
              <div className="text-sm text-muted-foreground">
                {customer.phone}
              </div>
              <div className="text-sm text-muted-foreground">
                Created at: {new Date(customer.createdAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Created by: {customer.createdBy}
              </div>
            </div>
            <Link
              href={`/customers/${customer.id}`}
              className="text-primary underline"
            >
              View
            </Link>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error getting customers: ", error);
  }
}
