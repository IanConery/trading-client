'use client'

import { lusitana } from "@/app/ui/fonts";
import Ticker from "@/app/ui/dashboard/ticker";
import { useState, useEffect } from "react";
import { useWebSocketData } from "@/app/context/webSocketContext";
import { HOLDINGS } from "@/app/lib/placeholder-crypto";

export default function Page() {
  const [total, setTotal] = useState<any>("0");
  const webSocket = useWebSocketData();
  const holdings: any = [].concat(HOLDINGS); // need to move this information to db
  const msft = holdings.filter(({ symbol }) => symbol === "MSFT")[0];
  // const holdings = {
  //   "XRP-USD": {
  //     amount: 93189.296517,
  //     lastPrice: "0",
  //   },
  //   "BTC-USD": {
  //     amount: .89162235,
  //     lastPrice: "0",
  //   },
  //   "LTC-USD": {
  //     amount: 4,
  //     lastPrice: "0",
  //   },
  //   "ETH-USD": {
  //     amount: .490953,
  //     lastPrice: "0",
  //   },
  // };

  // const holdingsKeys = Object.keys(holdings);

  const calculateHoldings = () => {
    let total: any = 0;

    holdings.forEach((holding: any) => {
      const { symbol, amount, lastPrice, market} = holding;
      total += (Number.parseFloat(amount) * Number.parseFloat(lastPrice));
    });
    // for (const key in holdings) {
    //   const { amount, lastPrice } = holdings[key];
    //   total += (Number.parseFloat(amount) * Number.parseFloat(lastPrice));
    // }

    return Number.parseFloat(total).toFixed(2);
  };

  useEffect(() => {
    const unsubscribe = webSocket.subscribe("all", (payload: any) => {
      const { product_id, price } = payload;
      const temp = holdings.filter(({ symbol }) => symbol === product_id)[0];

      temp.lastPrice = price;

      setTotal(calculateHoldings);
    });

    return () => unsubscribe();
  }, [webSocket]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-lg md:text-xl`}>
        Overview
      </h1>
      <h1 className="mb-4 text-lg">Market Balances</h1>
      <div className="flex justify-end gap-4">
        <h1>Crypto : {Intl.NumberFormat('en-US', {style: "currency", currency: "USD", maximumFractionDigits: 2}).format(total - (msft.lastPrice * msft.amount))}</h1>
        <h1>Stock : {Intl.NumberFormat('en-US', {style: "currency", currency: "USD", maximumFractionDigits: 2}).format(msft.lastPrice * msft.amount)}</h1>
        <h1>Total : {Intl.NumberFormat('en-US', {style: "currency", currency: "USD", maximumFractionDigits: 2}).format(total)}</h1>
      </div>
      <div className="flex gap-8">
        <h1>DOW</h1>
        <h1>Nasdac</h1>
        <h1>S&P 500</h1>
      </div>
      <Ticker />
      <h1>Inflation</h1>
      <h1>Intrest Rate</h1>
      <h1>Treasury Return (10yr)</h1>
      <h1>Unemployment Rate</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      </div>
    </main>
  );
}
