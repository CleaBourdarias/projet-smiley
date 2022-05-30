const API_URL = 'http://localhost:8000'
//méthode pour lier le serveur nodejs et le front

//méthodes maintenance

export const getMaintenance = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/maintenance`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const ajouterMaintenance = async (nouvelleMaintenance) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let maintenance = nouvelleMaintenance
    console.log(maintenance)

    try {
        return fetch(`${API_URL}/maintenance`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(maintenance),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const supprimerMaintenance = async (id) => {
    console.log(id)
    var myHeaders = new Headers()
    try {
        return fetch(`${API_URL}/maintenance/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const modifierMaintenance = async (Maintenance) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let modifMaintenance = Maintenance
    console.log(modifMaintenance)
    try {
        return fetch(`${API_URL}/maintenance/${modifMaintenance.id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(modifMaintenance),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
//méthodes lieux
export const getLieux = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/lieux`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const ajouterLieux = async (nouveauLieux) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let lieux = nouveauLieux

    try {
        return fetch(`${API_URL}/lieux`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(lieux),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const supprimerLieux = async (id) => {
    console.log(id)
    var myHeaders = new Headers()
    try {
        return fetch(`${API_URL}/lieux/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
//méthodes type
export const getType = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/type`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const ajouterType = async (nouveauType) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let type = nouveauType
    console.log(type)
    try {
        return fetch(`${API_URL}/type`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(type),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const supprimerType = async (id) => {
    var myHeaders = new Headers()
    console.log(id)
    try {
        return fetch(`${API_URL}/type/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
//Méthodes materiel
export const getMateriel = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/materiel`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const ajouterMateriel = async (nouveauMateriel) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let materiel = nouveauMateriel
    console.log(materiel)

    try {
        return fetch(`${API_URL}/materiel`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(materiel),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const modifierMateriel = async (Materiel) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let modifMateriel = Materiel
    console.log(modifMateriel)
    try {
        return fetch(`${API_URL}/materiel/${modifMateriel.id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(modifMateriel),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
export const supprimerMateriel = async (id) => {
    console.log(id)
    var myHeaders = new Headers()
    try {
        return fetch(`${API_URL}/materiel/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
//methode user
export const getUtilisateur = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/utilisateur`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}

export const ajouterUser = async (nouveauUser) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let user = nouveauUser
    console.log(user)

    try {
        return fetch(`${API_URL}/utilisateur`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}

export const connexionUser = async (ConnexionUser) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let user = ConnexionUser
    console.log(user)

    try {
        return fetch(`${API_URL}/auth/connexion`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.user) {
                    sessionStorage.setItem('user', data.user.username)
                }
                window.location.reload()
            })
    } catch (e) {
        return e
    }
}
export const modifUser = async (user) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    console.log(user)
    let modifuser = user
    console.log(modifuser)
    try {
        return fetch(`${API_URL}/utilisateur/${modifuser.username}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(modifuser),
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
//méthode statistic
export const getState = async () => {
    var myheaders = new Headers()
    try {
        return fetch(`${API_URL}/statistique`, {
            method: 'GET',
            headers: myheaders,
        }).then((response) => {
            return response.json()
        })
    } catch (e) {
        return e
    }
}
