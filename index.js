import React, { PureComponent } from "react";
import { Animated, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
const AVATAR_SIZE = {
  default: 50,
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
  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: this.props.animationDuration
        }),
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: this.props.animationDuration
        })
      ])
    ).start();
  };
  componentDidMount() {
    if (this.props.active) {
      this.startAnimation();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading) {
        this.startAnimation();
      }
    }
  }

  render() {
    const interpolatedBackground = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.primaryColor, this.props.secondaryColor]
    });
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
      loading
    } = this.props;
    if (loading === false) {
      return this.props.children || null;
    }
    const paragraphInitialStyles = index => {
      let height = pHeight;
      let width = pWidth;
      if (pWidth.constructor === Array && pWidth[index]) {
        width = pWidth[index];
      }
      return {
        height,
        width
      };
    };
    const titleInitialStyles = {
      height: tHeight,
      width: tWidth
    };
    const avatarInitialStyles = {
      height: AVATAR_SIZE[aSize] || aSize,
      width: AVATAR_SIZE[aSize] || aSize,
      borderRadius: aShape === "circle" ? AVATAR_SIZE[aSize]/2 || aSize/2 : 3,
      marginRight: reverse ? 0 : 10,
      marginLeft: reverse ? 10 : 0
    };
    return (
      <View
        style={[
          styles.container,
          { flexDirection: reverse ? "row-reverse" : "row" },
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
                    paragraphInitialStyles(index),
                    paragraphStyles,
                    { backgroundColor: interpolatedBackground }
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

ContentLoader.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  animationDuration: PropTypes.number,
  loading: PropTypes.bool,
  title: PropTypes.bool,
  paragraph: PropTypes.bool,
  pHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  pRows: PropTypes.number,
  tWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  paragraphStyles: PropTypes.object,
  titleStyles: PropTypes.object,

  avatar: PropTypes.bool,
  aShape: PropTypes.oneOf(["circle", "square"]),
  aSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["small", "large", "default"])
  ]),
  reverse: PropTypes.bool,
  containerStyles: PropTypes.object
};
ContentLoader.defaultProps = {
  primaryColor: "rgba(195, 191, 191, 1)",
  secondaryColor: "rgba(218, 215, 215, 1)",
  animationDuration: 500,
  loading: null,
  active: false,
  title: true,
  paragraph: true,
  pHeight: 14,
  pWidth: "80%",
  pRows: 4,
  tWidth: "60%",
  tHeight: 20,
  paragraphStyles: {},
  titleStyles: {},
  avatar: false,
  aShape: "circle",
  aSize: "default",
  reverse: false,
  containerStyles: {}
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
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
