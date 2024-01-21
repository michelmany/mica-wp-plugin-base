let mix = require('laravel-mix');

mix
    .js('assets/js/plugin-editor.js', 'dist')
    .js('assets/js/plugin-front.js', 'dist')
    .setPublicPath('dist');
