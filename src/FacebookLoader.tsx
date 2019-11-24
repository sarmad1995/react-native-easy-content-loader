import * as React from "react";
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';
import {
  getInterpolatedColor,
  startAnimationHelper,
  commonDefaultProps,
  paragraphInitialStyles,
  CommonProps,
  PHeightType,
  PWidthType,
  THeightType,
  TWidthType
} from './shared';

const AVATAR_SIZE = {
  default: 70,
  large: 30,
  small: 25
};
interface Props extends CommonProps {
  /**
   * Used to determine height of the paragraph line.
   */
  pHeight: PHeightType,
  /**
   * Used to determine the width of the paragraph lines, If you want dymanic widths for each line, you can add an array 
   * [100,200,300] 
   */
  pWidth: PWidthType,
  /**
   * Used to determine how many paragraph rows should be rendered.
   */
  pRows: number,
  /**
   * Add additional styles or overwrite previous ones 
   */
  paragraphStyles?: ViewStyle,
  /**
   * Used to determine the height of the main title
   */
  tHeight: THeightType,
  /**
   * Used to determine the width of the main title
   */
  tWidth: TWidthType,
  /**
   * Add additional styles or overwrite previous ones
   */
  secondaryTitleStyles?: ViewStyle,
  /**
   * Used to determine the height of the secondary title
   */
  sTWidth: string | number,
  /**
   * Used to determine the width of the secondary title
   */
  avatarStyles?: ViewStyle
}
class ContentLoader extends React.PureComponent<Props> {
  static defaultProps: Props;
  state = {
      animation: new Animated.Value(0)
  };
  

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
      borderRadius: aShape === 'circle' ? AVATAR_SIZE[aSize] / 2 || (aSize as any) / 2 : 3,
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
