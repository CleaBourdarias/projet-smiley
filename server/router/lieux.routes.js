module.exports = (app) => {
    const lieux = require('../controllers/lieux.controller.js')

    // Create a new lieux
    app.post('/lieux', lieux.create)

    // Retrieve all lieux
    app.get('/lieux', lieux.findAll)

    // Retrieve a single lieux with lieuxId
    app.get('/lieux/:lieuxId', lieux.findOne)

    // Update a lieux with lieuxId
    app.put('/lieux/:lieuxId', lieux.update)

    // Delete a lieux with lieuxId
    app.delete('/lieux/:lieuxId', lieux.delete)
}
