import { Text, StyleSheet, Platform } from "react-native";
// 디바이스마다 다른 스타일을 적용하고자 할 때 PlatformAPI를 사용

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    //borderWidth: Platform.OS === "android" ? 2 : 0,
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
