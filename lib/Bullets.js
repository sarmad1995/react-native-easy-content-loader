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
    default: 20,
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
        const { tHeight, tWidth, titleStyles, aShape, aSize, avatarStyles, reverse, containerStyles, loading, listSize, primaryColor, secondaryColor, children } = this.props;
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
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>));
    }
}
ContentLoader.defaultProps = Object.assign({}, shared_1.commonDefaultProps, { tWidth: '80%', tHeight: 10 });
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
        borderRadius: 3
    },
    paragraph: {
        marginVertical: 5,
        borderRadius: 3
    }
});
exports.default = ContentLoader;
//# sourceMappingURL=Bullets.js.map