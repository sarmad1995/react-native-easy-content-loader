import * as React from "react";
import { Animated, ViewStyle } from 'react-native';
import { THeightType, TWidthType, CommonProps } from './shared';
interface Props extends CommonProps {
    /**
     * Used to determine the height of the main title
     */
    tHeight: THeightType;
    /**
     * Used to determine the width of the main title
     */
    tWidth: TWidthType;
    /**
     * add additinal avatarstyles or overwrite previous ones
     */
    avatarStyles?: ViewStyle;
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
