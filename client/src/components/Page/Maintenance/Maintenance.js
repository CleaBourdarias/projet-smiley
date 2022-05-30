import React, { useState } from 'react'

//import css
import './Maintenance.css'

//import image
import modifier from '../../../image/modifier.svg'

//import bdd
import {
    getMaintenance,
    getMateriel,
    getType,
    getLieux,
    supprimerMaintenance,
    modifierMaintenance,
} from '../../../Service.js'


const Maintenance = () => {
    const dayjs = require('dayjs')

    const [maintenance, setmaintenance] = useState([])
    let fetchMaintenance = () => {
        getMaintenance().then((response) => {
            setmaintenance(response)
        })
    }
    if (maintenance.length === 0) {
        for (let i = 0; i < 3; i++) {
            fetchMaintenance()
            //console.log("coucou")
        }
    }
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

    //fonction nouvelle maintenance
    const [isActive, setisActive] = useState(false)
    const menuActive = () => {
        setisActive(!isActive)
    }
    //fonction afficher maintenance
    const [affMater, setAffMater] = useState(false)
    const [idMaterAffiche, setIdMaterAffiche] = useState()
    const [modifMater, setModifMater] = useState({})
    const afficherMaintenance = (e) => {
        setAffMater(true)
        setIdMaterAffiche(e.target.id)

        maintenance.map((item) => {
            if (item.id == e.target.id) {
                setModifMater({
                    id: item.id,
                    idMateriel: item.idMateriel,
                    dateDepart: item.dateDepart,
                    dateRetour: item.dateRetour,
                    devis: item.devis,
                    montantReparation: item.montantReparation,
                    lieuxMaintenance: item.lieuxMaintenance,
                    description: item.description,
                })
            }
        })
    }
    const modalMaintenance = () => {
        setAffMater(false)
    }
    //fonction modification maintenance
    const [readOnly, setreadOnly] = useState(true)
    const [disabled, setdisabled] = useState(true)

    const modifPossible = () => {
        setreadOnly(!readOnly)
        setdisabled(!disabled)
    }
    const onChangeInput = (e) => {
        setModifMater({ ...modifMater, [e.target.id]: e.target.value })
    }
    const modifieMaintenance = () => {
        modifierMaintenance(modifMater)

        setreadOnly(!readOnly)
        setdisabled(!disabled)

    }
    //msuppression maintenance
    const supprimeMaintenance = () => {
        supprimerMaintenance(idMaterAffiche)
        window.location.reload()
    }

    //annulation modification
    const annulation = () => {
        setreadOnly(!readOnly)
        setdisabled(!disabled)
        maintenance.map((item) => {
            if (item.id == idMaterAffiche) {
                setModifMater({
                    id: item.id,
                    idMateriel: item.idMateriel,
                    dateDepart: item.dateDepart,
                    dateRetour: item.dateRetour,
                    devis: item.devis,
                    montantReparation: item.montantReparation,
                    lieuxMaintenance: item.lieuxMaintenance,
                    description: item.description,
                })
            }
        })
    }


    // Filtre en cours/passées
    const [etat, setetat] = useState('')

    return (
        <div className="container">
            <h2>En maintenance</h2>

            <div className="formulaireRecherche">
                <form>
                    <input
                        className="input"
                        placeholder="Recherche par Nom ou Lieux réparation (minuscule)"
                        type="text"
                        onChange={onChangeRecherche}
                    />
                </form>
                {recherche ? (
                    <div>
                        <table>
                            <tbody>
                                <tr className="teteTableau">
                                    <td>Nom</td>
                                    <td>Date départ</td>
                                    <td>Date retour</td>
                                    <td>Lieux réparation</td>
                                    <td></td>
                                </tr>
                                {maintenance.map((item) => {
                                    let nomInSearch =
                                        item.lieuxMaintenance  
                                            .toLowerCase()
                                            .indexOf(recherche) != -1
                                        
                                    materiel.forEach((mat) => {
                                        if (
                                            mat.id == item.idMateriel &&
                                            mat.nom
                                                .toLowerCase()
                                                .indexOf(recherche) != -1
                                                    
                                        ) {
                                            nomInSearch = true
                                        }
                                    })
                                    if (nomInSearch) {
                                        return (
                                            <tr>
                                                <td>
                                                    {materiel.map(
                                                        (itemMateriel, id) => {
                                                            if (
                                                                item.idMateriel ==
                                                                itemMateriel.id
                                                            ) {
                                                                return itemMateriel.nom
                                                            }
                                                        }
                                                    )}
                                                </td>
                                                <td>
                                                    {
                                                        item.dateDepart.split(
                                                            'T'
                                                        )[0]
                                                    }
                                                </td>
                                                <td>
                                                    {' '}
                                                    {item.dateRetour == null
                                                        ? 'non prévu'
                                                        : item.dateRetour.split(
                                                              'T'
                                                          )[0]}
                                                </td>
                                                <td>{item.lieuxMaintenance}</td>
                                                <td>
                                                    <button
                                                        className="button is-primary"
                                                        id={item.id}
                                                    >
                                                        Plus d'informations
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                        <br></br>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className=" is-vcentered cselect">
                <select
                    className="select selectmaintenance"
                    id="enMaintenance"
                    onChange={(e) => {
                        setetat(e.target.value)
                    }}
                >
                    <option value="">Etat</option>
                    <option id="enMaintenance" value={true}>
                        En cours
                    </option>
                    <option id="enMaintenance" value={false}>
                        Passées
                    </option>
                </select>
            </div>
            <div className="column scrollable">
                <table className="table">
                    <tbody>
                        <tr className="teteTableau">
                            <td>Nom</td>
                            <td>Date départ</td>
                            <td>Date retour</td>
                            <td>Lieux réparation</td>
                            <td></td>
                        </tr>

                        {maintenance.map((item) => {
                            if (
                                etat == '' ||
                                dayjs(item.dateRetour)
                                    .isBefore(dayjs())
                                    .toString() != etat
                            ) {
                                return (
                                    <tr>
                                        <td>
                                            {materiel.map(
                                                (itemMateriel, id) => {
                                                    if (
                                                        item.idMateriel ==
                                                        itemMateriel.id
                                                    ) {
                                                        return itemMateriel.nom
                                                    }
                                                }
                                            )}
                                        </td>
                                        <td>{item.dateDepart.split('T')[0]}</td>
                                        <td>
                                            {item.dateRetour == null
                                                ? 'non prévu'
                                                : item.dateRetour.split('T')[0]}
                                        </td>
                                        <td>{item.lieuxMaintenance}</td>
                                        <td>
                                            <button
                                                className="button is-primary"
                                                id={item.id}
                                                onClick={afficherMaintenance}
                                            >
                                                Plus d'informations
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                <div className={`modal ${affMater ? 'is-active' : ''}`}>
                    <div className="modal-background"></div>
                    {maintenance.map((item) => {
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
                                                {materiel.map(
                                                    (itemMateriel, id) => {
                                                        if (
                                                            item.idMateriel ==
                                                            itemMateriel.id
                                                        ) {
                                                            return itemMateriel.nom
                                                        }
                                                    }
                                                )}
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
                                            onClick={modalMaintenance}
                                            style={{ marginLeft: 'auto' }}
                                        ></button>
                                    </header>

                                    <section className="modal-card-body">
                                        <form className="form">
                                            <label className="label">
                                                Nom*
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="text"
                                                disabled
                                                value={materiel.map(
                                                    (itemMateriel) => {
                                                        if (
                                                            item.idMateriel ==
                                                            itemMateriel.id
                                                        ) {
                                                            return itemMateriel.nom
                                                        }
                                                    }
                                                )}
                                                id="nom"
                                            />

                                            <label className="label">
                                                Date de départ en maintenance*
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="date"
                                                disabled={disabled}
                                                onChange={onChangeInput}
                                                value={
                                                    modifMater.dateDepart.split(
                                                        'T'
                                                    )[0]
                                                }
                                                id="dateDepart"
                                            />
                                            <label className="label">
                                                Date de retour de maintenance
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="date"
                                                disabled={disabled}
                                                onChange={onChangeInput}
                                                value={
                                                    modifMater.dateRetour ==
                                                    null
                                                        ? 'non prévu'
                                                        : modifMater.dateRetour.split(
                                                              'T'
                                                          )[0]
                                                }
                                                id="dateRetour"
                                            />
                                            <label className="label">
                                                Montant de la maintenance
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="text"
                                                readOnly={readOnly}
                                                onChange={onChangeInput}
                                                value={
                                                    modifMater.montantReparation
                                                }
                                                id="montantReparation"
                                            />

                                            <label className="label">
                                                Devis
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="texte"
                                                readOnly={readOnly}
                                                onChange={onChangeInput}
                                                value={modifMater.devis}
                                                id="devis"
                                            />

                                            <label className="label">
                                                Lieux de la maintenance
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="text"
                                                readOnly={readOnly}
                                                onChange={onChangeInput}
                                                value={
                                                    modifMater.lieuxMaintenance
                                                }
                                                id="lieuxMaintenance"
                                            />
                                            <label className="label">
                                                Description
                                            </label>
                                            <input
                                                className="input formNew"
                                                type="text"
                                                readOnly={readOnly}
                                                onChange={onChangeInput}
                                                value={modifMater.description}
                                                id="description"
                                            />
                                        </form>
                                        <br></br>
                                        <p>* obligatoire</p>
                                    </section>
                                    <footer className="modal-card-foot">
                                        {readOnly ? (
                                            <button
                                                className="button is-warning boutonAjout"
                                                type="submit"
                                                onClick={supprimeMaintenance}
                                            >
                                                Supprimer
                                            </button>
                                        ) : (
                                            <div className="boutonsModif">
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
                                                    onClick={modifieMaintenance}
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
        </div>
    )
}

export default Maintenance

