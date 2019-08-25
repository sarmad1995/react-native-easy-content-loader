[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

<p align="center">
  <img width="400" alt="Example's react-native-easycontent-loader" src="https://user-images.githubusercontent.com/38377482/63653305-932a1880-c788-11e9-8f74-aeb758e11336.gif" />
</p>


Provide a placeholder at the place which need waiting for loading,
Easy to implement and fun to use

## Features

- :gear: **Customizable:** Feel free to change the colors, speed, sizes, paragraphs, title and much more.;
- ⚛️ **Lightweight:** Lightweight with only neccessory code.;


## Index

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)

## Getting Started

```sh
npm install react-native-easy-content-loader --save
yarn add react-native-easy-content-loader
```

## Usage

```jsx
import ContentLoader, { Facebook, Instagram, Bullets } from 'react-native-easy-content-loader';
```
```jsx
<ContentLoader active />
```
## Options
## These Options are common with every component, 

#### **`primaryColor?: string, rgba/hex`**
Defaults to `rgba(220, 220, 220, 1)`.

#### **`secondaryColor? string, rgba/hex`**
Defaults to `rgba(200, 200, 200, 1)`.

#### **`animationDuration? number`**
Defaults to `500`. The animation transition time from primaryColor to secondaryColor

#### **`loading?: bool | null`**
Defaults to `null`, If given a bool value, when false, it will return children (Works as a wrapper component)

#### **`active? bool`**
Defaults to `false`, `true` if you want to animate the compoennt.

#### **`title? bool`**
Defaults to `true`. If you want to show the title, **Works only with ContentLoader**.

#### **`titleStyles? object`**
Add styles to title.

#### **`listSize? number`**
Defaults to `1`. If you want to render a list of loaders, **Works with all the loaders**.

#### **`avatar? bool`**
Defaults to `false`. If you want to render the avatar.

#### **`aShape? string 'circle' | 'square'`**
Defaults to `circle`. shape of the avatar, can be circle or square.

#### **`aSize? string 'default' 'small' 'large' | number `** 
Defaults to `default`. can be a specific number.

#### **`reverse? bool`** 
Defaults to `false`. if you want to reverse the view.

#### **`containerStyles? object`** 
If you want to add style to container.


## Title specific options.

#### **`tHeight? string | number`** 
Used to change the title height.

#### **`tWidth? stirng | number`** 
Used to change the title width.

#### **`sTHeight? string | number`**
Used to change the secondary title height  **Works with only Facebook and Instagram**.

#### **`sTWidth? string | number`**
Used to change the secondary title width  **Works with only Facebook and Instagram**.

#### **`titleStyles? object`**
Add styles to title.

#### **`secondaryTitleStyles? object`**
Add styles to secondaryTitle.  **Works with only Facebook and Instagram**.

## Paragraph specific options.

#### **`pHeight? string | number`** 
Paragraph line height

#### **`pWidth? string | number | array `** 
Can specify same width with single value, Or could use array for different widths, eg ['100%', 200, 300]

#### **`paragraphStyles? objecct`** 
Add paragraph styles


## Instagram specific options.

#### **`imageHeight? number`** 
Change the height of the image

#### **`imageStyles? number`** 
Add styles to image 


## Examples


### Simple Example

```jsx
<ContentLoader active />
```

### With Avatar

```jsx
<ContentLoader active avatar />
```

### With Loading State

```jsx
<ContentLoader active avatar loading={this.state.loading}>
  <Text>This would be rendered with loading is false</Text>
</ContentLoader>
```

### Number of paragraphs

```jsx
<ContentLoader active avatar pRows={4} />
```

### Different Widths for differnt paragrahs lines

```jsx
<ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
```

### Facebook Style
```jsx
import { Facebook } from 'react-native-easy-content-loader';

<Facebook active />
```

![Facebook Style](https://user-images.githubusercontent.com/38377482/63653305-932a1880-c788-11e9-8f74-aeb758e11336.gif)



### Instagram Style
```jsx
import { Instagram } from 'react-native-easy-content-loader';

<Instagram active />
```

![Instagram Style](https://user-images.githubusercontent.com/38377482/63653295-7a216780-c788-11e9-9f02-88e5f71cd5cd.gif)



### Bullets Style
```jsx
import { Bullets } from 'react-native-easy-content-loader';

<Bullets active listSize={10} />
```

![Bullets Style](https://user-images.githubusercontent.com/38377482/63653257-054e2d80-c788-11e9-8b15-eb8e1c39885e.gif)


### Default Style

## It is highly customizable, please refer the options sections.
```jsx
import ContentLoader from 'react-native-easy-content-loader';

<ContentLoader active listSize={10} />
```

![ContentLoader Style](https://user-images.githubusercontent.com/38377482/63653286-5d852f80-c788-11e9-8093-2f428e7e3daf.gif)

![ContentLoader Style](https://user-images.githubusercontent.com/38377482/63653283-434b5180-c788-11e9-84ee-f275a71334bc.gif)

                           |

## Release History
See <a href="https://github.com/sarmad1995/react-native-easy-content-loader/blob/feature/version2/CHANGE_LOG.md"> CHANGE_LOG.md</a>.     




## Contributing

Feel free to contribute, this is still in beta and I have plans to include more features in future :)

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/react-native-easy-content-loader.svg
[npm-url]: https://www.npmjs.com/search?q=react-native-easy-content-loader
[npm-downloads]: https://img.shields.io/npm/dm/react-native-easy-content-loader.svg?style=flat-square
