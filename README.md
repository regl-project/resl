get-stuff
=========
`get-stuff` is a simple asset preloader, intended for use with WebGL applications.

# Example

```javascript
require('get-stuff')({
  'scores': {
    type: 'text',
    src: 'data/scores.csv'
  },

  'some-image': {
    type: 'image',
    src: 'images/some-image.png'
  },

  'some-video': {
    type: 'video',
    stream: true,
    src: [
      // ...
    ]
  },

  // ...

}, (err, assets) => {

})
```

# API

### `require('get-stuff')(manifest, next(err, assets))`

* `manifest`
* `next(err, assets)`

#### Manifest options

**`type`**

Supported values:

| Resource type | Interpretation |
|-------|----------------|
| `"text"` | String loaded via XHR |
| `"json"` | JSON blob loaded via XHR |
| `"binary"` | Binary array buffer loaded via XHR |
| `"image"` | |
| `"video"` | |
| `"audio"` | |

**``**

# License
(c) 2016 Mikola Lysenko. MIT License
