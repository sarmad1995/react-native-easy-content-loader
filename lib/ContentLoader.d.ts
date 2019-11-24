import * as React from "react";
import { Animated, ViewStyle } from 'react-native';
import { CommonProps, PHeightType, PWidthType, TWidthType, THeightType } from './shared';
interface Props extends CommonProps {
    /**
     * Enables or disables paragraph lines.
     */
    paragraph?: boolean;
    /**
     * Used to determine height of the paragraph line.
     */
    pHeight: PHeightType;
    /**
     * Duration of fade animation, default = 500ms
     */
    animationDuration: number;
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
     * Used to determine the width of the title.
     */
    tWidth: TWidthType;
    /**
     * Used to determine the height of the title
     */
    tHeight: THeightType;
    /**
     * If you want to add additional styles/overwrite styles of paragraph
     */
    paragraphStyles?: ViewStyle;
    /**
      * If you want to add additional styles/overwrite styles of avatar
     */
    avatarStyles?: ViewStyle;
}
declare class ContentLoader extends React.PureComponent<Props> {
    static defaultProps: Props;
    state: {
        animation: Animated.Value;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    private startAnimation;
    render(): {} | null;
}
export default ContentLoader;
