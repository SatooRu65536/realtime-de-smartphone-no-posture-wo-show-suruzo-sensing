import { useState } from "react";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/DeviceSensor";

type Handler = (data: DeviceMotionMeasurement) => void;

export const useSensor = (handler?: Handler, sampleingRate = 1 / 60) => {
  const [data, setData] = useState<DeviceMotionMeasurement>();
  const [subscription, setSubscription] = useState<Subscription>();

  /**
   * センサーの読み込みを開始する
   */
  const subscribe = () => {
    const deviceMotion = DeviceMotion.addListener((data) => setData(data));
    DeviceMotion.setUpdateInterval(sampleingRate);
    setSubscription(deviceMotion);
  };

  /**
   * センサーの読み込みを停止する
   */
  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(undefined);
  };

  if (handler && data) handler(data);

  return [data, { subscribe, unsubscribe }] as const;
};
