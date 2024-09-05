'use client'

import { lusitana } from "@/app/ui/fonts";
import Ticker from "@/app/ui/dashboard/ticker";
import { useState, useEffect } from "react";
import { useWebSocketData } from "@/app/context/webSocketContext";
import { HOLDINGS } from "@/app/lib/placeholder-crypto";


// mock data from alphavantage api
const inflationData = {
  "name": "Inflation - US Consumer Prices",
  "interval": "annual",
  "unit": "percent",
  "data": [
    {
        "date": "2023-01-01",
        "value": "4.11633838374488"
    },
  ]
};

const unemploymentData = {
  "name": "Unemployment Rate",
  "interval": "monthly",
  "unit": "percent",
  "data": [
    {
        "date": "2024-07-01",
        "value": "4.3"
    },
  ]
};

const tenYearYield = {
  "name": "10-Year Treasury Constant Maturity Rate",
  "interval": "monthly",
  "unit": "percent",
  "data": [
    {
        "date": "2024-08-01",
        "value": "3.87"
    },
  ]
};

const interestRateData = {
  "name": "Effective Federal Funds Rate",
  "interval": "monthly",
  "unit": "percent",
  "data": [
    {
        "date": "2024-08-01",
        "value": "5.33"
    },
  ]
};

const nonFarmData = {
  "name": "Total Nonfarm Payroll",
  "interval": "monthly",
  "unit": "thousands of persons",
  "data": [
    {
        "date": "2024-07-01",
        "value": "158445"
    },
  ]
};

export default function Page() {
  const [total, setTotal] = useState<any>("0");
  const webSocket = useWebSocketData();
  const holdings: any = [].concat(HOLDINGS); // need to move this information to db
  const msft = holdings.filter(({ symbol }) => symbol === "MSFT")[0];

  const calculateHoldings = () => {
    let total: any = 0;

    holdings.forEach((holding: any) => {
      const { symbol, amount, lastPrice, market} = holding;
      total += (Number.parseFloat(amount) * Number.parseFloat(lastPrice));
    });

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
      <h1>Inflation : %{Number.parseFloat(inflationData.data[0].value).toFixed(2)}</h1>
      <h1>Intrest Rate : %{Number.parseFloat(interestRateData.data[0].value)}</h1>
      <h1>Treasury Return (10yr) : %{Number.parseFloat(tenYearYield.data[0].value)}</h1>
      <h1>Unemployment Rate : %{Number.parseFloat(unemploymentData.data[0].value)}</h1>
      <h1>Nonfarm Payroll (x 1k people): {Number.parseFloat(nonFarmData.data[0].value)}</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      </div>
    </main>
  );
}
