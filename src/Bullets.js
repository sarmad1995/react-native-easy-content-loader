import React, { PureComponent } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  getInterpolatedColor,
  commonPropTypes,
  commonDefaultProps,
  startAnimationHelper
} from './shared';

const AVATAR_SIZE = {
  default: 20,
  large: 30,
  small: 25
};

class ContentLoader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { active } = this.props;
    if (active) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      if (loading) {
        this.startAnimation();
      }
    }
  }

  startAnimation = () => {
    const { animation } = this.state;
    const { animationDuration } = this.props;
    startAnimationHelper(animation, animationDuration);
  };

  render() {
    const {
      tHeight,
      tWidth,
      titleStyles,
      aShape,
      aSize,
      avatarStyles,
      reverse,
      containerStyles,
      loading,
      listSize,
      primaryColor,
      secondaryColor,
      children
    } = this.props;
    const { animation } = this.state;

    const interpolatedBackground = getInterpolatedColor(animation, primaryColor, secondaryColor);

    if (loading === false) {
      return children || null;
    }

    const titleInitialStyles = {
      height: tHeight,
      width: tWidth
    };
    const avatarInitialStyles = {
      height: AVATAR_SIZE[aSize] || aSize,
      width: AVATAR_SIZE[aSize] || aSize,
      borderRadius: aShape === 'circle' ? AVATAR_SIZE[aSize] / 2 || aSize / 2 : 3,
      marginRight: reverse ? 0 : 5,
      marginLeft: reverse ? 5 : 0
    };
    return [...Array(listSize)].map((_, index) => (
      <View key={index} style={{ width: '100%', marginVertical: 8 }}>
        <View
          style={[
            styles.container,
            { flexDirection: reverse ? 'row-reverse' : 'row' },
            containerStyles
          ]}
        >
          <Animated.View
            style={[
              styles.avatar,
              avatarInitialStyles,
              avatarStyles,
              { backgroundColor: interpolatedBackground }
            ]}
          />

          <View style={styles.content}>
            <Animated.View
              style={[
                styles.title,
                titleInitialStyles,
                titleStyles,
                { backgroundColor: interpolatedBackground }
              ]}
            />
          </View>
        </View>
      </View>
    ));
  }
}

ContentLoader.propTypes = {
  ...commonPropTypes,
  tWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
ContentLoader.defaultProps = {
  ...commonDefaultProps,
  tWidth: '80%',
  tHeight: 10
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    marginLeft: 10
  },
  avatar: {
    borderRadius: 2
  },
  title: {
    borderRadius: 3
  },
  paragraph: {
    marginVertical: 5,
    borderRadius: 3
  }
});
export default ContentLoader;
