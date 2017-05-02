const path = require("path")

const output = {
    path: "ant-grid",
}

output.entry = {
    index: [
        path.join(__dirname, 'bower_components', 'jquery/dist/jquery.js'),
        path.join(__dirname, 'examples', output.path, 'index.ts'),
    ],
    'ie8-care': [
        path.join(__dirname, 'bower_components', 'ie-love/dist/ie-love.js')
    ]
}
output.html = {
    index: ['index', 'ie8-care'],
}

module.exports = output