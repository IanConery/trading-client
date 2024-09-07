import Link from "next/link";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { HOLDINGS } from "@/app/lib/placeholder-crypto";

export default function Page() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Assets
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-neutral-800 p-4">
        <div className="bg-neutral-600 px-6">
          {HOLDINGS.map((holding, i) => {
            const { symbol, amount, market, position } = holding;
            return (
              <div
                key={holding.symbol}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {holding.symbol}
                    </p>
                    <p className="hidden text-sm sm:block">
                      {holding.market}
                    </p>
                  </div>
                </div>
                <p>{holding.position}</p>
                <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`} >
                  {holding.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Link key="create" href="/dashboard/holdings/create">
            <p>Add</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
