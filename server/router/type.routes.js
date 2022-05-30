module.exports = (app) => {
    const type = require('../controllers/type.controller.js')

    // Create a new Type
    app.post('/type', type.create)

    // Retrieve all Types
    app.get('/type', type.findAll)

    // Retrieve a single Type with TypeId
    app.get('/type/:typeId', type.findOne)

    // Update a Type with TypeId
    app.put('/type/:typeId', type.update)

    // Delete a Type with TypeId
    app.delete('/type/:typeId', type.delete)
}
