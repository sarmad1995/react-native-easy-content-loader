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
    default: 50,
    large: 70,
    small: 35
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
        const { title, paragraph, pHeight, pWidth, pRows, paragraphStyles, tHeight, tWidth, titleStyles, avatar, aShape, aSize, avatarStyles, reverse, containerStyles, loading, listSize, primaryColor, secondaryColor, children } = this.props;
        const { animation } = this.state;
        const interpolatedBackground = shared_1.getInterpolatedColor(animation, primaryColor, secondaryColor);
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
        return [...Array(listSize)].map((_, index) => (<react_native_1.View key={index} style={[
            { paddingBottom: listSize > 1 ? 20 : 0 },
            styles.container,
            { flexDirection: reverse ? 'row-reverse' : 'row' },
            containerStyles
        ]}>
        {avatar && (<react_native_1.Animated.View style={[
            styles.avatar,
            avatarInitialStyles,
            avatarStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>)}
        <react_native_1.View style={styles.content}>
          {title && (<react_native_1.Animated.View style={[
            styles.title,
            titleInitialStyles,
            titleStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>)}
          {paragraph && (<react_native_1.View style={styles.paragraphContainer}>
              {[...Array(pRows)].map((_, index) => (<react_native_1.Animated.View key={index} style={[
            styles.paragraph,
            shared_1.paragraphInitialStyles(index, pHeight, pWidth),
            paragraphStyles,
            { backgroundColor: interpolatedBackground }
        ]}/>))}
            </react_native_1.View>)}
        </react_native_1.View>
      </react_native_1.View>));
    }
}
ContentLoader.defaultProps = Object.assign({}, shared_1.commonDefaultProps, { paragraph: true, pHeight: 8, pWidth: '80%', pRows: 4, tWidth: '60%', tHeight: 15, paragraphStyles: {} });
const styles = react_native_1.StyleSheet.create({
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
exports.default = ContentLoader;
//# sourceMappingURL=ContentLoader.js.map