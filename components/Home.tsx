import { useSensor } from "@/hooks/useSensor";
import { getClient } from "@/util/socket";
import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Home() {
  const [client] = useState(getClient());
  const [data, { subscribe, unsubscribe }] = useSensor((d) => {
    const sendData = JSON.stringify(d);
    client?.write(sendData);
    console.log(sendData);
  }, 1000 / 30);

  return (
    <View style={styles.container}>
      <Text>Hello, Sensor!!</Text>
      <Button
        onPress={subscribe}
        title="Subscribe"
        color="#841584"
        accessibilityLabel="Subscribe"
      />
      <Button
        onPress={unsubscribe}
        title="Unsubscribe"
        color="#841584"
        accessibilityLabel="Unsubscribe"
      />
      <Text>加速度:</Text>
      <Text>{data.accelerometer?.x}</Text>
      <Text>{data.accelerometer?.y}</Text>
      <Text>{data.accelerometer?.z}</Text>
      <Text>角速度:</Text>
      <Text>{data.gyroscope?.x}</Text>
      <Text>{data.gyroscope?.y}</Text>
      <Text>{data.gyroscope?.z}</Text>
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
