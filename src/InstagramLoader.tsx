import * as React from "react";
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';
import {
  getInterpolatedColor,
  startAnimationHelper,
  commonDefaultProps,
  CommonProps, 
  THeightType,
  TWidthType
} from './shared';

const AVATAR_SIZE = {
  default: 60,
  large: 30,
  small: 25
};
interface Props extends CommonProps {
  /**
   * Used to determine the height of the main title.
   */
  tHeight: THeightType,
  /**
   * Used to determine the width of the main title.
   */
  tWidth: TWidthType,
  /**
   * Used to determine the height of secondary title.
   */
  sTHeight: string | number,
  /**
   * Used to determine the width of secondary title.
   */
  sTWidth: string | number,
  /**
   * add additinal imageStyles or overwrite previous ones.
   */
  imageStyles?: ViewStyle,
  /**
   * Used to determine height of the image
   */
  imageHeight: string | number,
  /**
   * add additional avatarStyles or overwrite them
   */
  avatarStyles?: ViewStyle
  /**
   * add additional secondary title styles or overwrite them.
   */
  secondaryTitleStyles?: ViewStyle
}
class ContentLoader extends React.PureComponent<Props> {
  static defaultProps: Props;
  state = {
      animation: new Animated.Value(0)
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
      imageStyles,
      sTHeight,
      sTWidth,
      tHeight,
      tWidth,
      titleStyles,
      secondaryTitleStyles,
      aShape,
      aSize,
      avatarStyles,
      reverse,
      containerStyles,
      loading,
      imageHeight,
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
    const imageInitialStyles = {
      height: imageHeight,
      width: '100%'
    };
    const titleInitialStyles = {
      height: tHeight,
      width: tWidth
    };
    const secondaryTitleInitialStyles = {
      height: sTHeight,
      width: sTWidth
    };
    const avatarInitialStyles = {
      height: AVATAR_SIZE[aSize] || aSize,
      width: AVATAR_SIZE[aSize] || aSize,
      borderRadius: aShape === 'circle' ? AVATAR_SIZE[aSize] / 2 || (aSize as any) / 2 : 3,
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
        <View style={styles.ImageContainer}>
          <Animated.View
            style={[
              styles.image,
              imageInitialStyles,
              imageStyles,
              { backgroundColor: interpolatedBackground }
            ]}
          />
        </View>
      </View>
    ));
  }
}

ContentLoader.defaultProps = {
  ...commonDefaultProps,
  sTWidth: '25%',
  tWidth: '40%',
  tHeight: 13,
  imageHeight: 200,
  imageStyles: {},
  sTHeight: 7
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
    marginBottom: 10,
    borderRadius: 3
  },
  secondaryTitle: {
    borderRadius: 3
  },
  image: {
    marginVertical: 5,
    borderRadius: 5
  },

  ImageContainer: {
    paddingHorizontal: 12,
    marginTop: 10
  }
});
export default ContentLoader;