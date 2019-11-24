"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const shared_1 = require("./shared");
const AVATAR_SIZE = {
    default: 60,
    large: 30,
    small: 25
};
class ContentLoader extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            animation: new react_native_1.Animated.Value(0)
        };
        this.startAnimation = () => {
            const { animation } = this.state;
            const { animationDuration } = this.props;
            shared_1.startAnimationHelper(animation, animationDuration);
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
    render() {
        const { imageStyles, sTHeight, sTWidth, tHeight, tWidth, titleStyles, secondaryTitleStyles, aShape, aSize, avatarStyles, reverse, containerStyles, loading, imageHeight, listSize, primaryColor, secondaryColor, children } = this.props;
        const { animation } = this.state;
        const interpolatedBackground = shared_1.getInterpolatedColor(animation, primaryColor, secondaryColor);
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
            borderRadius: aShape === 'circle' ? AVATAR_SIZE[aSize] / 2 || aSize / 2 : 3,
            marginRight: reverse ? 0 : 5,
            marginLeft: reverse ? 5 : 0
        };
        return [...Array(listSize)].map((_, index) => (<react_native_1.View key={index} style={{ width: '100%', marginVertical: 8 }}>
        <react_native_1.View style={[
            styles.container,
            { flexDirection: reverse ? 'row-reverse' : 'row' },
            containerStyles
        ]}>
          <react_native_1.Animated.View style={[
            styles.avatar,
            avatarInitialStyles,
            avatarStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>

          <react_native_1.View style={styles.content}>
            <react_native_1.Animated.View style={[
            styles.title,
            titleInitialStyles,
            titleStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>
            <react_native_1.Animated.View style={[
            styles.secondaryTitle,
            secondaryTitleInitialStyles,
            secondaryTitleStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.ImageContainer}>
          <react_native_1.Animated.View style={[
            styles.image,
            imageInitialStyles,
            imageStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>
        </react_native_1.View>
      </react_native_1.View>));
    }
}
ContentLoader.defaultProps = Object.assign({}, shared_1.commonDefaultProps, { sTWidth: '25%', tWidth: '40%', tHeight: 13, imageHeight: 200, imageStyles: {}, sTHeight: 7 });
const styles = react_native_1.StyleSheet.create({
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
exports.default = ContentLoader;
//# sourceMappingURL=InstagramLoader.js.map