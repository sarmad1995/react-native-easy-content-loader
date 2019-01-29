
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

A light weight content loader for react native.

![](header.png)

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



## Release History

* 0.0.1
    * Work in progress


## Contributing

Feel free to contribute, this is still in beta and I have plans to include more features in future :)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/react-native-easy-content-loader.svg
[npm-url]: https://www.npmjs.com/search?q=react-native-easy-content-loader
[npm-downloads]: https://img.shields.io/npm/dm/react-native-easy-content-loader.svg?style=flat-square
