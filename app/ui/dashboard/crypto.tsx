/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/app/lib/utils";
import { useEffect, useState } from 'react';
import { useWebSocketData } from "@/app/context/webSocketContext";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon} from '@heroicons/react/24/outline';

interface Props {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    iconCode: number;
    price: number | string | null;
    high_24_h: number | string;
    low_24_h: number | string;
    high_52_w: number | string;
    low_52_w: number | string;
    price_percent_chg_24_h: number | string;
    volume_24_h: number | string;
    product_id: string;
    prevPrice: number;
    explorer: string;
  };
}

function Crypto({ crypto }: Props) {
  const [data, setData] = useState<any>(crypto);
  const webSocket = useWebSocketData();
  const {
    product_id,
    iconCode,
    id,
    price,
    price_percent_chg_24_h,
  } = data;

  const percentage = Intl.NumberFormat('en-US', {style: "percent", maximumFractionDigits: 2}).format(price_percent_chg_24_h);
  const percentChange = Number.parseFloat(price_percent_chg_24_h).toFixed(2);
  const isUp = Number.parseFloat(percentChange) >= 0;

  useEffect(() => {
    const unsubscribe = webSocket.subscribe(product_id, (payload: any) => {
      setData(Object.assign({}, crypto, payload));
    });

    return () => unsubscribe();
  }, [webSocket]);

  return (
    <div className="max-w p-2 bg-neutral-800 rounded-lg">
      <div className="flex justify-between">
        <div className="justify-start flex">
          <img className="w-6 h-6 rounded-full" src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${iconCode}.png`} />
          <div className="pl-3">
            <div className="flex">
              <h5 className="text-lg font-semibold tracking-tight text-stone-300">{id}</h5>
              {isUp ? (
                <ArrowTrendingUpIcon className="w-4 text-green-600 ml-3" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 text-red-500 ml-3" />
              )}
              <h2 className={`pl-1 pt-[6px] text-xs ${isUp ? "text-green-600" : "text-red-500"}`}>{percentChange}%</h2>
            </div>
          </div>
        </div>
        <h5 className="font-semibold tracking-tight text-stone-300">{formatPrice(price)}</h5>
      </div>
    </div>
  );
}

export default Crypto;
