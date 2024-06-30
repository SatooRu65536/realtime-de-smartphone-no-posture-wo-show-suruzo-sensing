import { useSensor } from "@/hooks/useSensor";
import { getClient } from "@/util/socket";
import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Home() {
  const [client, setClient] = useState(getClient());
  const [data, { subscribe, unsubscribe }] = useSensor((d) => {
    console.log(d);
    const sendData = JSON.stringify({
      timestamp: d?.accelerationIncludingGravity?.timestamp,
      accelerometer: {
        x: d?.accelerationIncludingGravity?.x,
        y: d?.accelerationIncludingGravity?.y,
        z: d?.accelerationIncludingGravity?.z,
      },
      gyroscope: {
        x: d?.rotationRate?.alpha,
        y: d?.rotationRate?.beta,
        z: d?.rotationRate?.gamma,
      },
    });
    try {
      client?.write(sendData);
    } catch (e) {
      console.log(e);
      setClient(getClient());
    }
  }, 1000 / 20);

  return (
    <View style={styles.container}>
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
      <Text>{data?.accelerationIncludingGravity?.x}</Text>
      <Text>{data?.accelerationIncludingGravity?.y}</Text>
      <Text>{data?.accelerationIncludingGravity?.z}</Text>
      <Text>角速度:</Text>
      <Text>{data?.rotation?.alpha}</Text>
      <Text>{data?.rotation?.beta}</Text>
      <Text>{data?.rotation?.gamma}</Text>
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
