import React, { createContext, useContext } from "react";
import io from "socket.io-client";
import * as uri from "./constants/urls";

// Define your server URL here
const serverUrl = "http://192.168.43.5:3500";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = io(serverUrl);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
