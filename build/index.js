// build/index.js
const fs = require('fs-extra')
const { resolve } = require('path')

// Rename: _nuxt to static
fs.moveSync(resolve(__dirname, '../dist/_nuxt'), resolve(__dirname, '../dist/static'))
