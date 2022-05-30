// Import et initialisation
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Lecture du dossier de build
app.use(favicon(__dirname + '/build/favicon.ico'))
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
// Router de ping pour tester si ça fonctionne
app.get('/ping', function (req, res) {
    return res.send('pong')
})
// Redirection de toutes les autres url sur le build
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port)
