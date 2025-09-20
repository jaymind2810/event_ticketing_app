import { useEffect, useRef, useState } from "react";

export const baseURL = import.meta.env.VITE_APP_SOCKET_URL

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `${baseURL}${url}`;
    // const wsUrl = `${url}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log(`Connected to ${url}`);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onclose = () => {
      console.log(`Disconnected from ${url}`);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return messages;
}
