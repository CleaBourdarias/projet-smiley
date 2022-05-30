import React, { useState } from 'react'

//import css
import './Parametres.css'

//import back
import {
    ajouterLieux,
    ajouterType,
    getLieux,
    getType,
    supprimerType,
    supprimerLieux,
    ajouterUser,
    modifUser,
    getUtilisateur,
} from '../../../Service.js'

const Parametres = () => {

    //fonction pour le menu tabs
    const [isActive, setisActive] = useState(true)
    const [isActive2, setisActive2] = useState(false)
    const [isActive3, setisActive3] = useState(false)
    const [isActive4, setisActive4] = useState(false)

    const menuActive = () => {
        setisActive(!isActive)
        setisActive2(false)
        setisActive3(false)
        setisActive4(false)
    }
    const menuActive2 = (e) => {
        setisActive(false)
        setisActive2(!isActive2)
        setisActive3(false)
        setisActive4(false)
    }
    const menuActive3 = (e) => {
        setisActive(false)
        setisActive2(false)
        setisActive3(!isActive3)
        setisActive4(false)
    }
    const menuActive4 = (e) => {
        setisActive(false)
        setisActive2(false)
        setisActive3(false)
        setisActive4(!isActive4)
    }

    //fonction ajout lieux
    const [nouveauLieux, setNouveauLieux] = useState([])
    const handleFormLieux = (e) => {
        setNouveauLieux({
            ...nouveauLieux,
            [e.target.id]: e.target.value,
        })
    }
    const ajoutLieux = () => {
        ajouterLieux(nouveauLieux)
        setNouveauLieux()
        setisActive2(!isActive2)
        window.location.reload()

    }
    //fonction suppression lieux

    const [lieux, setLieux] = useState([])
    let fetchLieux = () => {
        getLieux().then((response) => {
            setLieux(response)
        })
    }
    if (lieux.length === 0) {
        fetchLieux()
    }
    const [suppridLieux, setsupprridLieux] = useState()
    const handlesupprLieux = (e) => {
        console.log(e.target.value)
        setsupprridLieux(e.target.value)
    }
    const supprimeLieux = () => {
        supprimerLieux(suppridLieux)
        setsupprridLieux()
        setisActive2(!isActive2)
        window.location.reload()
    }

    //fonction ajout catégorie
    const [nouveautype, setNouveautype] = useState({})
    const handleFormType = (e) => {
        setNouveautype({
            [e.target.id]: e.target.value,
        })
    }
    const ajoutType = () => {
        ajouterType(nouveautype)
        setNouveautype({})
        window.location.reload()
    }
    //fonction suppression type

    const [type, settype] = useState([])
    let fetchtype = () => {
        getType().then((response) => {
            settype(response)
        })
    }
    if (type.length === 0) {
        fetchtype()
    }
    const [suppridtype, setsupprridtype] = useState()
    const handlesupprtype = (e) => {
        setsupprridtype(e.target.value)
    }
    const supprimetype = () => {
        supprimerType(suppridtype)
        setsupprridtype()
        window.location.reload()
    }
    //ajout utilisateur
    const [newUser, setNewUser] = useState({})
    const [listUser, setlistUser] = useState([])
    let fetchUtilisateurs = () => {
        getUtilisateur().then((response) => {
            setlistUser(response)
        })
    }
    if (listUser.length === 0) {
        fetchUtilisateurs()
    }
    //console.log(listeUser)
    const newUtilisateur = (e) => {
        setNewUser({ ...newUser, [e.target.id]: e.target.value })
    }
    
    const listUsername = listUser.map((item) => {return(item.username)})
    //console.log(listUsername)
   
    const ajoutUser = () => {
        console.log(newUser.username)
        //console.log(listUser.map((item) => {return(item.username)}))
        console.log(listUsername[0])

        for (var i= 0; i < listUsername.length; i++){
            console.log('coucou')
            if (newUser.username === listUsername[i]){
                window.alert("Cet utilisateur existe déjà. Veuillez choisir un autre identifiant.")
            }else{
                ajouterUser(newUser)
                window.location.reload()
            }
        }
    }
    //recupération utilisateur
    const utilisateur = window.sessionStorage.getItem('user')

    //modification utilisateur
    const [readOnly, setreadOnly] = useState(true)
    const modifPossible = () => {
        setreadOnly(!readOnly)
    }
    const [userModifie, setUserModifie] = useState({
        username: utilisateur,
        password: '',
        password1: '',
    })
    const changementMDP = (e) => {
        setUserModifie({ ...userModifie, [e.target.id]: e.target.value })
    }
  
    const verificationMdp = () => {
        if (userModifie.password == userModifie.password1) {
            console.log('coucou')
            console.log(userModifie)

            console.log(({
                username: userModifie.username,
                password: userModifie.password,
            }))
            if(userModifie.password!=''){
                modifUser(({
                    username: userModifie.username,
                    password: userModifie.password,
                }))
                window.location.reload()
            }else{
                window.alert("Le mot de passe ne peut pas être vide !")
            }
        } else {
            window.alert("La confirmation du mot de passe n'est pas correcte !")
        }
    }

    const annulation = () => {
        setreadOnly(!readOnly)
        setUserModifie({ username: utilisateur, password: '', password1: '' })
        window.location.reload()
    }
    return (
        <div className="container">
            <h1>Parametres</h1>
            <div className="tabs is-large is-centered is-boxed is-fullwidth">
                <ul>
                    <li
                        className={`${isActive ? 'is-active' : ''}`}
                        onClick={menuActive}
                    >
                        <a id="1">Profil</a>
                    </li>
                    <li
                        className={`${isActive2 ? 'is-active' : ''}`}
                        onClick={menuActive2}
                    >
                        <a id="2">Secteur</a>
                    </li>
                    <li
                        className={`${isActive3 ? 'is-active' : ''}`}
                        onClick={menuActive3}
                    >
                        <a id="3">Catégorie</a>
                    </li>
                    <li
                        className={`${isActive4 ? 'is-active' : ''}`}
                        onClick={menuActive4}
                    >
                        <a id="4">Ajouter un utilisateur</a>
                    </li>
                </ul>
            </div>
            {isActive ? (
                <div>
                    <label className="label">Identifiant</label>
                    <input
                        type="text"
                        disabled
                        className="input"
                        value={userModifie.username}
                        readOnly={readOnly}
                        onChange={changementMDP}
                        id="username"
                    />
                    <label className="label">Nouveau mot de passe</label>
                    <input
                        type="password"
                        className="input"
                        //readOnly={readOnly}
                        id="password"
                        value={userModifie.password}
                        onChange={changementMDP}
                    />
                    <label className="label">
                        Vérification nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        className="input"
                        id="password1"
                        value={userModifie.password1}
                        //readOnly={readOnly}
                        onChange={changementMDP}
                    />
                    {readOnly ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                className="button is-success boutonAjout"
                                type="submit"
                                onClick={modifPossible}
                            >
                                Modification
                            </button>
                        </div>
                    ) : (
                        <div className="divBoutonUtilisateur">
                            <button
                                className="button is-warning boutonAjout"
                                type="submit"
                                onClick={annulation}
                            >
                                Annuler
                            </button>
                            <button
                                className="button is-success boutonAjout"
                                type="submit"
                                onClick={verificationMdp}
                            >
                                Modifier
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                ''
            )}
            {isActive2 ? (
                <div>
                    <h3>Ajouter un secteur</h3>
                    <div style={{ marginTop: '30px' }}>
                        <label className="label">Secteur</label>
                        <input
                            type="text"
                            className="input"
                            id="secteur"
                            onChange={handleFormLieux}
                        />
                        <label className="label">Sous secteur</label>
                        <input
                            type="text"
                            className="input"
                            id="sousSecteur"
                            onChange={handleFormLieux}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                className="button is-success boutonAjout"
                                type="submit"
                                onClick={ajoutLieux}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <h3>Supprimer un secteur</h3>
                    <div style={{ marginTop: '30px' }}>
                        <label className="label">Secteur</label>
                        <select
                            className="select selectnewmateriel"
                            id="lieux"
                            onChange={handlesupprLieux}
                        >
                            <option value="">Secteur</option>
                            {lieux.map((item) => {
                                return (
                                    <option value={item.id}>
                                        {item.secteur} - {item.sousSecteur}
                                    </option>
                                )
                            })}
                        </select>
                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="button is-warning boutonAjout"
                                type="submit"
                                style={{ marginBottom: '20px ' }}
                                onClick={supprimeLieux}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {isActive3 ? (
                <div>
                    <h3>Ajouter une catégorie</h3>
                    <div style={{ marginTop: '30px' }}>
                        <label className="label">Catégorie</label>
                        <input
                            type="text"
                            className="input"
                            id="categorie"
                            onChange={handleFormType}
                        />

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                className="button is-success boutonAjout"
                                type="submit"
                                onClick={ajoutType}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <h3>Supprimer une catégorie</h3>
                    <div style={{ marginTop: '30px' }}>
                        <label className="label">catégorie</label>
                        <select
                            className="select selectnewmateriel"
                            id="type"
                            onChange={handlesupprtype}
                        >
                            <option value="">Catégorie</option>
                            {type.map((item) => {
                                return (
                                    <option value={item.id}>
                                        {item.categorie}
                                    </option>
                                )
                            })}
                        </select>
                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="button is-warning boutonAjout"
                                type="submit"
                                style={{ marginBottom: '20px ' }}
                                onClick={supprimetype}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {isActive4 ? (
                <div>
                    <label className="label">Identifiant</label>
                    <input
                        type="text"
                        className="input"
                        id="username"
                        onChange={newUtilisateur}
                    />
                    <label className="label">Mot de passe</label>
                    <input type="password" className="input" />
                    <label className="label">Vérification mot de passe</label>
                    <input
                        type="password"
                        className="input"
                        id="password"
                        onChange={newUtilisateur}
                    />
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            className="button is-success boutonAjout"
                            onClick={ajoutUser}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}{' '}
        </div>
    )
}

export default Parametres
