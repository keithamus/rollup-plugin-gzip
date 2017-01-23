# rollup-plugin-zopfli

Creates a compressed `.gz` artifact for your Rollup bundle.

All credit goes to [@kryops](https://github.com/kryops) with https://github.com/kryops/rollup-plugin-gzip. This just changes `zlib` to `zopfli` and adds the additional dependency.


## Installation

```
npm install --save-dev rollup-plugin-zopfli
```


## Usage

```js
import {rollup} from "rollup";
import zopfli from "rollup-plugin-zopfli";

rollup({
    entry: 'src/index.js',
    plugins: [
        zopfli()
    ]
}).then(/* ... */)
```

### Configuration

```js
zopfli({
    options: {
        numiterations: 15
        // ...
    },
    additional: [
        'dist/bundle.css'
    ],
    minSize: 1000
})
```

**options**: Zopfli compression options

The options available are the [standard options for the zopfli module](https://github.com/pierreinglebert/node-zopfli#options).

**additional**: Compress additional files

This option allows you to compress additional files that were created by other Rollup plugins.

As the `onwrite` callback for all plugins is executed in the same order they are listed in the `plugins` array, this might only work if the zopfli plugin is positioned after all other plugins that create additional files.

**minSize**: Minimum size for compression

Specified the minimum size in Bytes for a file to get compressed. Files that are smaller than this threshold will not be compressed. This applies to both the generated bundle and specified additional files.

## License

MIT
