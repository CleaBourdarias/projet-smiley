const express = require('express')
const morgan = require('morgan') //afficher requête dans le terminale
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(morgan('combined'))
//cors origin
var whitelist = [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
]
var corsOptionsDelegate = function (req, callback) {
    var corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))

require('./router/lieux.routes.js')(app)
require('./router/maintenance.routes')(app)
require('./router/materiel.routes')(app)
require('./router/type.routes')(app)
require('./router/utilisateur.routes')(app)
require('./router/statistiques.routes')(app)

const port = process.env.PORT || 8000
app.listen(port, () => console.log('Server app listening on port ' + port))
