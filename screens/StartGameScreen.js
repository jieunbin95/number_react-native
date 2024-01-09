import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enterNumber, setEnterNumber] = useState("");

  function numberInputHandler(event) {
    setEnterNumber(event);
  }

  function resetInputHandler() {
    setEnterNumber("");
  }

  function confirmInputHandler() {
    // 유효성검사논리 추가하기
    const choseNumber = parseInt(enterNumber);
    // 문자열->숫자 타입으로 변환

    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      // 경고 알람 보여주기
      Alert.alert(
        "유효한 숫자가 아닙니다.", //제목
        "1에서 99사이의 숫자를 입력하세요", //내용
        [{ text: "Ok", style: "destructive", onPress: resetInputHandler }] //버튼
      );
      //alert의 첫번째인수:제목 두번째인수:내용 세번째인수:경고창의 버튼
      // 경고창 버튼의 경우 텍스트(내용)와 스타일, onPress이벤트가 있다
      return;
      // return을 통해 confirmInputHandler함수를 종료시킨다
    }

    onPickNumber(choseNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={numberInputHandler}
          value={enterNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressBtn={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressBtn={confirmInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
});
