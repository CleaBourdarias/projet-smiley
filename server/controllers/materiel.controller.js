const Materiel = require('../models/materiel.model.js')

// Create and Save a new materiel
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    // Create a materiel
    const materiel = new Materiel({
        nom: req.body.nom,
        marque: req.body.marque,
        type: req.body.type,
        lieux: req.body.lieux,
        dateAchat: req.body.dateAchat,
        enMaintenance: req.body.enMaintenance,
        description: req.body.description,
        numSerie: req.body.numSerie,
        prixAchat: req.body.prixAchat,
        dateFinGarantie: req.body.dateFinGarantie,
    })

    // Save materiel in the database
    Materiel.create(materiel, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the materiel.',
            })
        else res.send(data)
    })
}

// Retrieve all materiels from the database.
exports.findAll = (req, res) => {
    Materiel.getAll((err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message:
                    err.message ||
                    'Some error occurred while retrieving materiels.',
            })
        } else {
            console.log(data)
            return res.send(data)
        }
    })
}

// Find a single materiel with a materielId
exports.findOne = (req, res) => {
    Materiel.findById(req.params.materielId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found materiel with id ${req.params.materielId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving materiel with id ' +
                        req.params.materielId,
                })
            }
        } else res.send(data)
    })
}

// Update a materiel identified by the materielId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    Materiel.updateById(
        req.params.materielId,
        (materiel = new Materiel(req.body)),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found materiel with id ${req.params.materielId}.`,
                    })
                    console.log(err)
                } else {
                    res.status(500).send({
                        message:
                            'Error updating materiel with id ' +
                            req.params.materielId,
                    })
                }
            } else res.send(data)
        }
    )
}

// Delete a materiel with the specified materielId in the request
exports.delete = (req, res) => {
    Materiel.remove(req.params.materielId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found materiel with id ${req.params.materielId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete materiel with id ' +
                        req.params.materielId,
                })
            }
        } else res.send({ message: `materiel was deleted successfully!` })
    })
}
