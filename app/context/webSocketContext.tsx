import { createContext, ReactNode, useContext } from 'react';
import { useWebSocket } from '@/app/lib/wsService';

interface WebSocketProviderProps {
  children: ReactNode;
  url: string;
}

const WebSocketContext = createContext<any>(null);

export const WebSocketProvider = ({ children, url }: WebSocketProviderProps) => {
  const webSocketService = useWebSocket(url);

  return (
    <WebSocketContext.Provider value={webSocketService}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketData = () => {
  return useContext(WebSocketContext);
};
