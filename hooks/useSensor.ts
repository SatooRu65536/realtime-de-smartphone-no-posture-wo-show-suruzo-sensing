import { useState } from "react";
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { Subscription } from "expo-sensors/build/DeviceSensor";

interface SensorData {
  x: number;
  y: number;
  z: number;
}

export interface SensorsData {
  timestamp: number;
  accelerometer: SensorData;
  gyroscope: SensorData;
}

type PartialSensorsData = Pick<SensorsData, "timestamp"> &
  Partial<Omit<SensorsData, "timestamp">>;

type Handler = (data: SensorsData) => void;

export const useSensor = (handler?: Handler, sampleingRate = 1 / 60) => {
  const [accelerometer, setAcc] = useState<SensorData>();
  const [accSubscription, setAccSubscription] = useState<Subscription>();

  const [gyroscope, setGyro] = useState<SensorData>();
  const [gyroSubscription, setGyroSubscription] = useState<Subscription>();

  /**
   * センサーの読み込みを開始する
   */
  const subscribe = () => {
    // 加速度
    console.log({Accelerometer});
    const acc = Accelerometer.addListener((data) => setAcc(data));
    Accelerometer.setUpdateInterval(sampleingRate);
    setAccSubscription(acc);

    // 角速度
    Gyroscope.setUpdateInterval(sampleingRate);
    const gyro = Gyroscope.addListener((data) => setGyro(data));
    setGyroSubscription(gyro);
  };

  /**
   * センサーの読み込みを停止する
   */
  const unsubscribe = () => {
    // 加速度
    accSubscription?.remove();
    setAccSubscription(undefined);

    // 角速度
    gyroSubscription?.remove();
    setGyroSubscription(undefined);
  };

  const timestamp = Date.now();

  const data: PartialSensorsData = {
    timestamp,
    accelerometer,
    gyroscope,
  };

  if (handler && hasSensorData(data)) {
    handler(data);
  }

  return [data, { subscribe, unsubscribe }] as const;
};

export function hasSensorData(data: PartialSensorsData): data is SensorsData {
  return data.accelerometer != null && data.gyroscope != null;
}
