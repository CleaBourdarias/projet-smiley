const sql = require('./db.js')

const Type = function (type) {
    this.categorie = type.categorie
}

Type.create = (newType, result) => {
    sql.query('INSERT INTO type SET ?', newType, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created Type: ', { id: res.insertId, ...newType })
        result(null, { id: res.insertId, ...newType })
    })
}

Type.findById = (typeId, result) => {
    sql.query(`SELECT * FROM type WHERE id = ${typeId}`, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('found Type: ', res[0])
            result(null, res[0])
            return
        }

        // not found Type with the id
        result({ kind: 'not_found' }, null)
    })
}

Type.getAll = (result) => {
    sql.query('SELECT * FROM type', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('Types: ', res)
        result(null, res)
    })
}

Type.updateById = (id, type, result) => {
    sql.query(
        'UPDATE type SET categorie = ?  WHERE id = ?',
        [type.categorie, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                // not found Type with the id
                result({ kind: 'not_found' }, null)
                return
            }

            console.log('updated Type: ', { id: id, ...type })
            result(null, { id: id, ...type })
        }
    )
}

Type.remove = (id, result) => {
    sql.query('DELETE FROM type WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            // not found Type with the id
            result({ kind: 'not_found' }, null)
            return
        }

        console.log('deleted Type with id: ', id)
        result(null, res)
    })
}

module.exports = Type
