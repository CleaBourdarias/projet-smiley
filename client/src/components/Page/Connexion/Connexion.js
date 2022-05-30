import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

//import image
import maintenance from '../../../image/maintenance-web.svg'
//import css
import './Connexion.css'

//import connexion
import { connexionUser } from '../../../Service.js'

const Connexion = () => {
    const [utilisateur, setUtilisateur] = useState({})
    const stockageUtilisateur = (e) => {
        setUtilisateur({ ...utilisateur, [e.target.id]: e.target.value })
    }
    const checkUtilisateur = () => {
        connexionUser(utilisateur)
    }

    if (sessionStorage.getItem('user') != null) {
        return <Redirect to="/materiels" />
    }
    return (
        <div className="container" style={{ margin: '0 auto' }}>
            <div className="containerFit">
                <div className="column is-centered zoneMilieu">
                    <img
                        src={maintenance}
                        alt="maintenance"
                        width="200px"
                        className="logoMaintenance"
                    />
                </div>
                <div className="column is-centered zoneMilieu">
                    <h1>Connexion</h1>
                </div>
                <div className="columns is-centered">
                    <form className="column is-half">
                        <input
                            className="input is-hovered is-medium"
                            type="text"
                            id="identifiant"
                            placeholder="Identifiant"
                            required
                            onChange={stockageUtilisateur}
                        />
                        <input
                            className="input is-hovered is-medium"
                            type="password"
                            id="password"
                            placeholder="Mot de passe"
                            required
                            onChange={stockageUtilisateur}
                        />
                    </form>
                </div>
                <div className="column is-centered zoneMilieu">
                    <button
                        className={'button buttonConnexion  is-rounded'}
                        onClick={checkUtilisateur}
                    >
                        Connexion
                    </button>
                </div>
                <div />
            </div>
        </div>
    )
}

export default Connexion
