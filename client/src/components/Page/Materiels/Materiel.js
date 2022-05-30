import React, { useState } from 'react'

//import css
import './Materiels.css'

//import back
import {
    getMateriel,
    getType,
    getLieux,
    ajouterMateriel,
    modifierMateriel,
    supprimerMateriel,
    ajouterMaintenance,
} from '../../../Service.js'

//import image
import modifier from '../../../image/modifier.svg'
import ajouter from '../../../image/ajouter.svg'

const Materiels = () => {
    const dayjs = require('dayjs')
    const [materiel, setmateriel] = useState([])
    let fetchMateriel = () => {
        getMateriel().then((response) => {
            setmateriel(response)
        })
    }
    if (materiel.length === 0) {
        fetchMateriel()
    }

    const [type, setType] = useState([])
    let fetchtype = () => {
        getType().then((response) => {
            setType(response)
        })
    }
    if (type.length === 0) {
        fetchtype()
    }

    const [lieux, setLieux] = useState([])
    let fetchLieux = () => {
        getLieux().then((response) => {
            setLieux(response)
        })
    }
    if (lieux.length === 0) {
        fetchLieux()
    }
    //fonction recherche
    const [recherche, setRecherche] = useState('')

    const onChangeRecherche = (e) => {
        setRecherche(e.target.value)
    }
    //fonction pour récupérer les filtres
    const [Secteur, setSecteur] = useState('')
    const handleSecteur = (e) => {
        setSecteur(e.target.value)
        console.log(Secteur)
    }

    const [Stype, setStype] = useState('')
    const handleType = (e) => {
        setStype(e.target.value)
    }

    const [enMaintenance, setenMaintenance] = useState('')
    const handleMaintenance = (e) => {
        setenMaintenance(e.target.value)
    }
    //fonction ajouter un materiel
    const [isActive, setisActive] = useState(false)
    const menuActive = () => {
        setisActive(!isActive)
    }
    const [nouveauMateriel, setnouveauMateriel] = useState({ enMaintenance: 0 })
    const handleForm = (e) => {
        setnouveauMateriel({
            ...nouveauMateriel,
            [e.target.id]: e.target.value,
        })
    }
    const ajoutMateriel = () => {
        ajouterMateriel(nouveauMateriel)
        setisActive(false)
        window.location.reload()
    }
    //fonction afficher materiel
    const [affMater, setAffMater] = useState(false)
    const [idMaterAffiche, setIdMaterAffiche] = useState()
    const [modifMater, setModifMater] = useState({})
    const afficherMateriel = (e) => {
        setAffMater(true)
        setIdMaterAffiche(e.target.id)
        setNewMaintenance({ ...newMaintenance, idMateriel: e.target.id })

        materiel.map((item) => {
            if (item.id == e.target.id) {
                setModifMater({
                    id: item.id,
                    nom: item.nom,
                    marque: item.marque,
                    enMaintenance: item.enMaintenance,
                    type: item.type,
                    lieux: item.lieux,
                    dateAchat: item.dateAchat,
                    //.split('T')[0]
                    description: item.description,
                    numSerie: item.numSerie,
                    prixAchat: item.prixAchat,
                    dateFinGarantie: item.dateFinGarantie,
                })
            }
        })
    }

    const modalMateriel = () => {
        setAffMater(false)
    }
    //fonction modifier materiel
    const [readOnly, setreadOnly] = useState(true)
    const [disabled, setdisabled] = useState(true)

    const onChangeInput = (e) => {
        setModifMater({ ...modifMater, [e.target.id]: e.target.value })
    }
    const modifPossible = () => {
        setreadOnly(!readOnly)
        setdisabled(!disabled)
    }
    const annulation = () => {
        setreadOnly(!readOnly)
        setdisabled(!disabled)
        materiel.map((item) => {
            if (item.id == idMaterAffiche) {
                setModifMater({
                    id: item.id,
                    nom: item.nom,
                    marque: item.marque,
                    enMaintenance: item.enMaintenance,
                    type: item.type,
                    lieux: item.lieux,
                    dateAchat: item.dateAchat,
                    description: item.description,
                    numSerie: item.numSerie,
                    prixAchat: item.prixAchat,
                    dateFinGarantie: item.dateFinGarantie,
                })
            }
        })
    }
    const putModif = () => {
        modifierMateriel(modifMater)
        setreadOnly(!readOnly)
        setdisabled(!disabled)
        window.location.reload()
    }
    //fonction supprimer materiel

    const supprimemateriel = () => {
        supprimerMateriel(idMaterAffiche)
        window.location.reload()
    }

    //création de maintenance
    const [affMaintenance, setAffMaintenance] = useState(false)
    const creaMaintenance = (e) => {
        if (e.target.value == 1) {
            setAffMaintenance(true)
        }
        if (e.target.value == 0) {
            setAffMaintenance(false)
        }
    }
    const [newMaintenance, setNewMaintenance] = useState({})
    const nouvelleMaintenance = () => {
        ajouterMaintenance(newMaintenance)
        modifierMateriel(modifMater)
    }

    const onChangeNewMaintenance = (e) => {
        setNewMaintenance({ ...newMaintenance, [e.target.id]: e.target.value })
    }

    return type.length > 0 && lieux.length > 0 ? (
        <div className="container">
            <div className="titreMateriel">
                <h2>Materiels</h2>
                <a className="is-primary" onClick={menuActive}>
                    <img src={ajouter} alt="ajouter" width="60px" />
                </a>
            </div>

            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <header class="modal-card-head">
                        <p className="modal-card-title">Ajouter un matériel</p>
                        <button
                            className="delete is-large"
                            onClick={menuActive}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <form className="form">
                            <div className="columns">
                                <div className="column is-half">
                                    <label className="label">
                                        Désignation*
                                    </label>
                                    <input
                                        className="input formNew"
                                        type="text"
                                        placeholder="Nom"
                                        id="nom"
                                        onChange={handleForm}
                                        required
                                    />
                                </div>
                                <div className="column is-half">
                                    <label className="label">Marque*</label>
                                    <input
                                        className="input formNew"
                                        type="text"
                                        placeholder="Marque"
                                        id="marque"
                                        onChange={handleForm}
                                        required
                                    />
                                </div>
                            </div>

                            <label className="label">Numéro de série</label>
                            <input
                                className="input formNew"
                                type="text"
                                id="numSerie"
                                onChange={handleForm}
                                placeholder="Numéro de série"
                            />
                            <label className="label">Description</label>
                            <input
                                className="input formNew"
                                type="text"
                                id="description"
                                onChange={handleForm}
                                placeholder="Description"
                            />
                            <div className="columns">
                                <div className="column is-half">
                                    <label className="label">Secteur*</label>

                                    <select
                                        className="select selectnewmateriel"
                                        id="lieux"
                                        onChange={handleForm}
                                        required
                                    >
                                        <option value="">Secteur</option>
                                        {lieux.map((item) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    id="lieux"
                                                >
                                                    {item.secteur} -{' '}
                                                    {item.sousSecteur}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="column is-half">
                                    {' '}
                                    <label className="label">Catégorie*</label>
                                    <select
                                        className="select selectnewmateriel"
                                        id="type"
                                        onChange={handleForm}
                                        required
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
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column is-half">
                                    <label className="label">
                                        Date d'achat*
                                    </label>
                                    <input
                                        type="date"
                                        onChange={handleForm}
                                        className="input formNew"
                                        id="dateAchat"
                                    />
                                </div>
                                <div className="column is-half">
                                    <label className="label">
                                        Date de fin de garantie
                                    </label>
                                    <input
                                        type="date"
                                        onChange={handleForm}
                                        className="input formNew"
                                        id="dateFinGarantie"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label">Prix d'achat*</label>
                                <input
                                    className="input formNew"
                                    type="text"
                                    id="prixAchat"
                                    placeholder="Prix d'achat"
                                    onChange={handleForm}
                                />
                            </div>

                            <div>
                                <label className="label">En maintenance*</label>

                                <select
                                    className="select selectnewmateriel "
                                    id="enMaintenance"
                                    value="0"
                                    disabled
                                    required
                                >
                                    <option value="">En maintenance</option>
                                    <option id="enMaintenance" value="0">
                                        Non
                                    </option>
                                </select>
                            </div>
                        </form>
                        <br></br>
                        <p>* obligatoire</p>
                    </section>

                    <footer className="modal-card-foot">
                        <button
                            className="button is-success boutonAjout"
                            type="submit"
                            onClick={ajoutMateriel}
                        >
                            Ajouter
                        </button>
                    </footer>
                </div>
            </div>

            <div className="formulaireRecherche">
                <form>
                    <input
                        className="input "
                        placeholder="Recherche par Désignation ou marque (minuscule)"
                        type="text"
                        onChange={onChangeRecherche}
                    />
                </form>
                {recherche != '' ? (
                    <div>
                        <table class="table is-striped is-fullwidth">
                            <tbody>
                                <tr className="teteTableau">
                                    <td>Nom</td>
                                    <td>Marque</td>
                                    <td>Type</td>
                                    <td>Secteur</td>
                                    <td>Sous secteur</td>
                                    <td>En maintenance</td>
                                    <td></td>
                                </tr>
                                {materiel.map((item) => {
                                    if (
                                        item.nom
                                            .toLowerCase()

                                            .indexOf(recherche) != -1 ||
                                        item.marque

                                            .toLowerCase()

                                            .indexOf(recherche) != -1
                                    )
                                        return (
                                            <tr className="corpsTableau">
                                                <td>{item.nom}</td>
                                                <td>{item.marque}</td>
                                                <td>
                                                    {type.map((itemType) => {
                                                        if (
                                                            itemType.id ==
                                                            item.type
                                                        ) {
                                                            return itemType.categorie
                                                        }
                                                    })}
                                                </td>
                                                <td>
                                                    {lieux.map((itemLieux) => {
                                                        if (
                                                            itemLieux.id ==
                                                            item.lieux
                                                        ) {
                                                            return itemLieux.secteur
                                                        }
                                                    })}
                                                </td>
                                                <td>
                                                    {lieux.map((itemLieux) => {
                                                        if (
                                                            itemLieux.id ==
                                                            item.lieux
                                                        ) {
                                                            return itemLieux.sousSecteur
                                                        }
                                                    })}
                                                </td>
                                                <td>
                                                    {item.enMaintenance == 1
                                                        ? 'Oui'
                                                        : 'Non'}
                                                </td>
                                                <td>
                                                    <button
                                                        className="button is-primary"
                                                        onClick={
                                                            afficherMateriel
                                                        }
                                                        id={item.id}
                                                    >
                                                        Plus d'informations
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                })}
                            </tbody>
                        </table>
                        <br></br>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className="columns is-vcentered cselect">
                <div className="column is-one-third">
                    <select
                        className="select selectmateriel"
                        onChange={handleSecteur}
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
                </div>
                <div className="column is-one-third">
                    <select
                        className="select selectmateriel"
                        onChange={handleType}
                    >
                        <option value="">Type</option>
                        {type.map((item) => {
                            return (
                                <option value={item.id}>
                                    {item.categorie}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="column is-one-third">
                    <select
                        className="select selectmateriel "
                        onChange={handleMaintenance}
                    >
                        <option value="">En maintenance</option>
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                    </select>
                </div>
            </div>
            <div className="columns">
                <div className="column is-full scrollable">
                    <table class="table is-striped  is-narrow is-mobile">
                        <tbody>
                            <tr className="teteTableau">
                                <td>Désignation</td>
                                <td>Marque</td>
                                <td>Type</td>
                                <td>Secteur</td>
                                <td>Sous secteur</td>
                                <td>En maintenance</td>
                                <td></td>
                            </tr>

                            {materiel.map((item) => {
                                if (Secteur == '') {
                                    if (Stype == '') {
                                        if (enMaintenance == '') {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>

                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (Secteur == item.lieux) {
                                    if (Stype == '') {
                                        if (enMaintenance == '') {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (Secteur == item.lieux) {
                                    if (Stype == '') {
                                        if (
                                            enMaintenance == item.enMaintenance
                                        ) {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (Secteur == item.lieux) {
                                    if (Stype == item.type) {
                                        if (
                                            enMaintenance == item.enMaintenance
                                        ) {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }

                                if (item.type == Stype) {
                                    if (Secteur == '') {
                                        if (
                                            enMaintenance == item.enMaintenance
                                        ) {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (Stype == '') {
                                    if (Secteur == item.lieux) {
                                        if (
                                            enMaintenance == item.enMaintenance
                                        ) {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (Secteur == '') {
                                    if (Stype == item.type) {
                                        if (enMaintenance == '') {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                                if (enMaintenance == item.enMaintenance) {
                                    if (Secteur == '') {
                                        if (Stype == '') {
                                            return (
                                                <tr className="corpsTableau">
                                                    <td>{item.nom}</td>
                                                    <td>{item.marque}</td>
                                                    <td>
                                                        {type.map(
                                                            (itemType) => {
                                                                if (
                                                                    itemType.id ==
                                                                    item.type
                                                                ) {
                                                                    return itemType.categorie
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.secteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {lieux.map(
                                                            (itemLieux) => {
                                                                if (
                                                                    itemLieux.id ==
                                                                    item.lieux
                                                                ) {
                                                                    return itemLieux.sousSecteur
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.enMaintenance == 1
                                                            ? 'Oui'
                                                            : 'Non'}
                                                    </td>{' '}
                                                    <td>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={
                                                                afficherMateriel
                                                            }
                                                            id={item.id}
                                                        >
                                                            Plus d'informations
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`modal ${affMater ? 'is-active' : ''}`}>
                <div className="modal-background"></div>

                {materiel.map((item) => {
                    if (item.id == modifMater.id) {
                        return (
                            <div className="modal-content">
                                <header class="modal-card-head">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <p className="modal-card-title">
                                            {modifMater.nom}
                                        </p>
                                        {readOnly ? (
                                            <img
                                                src={modifier}
                                                amt="modifier"
                                                width="40px"
                                                style={{ margin: '0 30px' }}
                                                onClick={modifPossible}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <button
                                        className="delete is-large"
                                        onClick={modalMateriel}
                                        style={{ marginLeft: 'auto' }}
                                    ></button>
                                </header>

                                <section className="modal-card-body">
                                    <form className="form">
                                        <div className="columns">
                                            <div className="column is-half">
                                                <label className="label">
                                                    Désignation*
                                                </label>
                                                <input
                                                    className="input formNew"
                                                    type="text"
                                                    value={modifMater.nom}
                                                    id="nom"
                                                    onChange={onChangeInput}
                                                    readOnly={readOnly}
                                                    required
                                                />
                                            </div>
                                            <div className="column is-half">
                                                <label className="label">
                                                    Marque*
                                                </label>
                                                <input
                                                    className="input formNew"
                                                    type="text"
                                                    value={modifMater.marque}
                                                    id="marque"
                                                    onChange={onChangeInput}
                                                    readOnly={readOnly}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <label className="label">
                                            Numéro de série
                                        </label>
                                        <input
                                            className="input formNew"
                                            type="text"
                                            id="numSerie"
                                            onChange={onChangeInput}
                                            readOnly={readOnly}
                                            value={modifMater.numSerie}
                                        />
                                        <label className="label">
                                            Description
                                        </label>
                                        <input
                                            className="input formNew"
                                            type="text"
                                            id="description"
                                            onChange={onChangeInput}
                                            readOnly={readOnly}
                                            value={modifMater.description}
                                        />
                                        <div className="columns">
                                            <div className="column is-half">
                                                <label className="label">
                                                    Secteur*
                                                </label>
                                                <select
                                                    className="select selectnewmateriel"
                                                    id="lieux"
                                                    onChange={onChangeInput}
                                                    disabled={disabled}
                                                    value={modifMater.lieux}
                                                    required
                                                >
                                                    <option value="">
                                                        Secteur
                                                    </option>
                                                    {lieux.map((item) => {
                                                        return (
                                                            <option
                                                                value={item.id}
                                                            >
                                                                {item.secteur} -{' '}
                                                                {
                                                                    item.sousSecteur
                                                                }
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="column is-half">
                                                <label className="label">
                                                    Catégorie*
                                                </label>
                                                <select
                                                    className="select selectnewmateriel"
                                                    id="type"
                                                    onChange={onChangeInput}
                                                    value={modifMater.type}
                                                    disabled={disabled}
                                                    required
                                                >
                                                    <option value="">
                                                        Catégorie
                                                    </option>
                                                    {type.map((item) => {
                                                        return (
                                                            <option
                                                                value={item.id}
                                                            >
                                                                {item.categorie}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="columns">
                                            <div className="column is-half">
                                                <label className="label">
                                                    Date d'achat*
                                                </label>
                                                <input
                                                    type="date"
                                                    readOnly={readOnly}
                                                    onChange={onChangeInput}
                                                    className="input formNew"
                                                    id="dateAchat"
                                                    value={
                                                        modifMater.dateAchat ==
                                                        null
                                                            ? ''
                                                            : modifMater.dateAchat.split(
                                                                  'T'
                                                              )[0]

                                                    }
                                                />
                                            </div>

                                            <div className="column is-half">
                                                <label className="label">
                                                    Date de fin de garantie
                                                </label>
                                                <input
                                                    type="date"
                                                    readOnly={readOnly}
                                                    onChange={onChangeInput}
                                                    className="input formNew"
                                                    id="dateFinGarantie"
                                                    value={
                                                        modifMater.dateFinGarantie ==
                                                        null
                                                            ? ''
                                                            : modifMater.dateFinGarantie.split(
                                                                  'T'
                                                              )[0]
                                                    }
                                                />
                                            </div>
                                        </div>{' '}
                                        <label className="label">
                                            Prix d'achat*
                                        </label>
                                        <input
                                            className="input formNew"
                                            type="text"
                                            id="prixAchat"
                                            placeholder="prix d'achat"
                                            onChange={onChangeInput}
                                            value={modifMater.prixAchat}
                                            readOnly={readOnly}
                                        />
                                        <div>
                                            <label className="label">
                                                En maintenance*
                                            </label>

                                            <select
                                                className="select selectnewmateriel "
                                                id="enMaintenance"
                                                onChange={onChangeInput}
                                                onClick={creaMaintenance}
                                                disabled={disabled}
                                                value={modifMater.enMaintenance}
                                                required
                                            >
                                                <option value="">
                                                    En maintenance
                                                </option>
                                                <option
                                                    id="enMaintenance"
                                                    value="1"
                                                >
                                                    Oui
                                                </option>
                                                <option
                                                    id="enMaintenance"
                                                    value="0"
                                                >
                                                    Non
                                                </option>
                                            </select>
                                        </div>
                                        {affMaintenance ? (
                                            <div className="creaMaintenance">
                                                <hr></hr>
                                                <div>
                                                    <h4>
                                                        Informations maintenance
                                                    </h4>
                                                </div>
                                                <form className="form">
                                                    <div className="columns">
                                                        <div className="column is-half">
                                                            <label className="label">
                                                                Date de départ
                                                                en maintenance*
                                                            </label>
                                                            <input
                                                                className="input selectnewmateriel formNew"
                                                                type="date"
                                                                id="dateDepart"
                                                                onChange={
                                                                    onChangeNewMaintenance
                                                                }
                                                            />
                                                        </div>
                                                        <div className="column is-half">
                                                            <label className="label">
                                                                Date de retour
                                                                de maintenance
                                                            </label>
                                                            <input
                                                                className="input selectnewmateriel formNew"
                                                                type="date"
                                                                id="dateRetour"
                                                                onChange={
                                                                    onChangeNewMaintenance
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="columns">
                                                        <div className="column is-half">
                                                            <label className="label">
                                                                Montant de la
                                                                maintenance*
                                                            </label>
                                                            <input
                                                                className="input selectnewmateriel formNew"
                                                                type="text"
                                                                placeholder="montant de la réparation"
                                                                id="montantReparation"
                                                                onChange={
                                                                    onChangeNewMaintenance
                                                                }
                                                            />
                                                        </div>
                                                        <div className="column is-half">
                                                            <label className="label">
                                                                Lieux de la
                                                                maintenance*
                                                            </label>
                                                            <input
                                                                className="input selectnewmateriel formNew"
                                                                type="text"
                                                                placeholder="lieux de la maintenance"
                                                                id="lieuxMaintenance"
                                                                onChange={
                                                                    onChangeNewMaintenance
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <label className="label">
                                                        Devis
                                                    </label>
                                                    <input
                                                        className="input selectnewmateriel formNew"
                                                        type="text"
                                                        placeholder="devis"
                                                        id="devis"
                                                        onChange={
                                                            onChangeNewMaintenance
                                                        }
                                                    />

                                                    <label className="label">
                                                        Description
                                                    </label>
                                                    <input
                                                        className="input selectnewmateriel formNew"
                                                        type="text"
                                                        placeholder="description"
                                                        id="description"
                                                        onChange={
                                                            onChangeNewMaintenance
                                                        }
                                                    />
                                                    <div className="ajoutMaintenance">
                                                        <button
                                                            className="button is-warning boutonAjoutmaintenance"
                                                            type="reset"
                                                        >
                                                            Annuler
                                                        </button>
                                                        <button
                                                            className="button is-success boutonAjoutmaintenance"
                                                            onClick={
                                                                nouvelleMaintenance
                                                            }
                                                        >
                                                            Ajouter
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </form>
                                    <br></br>
                                    <p>* obligatoire</p>
                                </section>
                                <footer className="modal-card-foot">
                                    {readOnly ? (
                                        <button
                                            className="button is-warning boutonAjout"
                                            type="submit"
                                            onClick={supprimemateriel}
                                        >
                                            Supprimer
                                        </button>
                                    ) : (
                                        <div className="boutonsModif">
                                            <button
                                                className="button is-warning boutonAjout"
                                                type="reset"
                                                onClick={annulation}
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                className="button is-success boutonAjout"
                                                type="submit"
                                                onClick={putModif}
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    )}
                                </footer>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    ) : (
        <div>Loading</div>
    )
}

export default Materiels
