"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hex_to_rgba_1 = __importDefault(require("hex-to-rgba"));
const react_native_1 = require("react-native");
exports.startAnimationHelper = (animation, duration) => {
    react_native_1.Animated.loop(react_native_1.Animated.sequence([
        react_native_1.Animated.timing(animation, {
            toValue: 1,
            duration
        }),
        react_native_1.Animated.timing(animation, {
            toValue: 0,
            duration
        })
    ])).start();
};
exports.getInterpolatedColor = (animation, primaryColor, secondaryColor) => animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
        primaryColor.includes('rgb') ? primaryColor : hex_to_rgba_1.default(primaryColor),
        secondaryColor.includes('rgba') ? secondaryColor : hex_to_rgba_1.default(secondaryColor)
    ]
});
exports.paragraphInitialStyles = (index, pHeight, pWidth) => {
    const height = pHeight;
    let width = pWidth;
    if (pWidth.constructor === Array) {
        width = pWidth[index] || '100%';
    }
    return {
        height,
        width
    };
};
exports.commonDefaultProps = {
    primaryColor: 'rgba(220, 220, 220, 1)',
    secondaryColor: 'rgba(200, 200, 200, 1)',
    animationDuration: 500,
    loading: null,
    active: false,
    title: true,
    listSize: 1,
    titleStyles: {},
    avatar: false,
    aShape: 'circle',
    aSize: 'default',
    reverse: false,
    containerStyles: {}
};
//# sourceMappingURL=shared.js.map