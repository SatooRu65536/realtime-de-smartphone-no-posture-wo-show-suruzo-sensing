import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";
import Home from "@/components/Home";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Home />
    </ThemeProvider>
  );
}
