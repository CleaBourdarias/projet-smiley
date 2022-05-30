const Utilisateur = require('../models/utilisateur.model.js')
const bcrypt = require('bcrypt')
const hasher = 10

// Create and Save a new utilisateur
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    // Hashage mot de passe
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    // Create a utilisateur
    const utilisateur = new Utilisateur({
        username: req.body.username,
        password: password,
    })

    // Save utilisateur in the database
    Utilisateur.create(utilisateur, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the utilisateur.',
            })
        else res.send(data)
    })
}

// Retrieve all utilisateurs from the database.
exports.findAll = (req, res) => {
    Utilisateur.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving utilisateurs.',
            })
        else res.send(data)
    })
}

// Find a single utilisateur with a utilisateurId
exports.findOne = (req, res) => {
    Utilisateur.findById(req.params.utilisateurId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found utilisateur with id ${req.params.utilisateurId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving utilisateur with id ' +
                        req.params.utilisateurId,
                })
            }
        } else res.send(data)
    })
}

// Update a utilisateur identified by the utilisateurId in the request
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    // Create utilisateur
    const utilisateur = new Utilisateur({
        username: req.body.username,
        password: password,
    })

    Utilisateur.updateById(
        req.params.utilisateurId,
        utilisateur,
        (err, data) => {
            if (err) {
                console.log(err)
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found utilisateur with id ${req.params.utilisateurId}.`,
                    })
                } else {
                    res.status(500).send({
                        message:
                            'Error updating utilisateur with id ' +
                            req.params.utilisateurId,
                    })
                }
            } else res.send(data)
        }
    )
}

// Delete a utilisateur with the specified utilisateurId in the request
exports.delete = (req, res) => {
    Utilisateur.remove(req.params.utilisateurId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found utilisateur with id ${req.params.utilisateurId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete utilisateur with id ' +
                        req.params.utilisateurId,
                })
            }
        } else res.send({ message: `utilisateur was deleted successfully!` })
    })
}
