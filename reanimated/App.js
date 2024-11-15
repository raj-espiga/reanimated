import React, { useState } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';
import Reanimated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const FadeComponent = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isFadedIn, setIsFadedIn] = useState(false);

  const toggleFadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: isFadedIn ? 0 : 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => setIsFadedIn(!isFadedIn));
  };

  return (
    <View>
      <Button title="Toggle Fade Animation" onPress={toggleFadeAnimation} />
      <Animated.View style={{ ...styles.fadeBox, opacity: fadeAnim }}>
        <Text style={styles.text}>Fading Animation</Text>
      </Animated.View>
    </View>
  );
};

const TransitionComponent = () => {
  const transition = useSharedValue(500);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(transition.value, { duration: 1000 }) }],
    };
  });

  const toggleTransition = () => {
    transition.value = transition.value === 500 ? 0 : 500;
  };

  return (
    <View>
      <Button title="Toggle Transition Animation" onPress={toggleTransition} />
      <Reanimated.View style={[styles.transitionBox, animatedStyle]}>
        <Text style={styles.text}>Transition Animation</Text>
      </Reanimated.View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FadeComponent />
      <TransitionComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  fadeBox: {
    width: 200,
    height: 100,
    backgroundColor: '#82b1ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  transitionBox: {
    width: 300,
    height: 100,
    backgroundColor: '#ff8a80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});