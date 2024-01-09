import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPressBtn }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPressBtn}
        style={
          ({ pressed }) =>
            pressed
              ? [styles.pressed, styles.buttonInnerContainer]
              : styles.buttonInnerContainer
          // 배열로 묶을 경우 여러 스타일을 적용시킬 수 있다.
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },

  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  pressed: {
    opacity: 0.75,
  },
});
