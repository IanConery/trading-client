import Link from 'next/link';
import {
  ClockIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { HOLDINGS } from '@/app/lib/placeholder-crypto';

const markets = ["crypto", "stock"];
const symbols = HOLDINGS.map((holding) => holding.symbol);
const positions = ["long", "short"];

export default function Form() {
  return (
    <form>
      <div className="rounded-md bg-neutral-800 p-4 md:p-6">

        <div className="mb-4">
          <label htmlFor="market" className="mb-2 block text-sm font-medium">
            Choose market
          </label>
          <div className="relative">
            <select
              id="market"
              name="market"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a market
              </option>
              {markets.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
            <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="symbol" className="mb-2 block text-sm font-medium">
            Choose symbol
          </label>
          <div className="relative">
            <select
              id="symbol"
              name="symbol"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a symbol
              </option>
              {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Select position
          </label>
          <div className="relative">
            <select
              id="position"
              name="position"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a position
              </option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Enter quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                step="0.01"
                placeholder="Enter quantity of shares"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CircleStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/holdings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Holding</Button>
      </div>
    </form>
  );
}
