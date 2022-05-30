module.exports = (app) => {
    const maintenance = require('../controllers/maintenance.controller.js')

    // Create a new maintenance
    app.post('/maintenance', maintenance.create)

    // Retrieve all maintenance
    app.get('/maintenance', maintenance.findAll)

    // Retrieve a single maintenance with maintenanceId
    app.get('/maintenance/:maintenanceId', maintenance.findOne)

    // Update a maintenance with maintenanceId
    app.put('/maintenance/:maintenanceId', maintenance.update)

    // Delete a maintenance with maintenanceId
    app.delete('/maintenance/:maintenanceId', maintenance.delete)
}
