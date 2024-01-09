import { View, StyleSheet, Dimensions } from "react-native";
// 디바이스의 크기에 따른 스타일을 줄 경우 Dimensions를 사용한다
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;
// Dimensions를 get한 후 너비나 높이를 지정해준 뒤 스타일을 if문이나 삼항식을 이용해
// 높이나 너비에 따른 스타일을 다르게 줄 수있다.

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary600,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
});
