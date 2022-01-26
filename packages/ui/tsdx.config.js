// See: https://tsdx.io/customization#example-adding-postcss
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                ],
                inject: {
                    insertAt: 'top'
                },
                extract: false,
            })
        );
        return config;
    },
};