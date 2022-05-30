import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'

import CoutTotale from '../../Graphique/CoutTotale.js'
import DetailsMateriels from '../../Graphique/DetailsMateriels.js'
import DetailsCategories from '../../Graphique/DetailsCategories.js'

//import css
import './Statistiques.css'

//import back

import { getState, getType } from '../../../Service.js'

const Statistiques = () => {
    const [statistique, setStatistique] = useState('')
    let fetchStatistique = () => {
        getState().then((response) => {
            console.log('coucou')
            setStatistique(response)
        })
    }

    if (statistique.length === 0) {
        fetchStatistique()
    }

    const [type, setType] = useState('')
    let fetchtype = () => {
        getType().then((response) => {
            setType(response)
        })
    }
    if (type.length === 0) {
        fetchtype()
    }

    return statistique != '' && type != '' ? (
        <div className="container">
            <h1>Statistiques</h1>
            <hr></hr>
            <div>
                <h5>Coût sur l'année</h5>
                <CoutTotale
                    achat={statistique.cout_achat_materiel}
                    maintenance={statistique.cout_maintenance_materiel}
                />
            </div>

            <div>
                <h5>Détails des maintenances par matériel</h5>
                <DetailsMateriels
                    materiels={statistique.details_maintenance_materiel}
                />
            </div>
            <div className="divBas">
                <h5>Détails des maintenances par catégorie</h5>
                <DetailsCategories
                    materiels={statistique.details_maintenance_materiel}
                    categorie={type}
                />
            </div>
        </div>
    ) : (
        <div>
            <h1>Statistiques</h1>
            <p>Loading</p>
        </div>
    )
}

export default Statistiques
