import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

const LoadingScreen = () => {
  const logoAnimation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    startLogoAnimation();
  }, []);

  const startLogoAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnimation, {
          toValue: 100, 
          duration: 1600, 
          easing: Easing.linear, 
          useNativeDriver: false, 
        }),
        Animated.timing(logoAnimation, {
          toValue: -50, 
          duration: 0, 
          useNativeDriver: false, 
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logo,
          {
            transform: [
              {
                translateX: logoAnimation, 
              },
            ],
          },
        ]}
      >
        <Image
          source={require('./Images/running_gold.png')} 
          style={styles.logoImage}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#033b64'
  },
  logo: {
    width: 70, // 로고 이미지 너비
    height:70, // 로고 이미지 높이
  },
  logoImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain', // 이미지 크기 조절 옵션
  },
});

export default LoadingScreen;
