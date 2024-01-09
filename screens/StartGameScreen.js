import {
  useWindowDimensions,
  TextInput,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enterNumber, setEnterNumber] = useState("");

  const { width, height } = useWindowDimensions();
  // 기기의 치수를 재는 훅

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

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="position" style={styles.screen}>
        {/* 가로모드일 경우 키보드 부분을 개선(ios) KeyboardAvoidingView+ScrollView사용*/}
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
                <PrimaryButton onPressBtn={resetInputHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressBtn={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//const deviceHeight = Dimensions.get("window").height;
//dimensions의 경우 한번 실행된 후 세로모드로 바뀔 경우 다시 랜더링 되지 않는다.
//따라서 상황에 맞게 스타일을 줄 경우 해당 코드를 컴포넌트 함수로 옮겨 사용해야 한다
// 기기의 방향이나 크기가 변경될 때 반응해야 하는 코드는 모두 컴포넌트 함수로 이동
// -->useWindowDimensions 사용

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  rootContainer: {
    flex: 1,
    //marginTop: deviceHeight < 400 ? 30 : 100,
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
