import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


export const FadeInTemp = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
};

export const FadeInHumid = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            delay: 250,
        }).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
};

export const FadeInSmoke = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            delay: 500,
        }).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
};