import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
// expo에서 제공해주는 패키지를 이용해 선형그라데이션 추가해주기
// 터미널에 expo install expo-linear-gradient 설치해주기
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
// expo install expo-font
import AppLoading from "expo-app-loading";
//expo install expo-app-loading

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary600, Colors.accent500]}
      // 여러 색상을 배열을 통해 추가할 수 있다
      style={styles.rootScreen}
    >
      <ImageBackground
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        // 이미지의 스타일을 추가하고자 할 경우 사용
        source={require("./assets/images/background.png")}
        style={styles.rootScreen}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        {/* 안전 영역 경계 내에서 콘텐츠를 렌더링하는 것 */}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // View태그는 콘텐츠가 들어갈 만큼의 공간만 차지한다
    //따라서 전체 공간의 적용하길 원하는 경우 flex:1을 적용시킨다
  },

  backgroundImage: {
    opacity: 0.15,
  },
});
