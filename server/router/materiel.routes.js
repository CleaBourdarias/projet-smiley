module.exports = (app) => {
    const materiel = require('../controllers/materiel.controller.js')

    // Create a new materiel
    app.post('/materiel', materiel.create)

    // Retrieve all materiel
    app.get('/materiel', materiel.findAll)

    // Retrieve a single materiel with materielId
    app.get('/materiel/:materielId', materiel.findOne)

    // Update a materiel with materielId
    app.put('/materiel/:materielId', materiel.update)

    // Delete a materiel with materielId
    app.delete('/materiel/:materielId', materiel.delete)
}
