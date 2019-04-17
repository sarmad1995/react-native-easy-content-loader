
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
## react-native-easy-content-loader
Hate simple spinners? Here is a light weight content loader for you.

![](content-loader-gif-1.gif)
![](content-loader-gif-1.gif)

## Installation

```sh
npm install react-native-easy-content-loader --save
```

## Usage example

## NOTE: 
<pre>
<b>style</b> property with  <b>height</b> and <b>width</b> is required for the child component sample
</pre>

```js
import Loader from 'react-native-easy-content-loader';
```

```jsx
<Loader
    primaryColor='rgba(195, 191, 191, 1)'
    secondaryColor='rgba(218, 215, 215, 1)'
    animationDuration={500}
    loading={this.state.loading}
 >
    <View
        style={{
                height: 100 // required,
                width: 200 // required,
                borderRadius: 50,
                backgroundColor: 'red'
            }}
        >
         <Text>Test Content</Text>
     </View>
 </Loader>
```
## API
| Props | Default | Required | Type | Note |
|:---|:---:|:---:|:---:|:------|
| `loading` | `false` | `YES` |  `bool` | If true, It will load the loading component with same styles givin to the child.
| `primaryColor` | `'rgba(195, 191, 191, 1)'` | `NO` | `rgba`  | Primary color for the loading component.
| `secondaryColor` | `'rgba(218, 215, 215, 1)'` | `NO` | `rgba`  | Secondary color for the loading component.
| `animationDuration` | `500` | `NO` | `int`  | Animation duration for color switching between `primaryColor` and `secondaryColor`.

## Real World Example

```jsx
const { width, height } = Dimensions.get('screen');
class Test extends React.Component {
    state = {
        loading: true
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);
    }
    render() {
        const { loading } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>

                    <View style={styles.leftContent}>
                        <Loader loading={loading}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1548600518-98810c895859?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80'
                                }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25
                                }}
                            />
                        </Loader>
                        <View>
                            <Loader loading={loading}>
                                <View style={{ height: 20, width: (30 * width) / 100, marginLeft: 15 }}>
                                    <Text>Jane Doe</Text>
                                </View>
                            </Loader>
                            <Loader loading={loading}>
                                <View style={{ height: 20, width: (30 * width) / 100, marginLeft: 15, marginTop: 10 }}>
                                    <Text style={{ color: 'grey' }}>I am Jane Doe.</Text>
                                </View>
                            </Loader>
                        </View>

                    </View>

                    <Loader loading={loading}>
                        <View style={{ height: 20, width: 100, marginRight: 15 }}>
                            <Text>01/02/19</Text>
                        </View>
                    </Loader>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 20
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default Test;


```

## Release History

* 0.0.1
    * Work in progress


## Contributing

Feel free to contribute, this is still in beta and I have plans to include more features in future :)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/react-native-easy-content-loader.svg
[npm-url]: https://www.npmjs.com/search?q=react-native-easy-content-loader
[npm-downloads]: https://img.shields.io/npm/dm/react-native-easy-content-loader.svg?style=flat-square
