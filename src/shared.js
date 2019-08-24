import hexToRgba from 'hex-to-rgba';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const startAnimationHelper = (animation, duration) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration
      })
    ])
  ).start();
};

export const getInterpolatedColor = (animation, primaryColor, secondaryColor) =>
  animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      primaryColor.includes('rgb') ? primaryColor : hexToRgba(primaryColor),
      secondaryColor.includes('rgba') ? secondaryColor : hexToRgba(secondaryColor)
    ]
  });

export const paragraphInitialStyles = (index, pHeight, pWidth) => {
  const height = pHeight;
  let width = pWidth;
  if (pWidth.constructor === Array) {
    width = pWidth[index] || '100%';
  }
  return {
    height,
    width
  };
};
export const commonPropTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  animationDuration: PropTypes.number,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.bool,
  listSize: PropTypes.number,
  titleStyles: PropTypes.object,
  avatar: PropTypes.bool,
  aShape: PropTypes.oneOf(['circle', 'square']),
  aSize: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['small', 'large', 'default'])]),
  reverse: PropTypes.bool,
  containerStyles: PropTypes.object
};
export const commonDefaultProps = {
  primaryColor: 'rgba(220, 220, 220, 1)',
  secondaryColor: 'rgba(200, 200, 200, 1)',
  animationDuration: 500,
  loading: null,
  active: false,
  title: true,
  listSize: 1,
  titleStyles: {},
  avatar: false,
  aShape: 'circle',
  aSize: 'default',
  reverse: false,
  containerStyles: {}
};
