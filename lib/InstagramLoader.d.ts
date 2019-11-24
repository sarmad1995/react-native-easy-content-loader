import * as React from "react";
import { Animated, ViewStyle } from 'react-native';
import { CommonProps, THeightType, TWidthType } from './shared';
interface Props extends CommonProps {
    /**
     * Used to determine the height of the main title.
     */
    tHeight: THeightType;
    /**
     * Used to determine the width of the main title.
     */
    tWidth: TWidthType;
    /**
     * Used to determine the height of secondary title.
     */
    sTHeight: string | number;
    /**
     * Used to determine the width of secondary title.
     */
    sTWidth: string | number;
    /**
     * add additinal imageStyles or overwrite previous ones.
     */
    imageStyles?: ViewStyle;
    /**
     * Used to determine height of the image
     */
    imageHeight: string | number;
    /**
     * add additional avatarStyles or overwrite them
     */
    avatarStyles?: ViewStyle;
    /**
     * add additional secondary title styles or overwrite them.
     */
    secondaryTitleStyles?: ViewStyle;
}
declare class ContentLoader extends React.PureComponent<Props> {
    static defaultProps: Props;
    state: {
        animation: Animated.Value;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    startAnimation: () => void;
    render(): {} | null;
}
export default ContentLoader;
