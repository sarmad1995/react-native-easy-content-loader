import { Animated, ViewStyle } from 'react-native';
export declare type WidthArrayType = number | string;
export declare type AShapeType = 'circle' | 'square';
export declare type ASizeType = string | number | 'small' | 'large' | 'default';
export declare type PHeightType = string | number;
export declare type PWidthType = string | number | Array<WidthArrayType>;
export declare type TWidthType = string | number;
export declare type THeightType = string | number;
export declare type AnimationType = Animated.Value | Animated.ValueXY;
export declare type ColorType = string;
export declare const startAnimationHelper: (animation: AnimationType, duration: number) => void;
export declare const getInterpolatedColor: (animation: Animated.Value, primaryColor: string, secondaryColor: string) => Animated.AnimatedInterpolation;
export declare const paragraphInitialStyles: (index: number, pHeight: WidthArrayType, pWidth: PWidthType) => {
    height: WidthArrayType;
    width: PWidthType;
};
export interface CommonProps {
    /**
     * The color of primary shade of the loader, can be rgba or hex color.
     */
    primaryColor: string;
    /**
     * The color of secondary shade of the loader, can be rgba or hex color.
     */
    secondaryColor: string;
    /**
     * Animation duration of the fade, default is 500.
     */
    animationDuration: number;
    /**
     * If loading prop is used, it will render children when loading false.
     * Usefull when you want to render something after loading finishes,
     * just add something like loading={this.state.loading} and you can add your component as children.
     */
    loading?: boolean | null;
    /**
     * Used to toggle animation,
     * True - Animation enabled
     * False - Animation disabled
     */
    active?: boolean;
    /**
     * Enalbes or disables the title
     */
    title?: boolean;
    /**
     * If you want to render the loaders in list, default is 1.
     * If you provide more than one, it will render the loaders in a list.
     */
    listSize: number;
    /**
     * Add addtional title styles.
     */
    titleStyles?: ViewStyle;
    /**
     * Used to determine if avatar should be visible or not
     */
    avatar?: boolean;
    /**
     * Used to determine the shape of avatar
     * can be
     * circle or square or if you want some kind of custamized shape, you can always overwrite avatarStyles
     */
    aShape?: AShapeType;
    /**
     * The size of avatar, can be default, large, small or your custom number
     */
    aSize: ASizeType;
    /**
     * Can be used to reverse the flow,
     */
    reverse?: boolean;
    /**
     * If you want to add additional properties or overwrite the styles of the main container.
     */
    containerStyles?: ViewStyle;
}
export declare const commonDefaultProps: CommonProps;
