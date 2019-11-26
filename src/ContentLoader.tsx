import * as React from "react";

import { Animated, View, StyleSheet, ViewStyle } from 'react-native';

import {
  getInterpolatedColor,
  commonDefaultProps,
  startAnimationHelper,
  paragraphInitialStyles,
  CommonProps,
  PHeightType,
  PWidthType,
  TWidthType,
  THeightType,
} from './shared';
/**
 * default content loader .
 *
 *
 * can be customized to the needs, .
 */
interface ContentLoaderAvatar {
  default: string | number,
  large: string | number ,
  small: string | number
}
const AVATAR_SIZE: ContentLoaderAvatar= {
  default: 50,
  large: 70,
  small: 35
}
interface Props extends CommonProps {
  /**
   * Enables or disables paragraph lines.
   */
  paragraph?: boolean,
  /**
   * Used to determine height of the paragraph line.
   */
  pHeight: PHeightType,
  /**
   * Duration of fade animation, default = 500ms
   */
  animationDuration: number,
  /**
   * Used to determine the width of the paragraph lines, If you want dymanic widths for each line, you can add an array 
   * [100,200,300] 
   */
  pWidth: PWidthType
  /**
   * Used to determine how many paragraph rows should be rendered.
   */
  pRows: number,
  /**
   * Used to determine the width of the title.
   */
  tWidth: TWidthType,
  /**
   * Used to determine the height of the title
   */
  tHeight: THeightType,
  /**
   * If you want to add additional styles/overwrite styles of paragraph
   */
  paragraphStyles?: ViewStyle,
  /**
    * If you want to add additional styles/overwrite styles of avatar
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

  componentDidUpdate(prevProps: Props) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      if (loading) {
        this.startAnimation();
      }
    }
  }

  private startAnimation= (): void=> {
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
    const titleInitialStyles: ViewStyle = {
      height: tHeight,
      width: tWidth
    };
    const avatarInitialStyles: ViewStyle = {
      height: (AVATAR_SIZE as any)[aSize] || aSize,
      width: (AVATAR_SIZE as any)[aSize] || aSize,
      borderRadius: aShape === 'circle' ? (AVATAR_SIZE as any)[aSize] / 2 || (aSize as any) / 2 : 3,
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
