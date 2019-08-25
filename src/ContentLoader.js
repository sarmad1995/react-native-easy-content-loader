import React, { PureComponent } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  getInterpolatedColor,
  commonPropTypes,
  commonDefaultProps,
  startAnimationHelper,
  paragraphInitialStyles
} from './shared';
/**
 * default content loader .
 *
 * can be customized to the needs, .
 *
 */
const AVATAR_SIZE = {
  default: 50,
  large: 70,
  small: 35
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
      title,
      paragraph,
      pHeight,
      pWidth,
      pRows,
      paragraphStyles,
      tHeight,
      tWidth,
      titleStyles,
      avatar,
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
      marginRight: reverse ? 0 : 10,
      marginLeft: reverse ? 10 : 0
    };
    return [...Array(listSize)].map((_, index) => (
      <View
        key={index}
        style={[
          { paddingBottom: listSize > 1 ? 20 : 0 },
          styles.container,
          { flexDirection: reverse ? 'row-reverse' : 'row' },
          containerStyles
        ]}
      >
        {avatar && (
          <Animated.View
            style={[
              styles.avatar,
              avatarInitialStyles,
              avatarStyles,
              { backgroundColor: interpolatedBackground }
            ]}
          />
        )}
        <View style={styles.content}>
          {title && (
            <Animated.View
              style={[
                styles.title,
                titleInitialStyles,
                titleStyles,
                { backgroundColor: interpolatedBackground }
              ]}
            />
          )}
          {paragraph && (
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
          )}
        </View>
      </View>
    ));
  }
}

ContentLoader.propTypes = {
  ...commonPropTypes,
  paragraph: PropTypes.bool,
  pHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  pRows: PropTypes.number,
  tWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paragraphStyles: PropTypes.object
};
ContentLoader.defaultProps = {
  ...commonDefaultProps,
  paragraph: true,
  pHeight: 8,
  pWidth: '80%',
  pRows: 4,
  tWidth: '60%',
  tHeight: 15,
  paragraphStyles: {}
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10
  },
  content: {
    flex: 1
  },
  avatar: {
    borderRadius: 2
  },
  title: {
    marginBottom: 10,
    borderRadius: 3
  },
  paragraph: {
    marginVertical: 5,
    borderRadius: 3
  },

  paragraphContainer: {}
});
export default ContentLoader;
