const Maintenance = require('../models/maintenance.model.js')

// Create and Save a new maintenance
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    // Create a maintenance
    const maintenance = new Maintenance({
        idMateriel: req.body.idMateriel,
        dateDepart: req.body.dateDepart,
        dateRetour: req.body.dateRetour,
        montantReparation: req.body.montantReparation,
        devis: req.body.devis,
        lieuxMaintenance: req.body.lieuxMaintenance,
        description: req.body.description,
    })

    // Save maintenance in the database
    Maintenance.create(maintenance, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the maintenance.',
            })
        else res.send(data)
    })
}

// Retrieve all maintenances from the database.
exports.findAll = (req, res) => {
    Maintenance.getAll((err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving maintenances.',
            })
        } else {
            console.log(data)
            res.send(data)
        }
    })
}

// Find a single maintenance with a maintenanceId
exports.findOne = (req, res) => {
    Maintenance.findById(req.params.maintenanceId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found maintenance with id ${req.params.maintenanceId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving maintenance with id ' +
                        req.params.maintenanceId,
                })
            }
        } else res.send(data)
    })
}

// Update a maintenance identified by the maintenanceId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    Maintenance.updateById(
        req.params.maintenanceId,
        (materiel = new Maintenance(req.body)),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found maintenance with id ${req.params.maintenanceId}.`,
                    })
                } else {
                    res.status(500).send({
                        message:
                            'Error updating maintenance with id ' +
                            req.params.maintenanceId,
                    })
                }
            } else res.send(data)
        }
    )
}

// Delete a maintenance with the specified maintenanceId in the request
exports.delete = (req, res) => {
    Maintenance.remove(req.params.maintenanceId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found maintenance with id ${req.params.maintenanceId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete maintenance with id ' +
                        req.params.maintenanceId,
                })
            }
        } else res.send({ message: `maintenance was deleted successfully!` })
    })
}
