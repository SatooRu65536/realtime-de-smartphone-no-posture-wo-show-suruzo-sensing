import TcpSocket from "react-native-tcp-socket";

export function getClient() {
  try {
    const client = TcpSocket.createConnection(
      { port: 12345, host: "192.168.11.9" },
      () => {},
    );
    return client;
  } catch (e) {
    alert("失敗");
  }
}
