import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start p-4 md:h-40"
        href="/"
      >
        <div className="flex flex-col justify-center w-32 text-stone-300 md:w-40">
          <h1>Trading-Client</h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-stone-300 text-sm font-medium hover:bg-neutral-800 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <Link href="/">
              <div className="hidden md:block">Sign Out</div>
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
