const bcrypt = require('bcrypt')

module.exports = (app) => {
    const utilisateur = require('../controllers/utilisateur.controller.js')
    // Create a new utilisateur
    app.post('/utilisateur', utilisateur.create)

    // Retrieve all utilisateur
    app.get('/utilisateur', utilisateur.findAll)

    // Retrieve a single utilisateur with utilisateurId
    app.get('/utilisateur/:utilisateurId', utilisateur.findOne)

    // Update a utilisateur with utilisateurId
    app.put('/utilisateur/:utilisateurId', utilisateur.update)

    // Delete a utilisateur with utilisateurId
    app.delete('/utilisateur/:utilisateurId', utilisateur.delete)

    // Connexion d'un utilisateur
    app.post('/auth/connexion', async (req, res) => {
        try {
            const Utilisateur = require('../models/utilisateur.model.js')
            const { identifiant, password } = req.body

            Utilisateur.getAll((err, data) => {
                data.forEach(async (user) => {
                    if (user.username == identifiant) {
                        console.log("bon identifiant")
                        const isMatch = await bcrypt.compare(
                            password,
                            user.password
                        )
                        //if (user.password == password){
                        //    const isMatch = true
                        //}else{
                        //    console.log("no Match")
                        //}

                        if (!isMatch) {
                            console.log('No match')
                            return res.send({
                                message: "Le mot de passe n'est pas bon",
                            })
                        }

                        return res.send({ user })
                    }
                })
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send(
                send({
                    message:
                        e.message ||
                        'Some error occurred while creating the utilisateur.',
                })
            )
        }
    })
}
