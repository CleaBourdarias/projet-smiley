const sql = require('./db.js')

const Lieux = function (lieux) {
    this.secteur = lieux.secteur
    this.sousSecteur = lieux.sousSecteur
}

Lieux.create = (newLieux, result) => {
    console.log(newLieux)
    sql.query('INSERT INTO lieux SET ?', newLieux, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created Lieux: ', { id: res.insertId, ...newLieux })
        result(null, { id: res.insertId, ...newLieux })
    })
}

Lieux.findById = (lieuxId, result) => {
    sql.query(`SELECT * FROM lieux WHERE id = ${lieuxId}`, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('found Lieux: ', res[0])
            result(null, res[0])
            return
        }

        // not found Lieux with the id
        result({ kind: 'not_found' }, null)
    })
}

Lieux.getAll = (result) => {
    sql.query('SELECT * FROM lieux', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('Lieuxs: ', res)
        result(null, res)
    })
}

Lieux.updateById = (id, lieux, result) => {
    sql.query(
        `UPDATE lieux SET secteur="${lieux.secteur}", sousSecteur="${lieux.sousSecteur}" WHERE id=${id}`,

        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                // not found Lieux with the id
                result({ kind: 'not_found' }, null)
                return
            }

            console.log('updated Lieux: ', { id: id, ...lieux })
            result(null, { id: id, ...lieux })
        }
    )
}

Lieux.remove = (id, result) => {
    sql.query('DELETE FROM lieux WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            // not found Lieux with the id
            result({ kind: 'not_found' }, null)
            return
        }

        console.log('deleted Lieux with id: ', id)
        result(null, res)
    })
}

module.exports = Lieux
