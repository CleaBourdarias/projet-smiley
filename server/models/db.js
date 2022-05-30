const mysql = require('mysql')

// Create a connexion to the database
const connexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'loustal',
    port: '3307',
})

// open the MySQL connexion
connexion.connect((error) => {
    if (error) throw error
    console.log('Successfully connected to the database.')
})

module.exports = connexion
