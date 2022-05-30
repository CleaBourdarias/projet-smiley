const Lieux = require('../models/lieux.model.js')

// Create and Save a new lieux
exports.create = (req, res) => {
    // Validate request
    if (!req.body || req.body == undefined) {
        return res.status(400).send({
            message: 'Content can not be empty!',
        })
    }
    // Create a lieux
    const lieux = new Lieux({
        secteur: req.body.secteur,
        sousSecteur: req.body.sousSecteur,
    })

    // Save lieux in the database
    Lieux.create(lieux, (err, data) => {
        if (err)
            return res.status(400).json({
                message:
                    err.message ||
                    'Some error occurred while creating the lieux.',
            })
        else return res.status(200).json(data)
    })
}

// Retrieve all lieuxs from the database.
exports.findAll = (req, res) => {
    Lieux.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving lieuxs.',
            })
        else res.send(data)
    })
}

// Find a single lieux with a lieuxId
exports.findOne = (req, res) => {
    Lieux.findById(req.params.lieuxId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found lieux with id ${req.params.lieuxId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving lieux with id ' + req.params.lieuxId,
                })
            }
        } else res.send(data)
    })
}

// Update a lieux identified by the lieuxId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    Lieux.updateById(req.params.lieuxId, new Lieux(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found lieux with id ${req.params.lieuxId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error updating lieux with id ' + req.params.lieuxId,
                })
            }
        } else res.send(data)
    })
}

// Delete a lieux with the specified lieuxId in the request
exports.delete = (req, res) => {
    Lieux.remove(req.params.lieuxId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found lieux with id ${req.params.lieuxId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete lieux with id ' + req.params.lieuxId,
                })
            }
        } else res.send({ message: `lieux was deleted successfully!` })
    })
}
