const path = require('path')

var output = {
  path: 'ant-grid',
  entry: {
    main: [
      path.resolve('bower_components', 'jquery/dist/jquery.js'),
      path.resolve('src', 'ant-grid', 'index.ts'),
    ],
    ie8care: [
      // 使ie8兼容query media
      path.resolve('bower_components', 'respond/index.js'),
      // 使ie8兼容vw,vh,vmin 
      path.resolve('bower_components', 'vminpoly/index.js')
    ]
  },
  html: {
    index: ['main', 'ie8care']
  }
}



module.exports = output