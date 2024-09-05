import Link from "next/link";

export default function Page() {
  return (
  <>
    <p>Holdings Page</p>
    <div className="mt-5 grid grid-cols-1 gap-6">

    </div>
    <Link key="create" href="/dashboard/holdings/create">
      <p>Create</p>
    </Link>
  </>
  );
}
