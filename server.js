const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.dev')
const handler = require('./server/handler')
const compiler = webpack(webpackConfig)
const app = express()
const hostname = 'localhost'
const port = 8080

app.use(express.static('dist')) // 将dist设为根目录
app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))

app.listen(port, hostname, () => {
    console.log(`正在监听${hostname}:${port}\n\n`)
})

app.use('/fetchArticleData', (req, res) => {
    handler.test(req, res)
})