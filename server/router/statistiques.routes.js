const dayjs = require('dayjs')

module.exports = (app) => {
    const Materiel = require('../models/Materiel.model.js')
    const Maintenance = require('../models/Maintenance.model.js')

    app.get('/statistique', (req, res) => {
        try {
            // Init variables
            let cout_achat_materiel = []
            let cout_maintenance_materiel = []
            let details_maintenance_materiel = []
            let year = dayjs().year() - 2000

            Materiel.getAll((err, data) => {
                const materiels = data

                Maintenance.getAll((err, data) => {
                    const maintenances = data
                    // Boucle pour chaque années à partir de 2000 jusqu'à aujourd'hui
                    for (let i = 0; i < year + 1; i++) {
                        let cout_year_achat = 0
                        let cout_year_maintenance = 0

                        materiels.forEach((materiel) => {
                            // Verif année materiel
                            if (
                                materiel.dateAchat
                                    .toString()
                                    .indexOf(`20${i < 10 ? `0${i}` : i}`) != -1
                            ) {
                                cout_year_achat += materiel.prixAchat
                            }

                            maintenances.forEach((maintenance) => {
                                // Verif année maintenance
                                if (
                                    maintenance.dateDepart
                                        .toString()
                                        .indexOf(`20${i < 10 ? `0${i}` : i}`) !=
                                    -1
                                ) {
                                    cout_year_maintenance +=
                                        maintenance.montantReparation
                                }
                            })
                        })
                        cout_maintenance_materiel.push({
                            [`20${i < 10 ? `0${i}` : i}`]:
                                cout_year_maintenance,
                        })
                        cout_achat_materiel.push({
                            [`20${i < 10 ? `0${i}` : i}`]: cout_year_achat,
                        })
                    }

                    let indexes = []
                    materiels.forEach((materiel) => {
                        details_maintenance_materiel.push({
                            id: materiel.id,
                            categorie: materiel.type,
                            nom: materiel.nom,
                            cout: 0,
                            pannes: 0,
                        })
                        indexes.push(materiel.id)
                    })
                    maintenances.forEach((maintenance) => {
                        details_maintenance_materiel[
                            indexes.indexOf(maintenance.idMateriel)
                        ].cout += maintenance.montantReparation
                        details_maintenance_materiel[
                            indexes.indexOf(maintenance.idMateriel)
                        ].pannes += 1
                    })

                    return res.send({
                        cout_achat_materiel,
                        cout_maintenance_materiel,
                        details_maintenance_materiel,
                    })
                })
            })
        } catch (e) {
            console.log(e)
            return res.send({ message: `Erreur serveur : ${e}` })
        }
    })
}
