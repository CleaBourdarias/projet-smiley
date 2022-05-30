const sql = require('./db.js')

const Utilisateur = function (utilisateur) {
    this.username = utilisateur.username
    this.password = utilisateur.password
}

Utilisateur.create = (newUtilisateur, result) => {
    sql.query('INSERT INTO utilisateur SET ?', newUtilisateur, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created Utilisateur: ', {
            id: res.insertId,
            ...newUtilisateur,
        })
        result(null, { id: res.insertId, ...newUtilisateur })
    })
}

Utilisateur.findById = (utilisateurId, result) => {
    sql.query(
        `SELECT * FROM utilisateur WHERE username = ${utilisateurId}`,
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }

            if (res.length) {
                console.log('found Utilisateur: ', res[0])
                result(null, res[0])
                return
            }

            // not found Utilisateur with the id
            result({ kind: 'not_found' }, null)
        }
    )
}

Utilisateur.getAll = (result) => {
    sql.query('SELECT * FROM utilisateur', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('Utilisateurs: ', res)
        result(null, res)
    })
}

Utilisateur.updateById = (id, utilisateur, result) => {
    sql.query(
        'UPDATE utilisateur SET username = ?, password = ?  WHERE username = ?',
        [utilisateur.username, utilisateur.password, utilisateur.username],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                // not found Utilisateur with the id
                result({ kind: 'not_found' }, null)
                return
            }

            console.log('updated Utilisateur: ', {
                username: id,
                ...utilisateur,
            })
            result(null, { username: id, ...utilisateur })
        }
    )
}

Utilisateur.remove = (id, result) => {
    sql.query('DELETE FROM utilisateur WHERE username = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            // not found Utilisateur with the id
            result({ kind: 'not_found' }, null)
            return
        }

        console.log('deleted Utilisateur with id: ', id)
        result(null, res)
    })
}

module.exports = Utilisateur
