'use client';

import SideNav from "@/app/ui/dashboard/sidenav";
import { WebSocketProvider } from "@/app/context/webSocketContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider url='wss://advanced-trade-ws.coinbase.com'>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-40">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </WebSocketProvider>
  );
}
