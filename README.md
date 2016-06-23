resl
====
`resl` (RESource Loader) is a tiny streaming asset loader intended for use with WebGL applications.

# Example

```javascript
// Here we call resl and tell it to start preloading resources
require('resl')({
  // A call to resl takes a JSON object as configuration.

  // The configuration object must contain a manifest field which specifies
  // a list of all resources to load and their types.
  manifest: {
    // Each entry in the manifest represents an asset to be loaded
    'scores': {
      type: 'text',           // the type declares the type of the asset
      src: 'data/scores.csv'  // and src declares the URL of the asset
    },

    // You can also specify HTML elements as assets
    'an_image': {
      type: 'image',
      src: 'images/some-image.png'
    },

    // Assets can also be streamed as well
    'some_video': {
      type: 'video',
      stream: true,   // setting the streaming flag specifies that
                      // the done() callback will fire as soon as the
                      // asset has started loading
      src: 'videos/some-video.mp4'
    },

    // You can also specify custom parsers for your assets
    'json_data': {
      type: 'text',
      src: 'mydata.json',
      parser: JSON.parse  // Here we call JSON.parse as soon as the asset has
                          // finished loading
    }
  },

  // Once the assets are done loading, then we can use them within our
  // application
  onDone: (assets) => {
    console.log(assets.scores)

    document.body.appendChild(assets.some_video)
    document.body.appendChild(assets.an_image)

    console.log(assets.json_data)
  },

  // As assets are preloaded the progress callback gets fired
  onProgress: (progress, message) => {
    document.body.innerHTML =
      '<b>' + (progress * 100) + '% loaded</b>: ' + message
  },

  onError: (err) => {
    console.error(err)
  }
})
```

# Install
The easiest way to install `resl` is to use npm:

```
npm install resl
```

# API

### `require('resl')(config)`
`resl` takes a single configuration object as input.  At minimum this object must specify a callback which is executed once asset loading is finished and a manifest of assets which must be loaded.  The `config` object accepts the following properties:

| Config parameter | Interpretation |
|------------------|----------------|
| `manifest` | (Required) An object listing each resource to be loaded. [For more details see below](#manifest-entries) |
| `onDone(assets)` | (Required) A callback which is executed once all assets have loaded.  This is passed a dictionary of all assets. |
| `onProgress(progress, message)` | A callback which is executed each time more assets are loaded.  Gets passed two arguments: progress so far as a fraction of the total bundle and a message related to the most recent progress event. |
| `onError(error)` | A callback which is executed if any errors are encountered during preloading.  Gets passed the last error which occurred. |

#### Manifest Entries
Each entry in the manifest is an object specifying the location (URL) of an asset, its type and some optional data related to parsing the asset.  User defined [parsers](#parser-interface) can be added to assets to help streamline loading resources.  

| Manifest parameter | Interpretation | Default |
|--------------------|----------------|---------|
| `src` | (Required) The URL of the asset | N/A |
| `type` | The [type of the asset](#resource-types). | `'text'` |
| `parser` | An optional [parser](#parser-interface) (see below) | `null` |
| `stream` | If set to true, then the resource is streamed. | `false` |
| `credentials` | If set to true, then pass credentials to cross origin requests | `false` |

#### Resource types
The following resource types are currently supported by `resl`:

| Resource type | Interpretation |
|---------------|----------------|
| `'text'` | A UTF string loaded via XHR |
| `'binary'` | Binary array buffer loaded via XHR |
| `'image'` | An [HTML image element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) |
| `'video'` | An [HTML video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) |
| `'audio'` | [An HTML audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) |

#### Parser interface
A manifest entry may take an optional parser object as input which transforms the base asset into some other data type.  There are two ways to specify a parser in `resl`:

1. As a function `parser(data)` which takes as input the data and returns the encoded object.
1. As an object which implements the following interface:

| Callback | Effect |
|----------|--------|
| `onData(data)` | (Required) A callback which is fired each time new data is available in the stream |
| `onDone()` | A callback which is fired once the stream is finished loading |

# License
(c) 2016 Mikola Lysenko. MIT License
