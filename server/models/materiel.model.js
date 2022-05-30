const sql = require('./db.js')

const Materiel = function (materiel) {
    this.nom = materiel.nom
    this.marque = materiel.marque
    this.type = materiel.type
    this.lieux = materiel.lieux
    this.dateAchat = materiel.dateAchat
    this.enMaintenance = materiel.enMaintenance
    this.description = materiel.description
    this.numSerie = materiel.numSerie
    this.prixAchat = materiel.prixAchat
    this.dateFinGarantie = materiel.dateFinGarantie
}
Materiel.create = (newMateriel, result) => {
    sql.query('INSERT INTO materiel SET ?', newMateriel, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created Materiel: ', { id: res.insertId, ...newMateriel })
        result(null, { id: res.insertId, ...newMateriel })
    })
}

Materiel.findById = (materielId, result) => {
    sql.query(`SELECT * FROM materiel WHERE id = ${materielId}`, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('found Materiel: ', res[0])
            result(null, res[0])
            return
        }

        // not found Materiel with the id
        result({ kind: 'not_found' }, null)
    })
}

Materiel.getAll = (result) => {
    sql.query('SELECT * FROM materiel', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('Materiel: ', res)
        result(null, res)
    })
}

Materiel.updateById = (id, materiel, result) => {
    sql.query(
        'UPDATE materiel SET nom=?,marque=?, type=?,lieux=?,dateAchat=?,enMaintenance=?,description=?,numSerie=?, prixAchat=?, dateFinGarantie=? WHERE id = ?',
        [
            materiel.nom,
            materiel.marque,
            materiel.type,
            materiel.lieux,
            materiel.dateAchat,
            materiel.enMaintenance,
            materiel.description,
            materiel.numSerie,
            materiel.prixAchat,
            materiel.dateFinGarantie,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                // not found Materiel with the id
                result({ kind: 'not_found' }, null)
                return
            }

            console.log('updated Materiel: ', { id: id, ...materiel })
            result(null, { id: id, ...materiel })
        }
    )
}
Materiel.remove = (id, result) => {
    sql.query('DELETE FROM materiel WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            // not found Materiel with the id
            result({ kind: 'not_found' }, null)
            return
        }

        console.log('deleted Materiel with id: ', id)
        result(null, res)
    })
}

module.exports = Materiel
