import { Text, View, StyleSheet, Button } from "react-native";
import TcpSocket from "react-native-tcp-socket";

export default function Home() {
  const send = () => {
    // Create socket
    try {
      const client = TcpSocket.createConnection(
        {
          port: 12345,
          host: "192.168.11.9",
        },
        () => {
          // Write on the socket
          client.write(
            '{"timestamp": 1719660262.709673, "accelerometer": {"x": 0, "y": 1, "z": 2}, "gyroscope": {"x": 3, "y": 4, "z": 5}}',
          );
          alert("成功: 192.168.11.9");
          // Close socket
          client.destroy();
        },
      );
    } catch (e) {
      alert("失敗");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Button
        onPress={send}
        title="Send socket"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
