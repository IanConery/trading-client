import { useEffect } from "react";

let socket: WebSocket;
let listeners: { [key: string]: Function[] } = {};
let queue: (() => void)[] = [];

const request = {
  "type": "subscribe",
  "product_ids": ["XRP-USD", "BTC-USD", "LTC-USD", "ETH-USD"],
  "channel": "ticker"
}

export const useWebSocket = (url: string) => {
  useEffect(() => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log(`Connection opened to ${url}`);
      socket.send(JSON.stringify(request));
      console.log('request sent');
      queue.forEach((cb) => cb());
      console.log(`the queue has processed ${queue.length} requests`);
      queue = [];
      console.log(`the queue has been flushed`);
    };

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.channel === 'ticker') {
        data.events.forEach((event: any) => {
          if (event.tickers) {
            event.tickers.forEach((ticker: any) => {
              const { product_id, price } = ticker;

              if (listeners[product_id]) {
                listeners[product_id].forEach((callback) => callback(ticker));
              }
              if (!listeners.all) {
                listeners.all = [];
              }
              listeners.all.forEach((callback) => callback({ product_id, price }));
            });
          }
        });
      }
    };

    socket.onerror = (error: Event) => {
      console.error(`WebSocket error: ${JSON.stringify(error)}`);
    };

    socket.onclose = () => {
      console.log(`Connection to ${url} closed`);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return {
    subscribe: (product_id: string, callback: Function) => {
      const subscribeToEvent = () => {
        if (!listeners[product_id]) {
          listeners[product_id] = [];
        }

        listeners[product_id].push(callback);
        console.log(`${product_id} has been subscribed`);
      };

      if (socket?.readyState === WebSocket.OPEN) {
        subscribeToEvent();
      } else {
        queue.push(subscribeToEvent);
        console.log(`${product_id} has been queued`);
      }

      return () => {
        if (listeners[product_id]) {
          listeners[product_id] = listeners[product_id].filter((cb) => cb !== callback);
          console.log(`${product_id} has unsubscribed`);
          if (listeners[product_id].length === 0) {
            delete listeners[product_id];
          }
        }
      };
    },
  };
};
