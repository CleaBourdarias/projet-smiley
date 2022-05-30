const sql = require('./db.js')

const Maintenance = function (maintenance) {
    this.idMateriel = maintenance.idMateriel
    this.dateDepart = maintenance.dateDepart
    this.dateRetour = maintenance.dateRetour
    this.montantReparation = maintenance.montantReparation
    this.devis = maintenance.devis
    this.description = maintenance.description
    this.lieuxMaintenance = maintenance.lieuxMaintenance
}
Maintenance.create = (newMaintenance, result) => {
    sql.query('INSERT INTO maintenance SET ?', newMaintenance, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created Maintenance: ', {
            id: res.insertId,
            ...newMaintenance,
        })
        result(null, { id: res.insertId, ...newMaintenance })
    })
}

Maintenance.findById = (maintenanceId, result) => {
    sql.query(
        `SELECT * FROM maintenance WHERE id = ${maintenanceId}`,
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }

            if (res.length) {
                console.log('found Maintenance: ', res[0])
                result(null, res[0])
                return
            }

            // not found Maintenance with the id
            result({ kind: 'not_found' }, null)
        }
    )
}
Maintenance.getAll = (result) => {
    sql.query('SELECT * FROM maintenance', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('Maintenance: ', res)
        result(null, res)
    })
}
Maintenance.updateById = (id, maintenance, result) => {
    sql.query(
        'UPDATE maintenance SET idMateriel=?,dateDepart=?, dateRetour=?,montantReparation=?,devis=?,lieuxMaintenance=?,description=? WHERE id = ?',
        [
            maintenance.idMateriel,
            maintenance.dateDepart,
            maintenance.dateRetour,
            maintenance.montantReparation,
            maintenance.devis,
            maintenance.lieuxMaintenance,
            maintenance.description,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                // not found Maintenance with the id
                result({ kind: 'not_found' }, null)
                return
            }

            console.log('updated Maintenance: ', { id: id, ...maintenance })
            result(null, { id: id, ...maintenance })
        }
    )
}
Maintenance.remove = (id, result) => {
    sql.query('DELETE FROM maintenance WHERE id = ?', id, (err, res) => {
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

module.exports = Maintenance
