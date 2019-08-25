import React, { PureComponent } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  getInterpolatedColor,
  startAnimationHelper,
  commonPropTypes,
  commonDefaultProps,
  paragraphInitialStyles
} from './shared';

const AVATAR_SIZE = {
  default: 70,
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
      pHeight,
      pWidth,
      pRows,
      paragraphStyles,
      tHeight,
      tWidth,
      titleStyles,
      secondaryTitleStyles,
      aShape,
      sTWidth,
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
    const secondaryTitleInitialStyles = {
      height: tHeight,
      width: sTWidth
    };
    const avatarInitialStyles = {
      height: AVATAR_SIZE[aSize] || aSize,
      width: AVATAR_SIZE[aSize] || aSize,
      borderRadius: aShape === 'circle' ? AVATAR_SIZE[aSize] / 2 || aSize / 2 : 3,
      marginRight: reverse ? 0 : 10,
      marginLeft: reverse ? 10 : 0
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
            <Animated.View
              style={[
                styles.secondaryTitle,
                secondaryTitleInitialStyles,
                secondaryTitleStyles,
                { backgroundColor: interpolatedBackground }
              ]}
            />
          </View>
        </View>
        <View style={styles.paragraphContainer}>
          {[...Array(pRows)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.paragraph,
                paragraphInitialStyles(index, pHeight, pWidth),
                paragraphStyles,
                { backgroundColor: interpolatedBackground }
              ]}
            />
          ))}
        </View>
      </View>
    ));
  }
}

ContentLoader.propTypes = {
  ...commonPropTypes,
  pHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  pRows: PropTypes.number,
  tWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sTWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paragraphStyles: PropTypes.object,
  secondaryTitleStyles: PropTypes.object
};
ContentLoader.defaultProps = {
  ...commonDefaultProps,
  pHeight: 7,
  pWidth: ['85%', '95%', '75%'],
  pRows: 3,
  tWidth: '50%',
  tHeight: 7,
  sTWidth: '30%',
  paragraphStyles: {},
  secondaryTitleStyles: {}
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
    marginLeft: 0
  },
  avatar: {
    borderRadius: 2,
    marginLeft: 10
  },
  title: {
    marginBottom: 12,
    borderRadius: 3
  },
  secondaryTitle: {
    marginBottom: 10,
    borderRadius: 3
  },
  paragraph: {
    marginVertical: 7,
    borderRadius: 3
  },

  paragraphContainer: {
    paddingHorizontal: 12,
    marginTop: 10
  }
});
export default ContentLoader;
