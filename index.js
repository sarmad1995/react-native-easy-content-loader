
import React, { Component } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types';

class ContentLoader extends Component {
    constructor(props) {
        super(props);
        if (props.children.length > 0) {
            throw Error('Only one child allowed inside Content Loader');
        }
        this.state = {
            animation: new Animated.Value(0)
        }
    }
    startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: this.props.animationDuration,
                }),
                Animated.timing(this.state.animation, {
                    toValue: 0,
                    duration: this.props.animationDuration
                })
            ]),
        ).start()
    }
    componentDidMount() {
        if (this.props.loading) {
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
        if (this.props.loading) {
            return (<Animated.View
                style={{
                    ...this.props.children.props.style,
                    backgroundColor: interpolatedBackground
                }}
            />);
        }
        return this.props.children;

    }
}


ContentLoader.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    animationDuration: PropTypes.number,
    children: PropTypes.element.isRequired,
    loading: PropTypes.bool,
}
ContentLoader.defaultProps = {
    primaryColor: 'rgba(195, 191, 191, 1)',
    secondaryColor: 'rgba(218, 215, 215, 1)',
    animationDuration: 500,
    loading: false
};


export default ContentLoader;