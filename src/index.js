import zopfli from 'node-zopfli';
import fs from 'fs';

function gzipCompressFile(file, options, minSize) {
    return new Promise(resolve => {
        fs.stat(file, (err, stats) => {
            if(err) {
                console.error('rollup-plugin-gzip: Error reading file ' + file);
                resolve();
                return;
            }

            if(minSize && minSize > stats.size) {
                resolve();
            }
            else {
                fs.createReadStream(file)
                    .pipe(zopfli.createGzip(options))
                    .pipe(fs.createWriteStream(file + '.gz'))
                    .on('close', () => resolve());
            }
        });
    });
}

export default function zopfli(options) {
    options = options || {};

    const gzipOptions = options.options;
    const additionalFiles = options.additional || [];
    const minSize = options.minSize || 0;

    return {
        name: 'zopfli',

        onwrite: function(buildOpts, bundle) {

            // we have to read from the actual written bundle file rather than use bundle.code
            // as it does not contain the source map comment
            const filesToCompress = [ buildOpts.dest ].concat(additionalFiles);

            return Promise.all(filesToCompress.map(
                file => gzipCompressFile(file, gzipOptions, minSize)));
        }
    };
}
