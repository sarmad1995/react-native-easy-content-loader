import * as React from "react";
import { Animated, ViewStyle } from 'react-native';
import { CommonProps, PHeightType, PWidthType, THeightType, TWidthType } from './shared';
interface Props extends CommonProps {
    /**
     * Used to determine height of the paragraph line.
     */
    pHeight: PHeightType;
    /**
     * Used to determine the width of the paragraph lines, If you want dymanic widths for each line, you can add an array
     * [100,200,300]
     */
    pWidth: PWidthType;
    /**
     * Used to determine how many paragraph rows should be rendered.
     */
    pRows: number;
    /**
     * Add additional styles or overwrite previous ones
     */
    paragraphStyles?: ViewStyle;
    /**
     * Used to determine the height of the main title
     */
    tHeight: THeightType;
    /**
     * Used to determine the width of the main title
     */
    tWidth: TWidthType;
    /**
     * Add additional styles or overwrite previous ones
     */
    secondaryTitleStyles?: ViewStyle;
    /**
     * Used to determine the height of the secondary title
     */
    sTWidth: string | number;
    /**
     * Used to determine the width of the secondary title
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
