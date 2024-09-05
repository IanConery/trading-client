import Crypto from "@/app/ui/dashboard/crypto";
import { CRYPTOCURRENCIES } from "@/app/lib/placeholder-crypto";

export default function Ticker() {
  const cryptocurrencies: any = CRYPTOCURRENCIES;
  return (
    <>
      <h1>Tickers</h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.keys(cryptocurrencies).map((currKey) => {
          return (
            <Crypto key={currKey} crypto={cryptocurrencies[currKey]} />
          )
        })}
      </div>
    </>
  );
}
