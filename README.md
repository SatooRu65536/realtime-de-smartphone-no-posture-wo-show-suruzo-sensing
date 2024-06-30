# リアルタイムでスマホの姿勢を見る蔵 (センサ取得側)
## ビルド方法
```bash
eas build --platform android
```

`--local` をつけると、ローカルでビルドされます。

## aab から apk に変換
### keysoreファイルの作成
```bash
keytool -genkey -v -keystore realtime-zou.keystore -alias realtime-zou-alias -keyalg RSA -keysize 2048 -validity 10000\
```

### apks ファイルの作成
```bash
bundletool build-apks --bundle=app.aab --output=app.apks --ks=realtime-zou.keystore --ks-pass=pass:[pass] --ks-key-alias=realtime-zou --key-pass=pass:[pass]
```

### apks ファイルのインストール
```bash
bundletool install-apks --apks=app.apks
```
