import React from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'

const DetailsCategories = (props) => {
    // Initiate dataset
    let comp = []
    let labels = []
    let pannes = []
    let cout = []

    for (let i = 0; i < props.categorie.length; i++) {
        labels.push(props.categorie[i].categorie)
        comp.push(props.categorie[i].id)
        pannes.push(0)
        cout.push(0)
    }

    for (let i = 0; i < props.materiels.length; i++) {
        console.log(props.materiels[i])
        pannes[comp.indexOf(props.materiels[i].categorie)] +=
            props.materiels[i].pannes
        cout[comp.indexOf(props.materiels[i].categorie)] +=
            props.materiels[i].cout
    }

    const state = {
        labels: labels,
        datasets: [
            {
                label: 'Nombre de pannes',
                backgroundColor: '#86BBD8',
                borderColor: '#000033',
                borderWidth: 2,
                data: pannes,
            },
            {
                label: 'Cout de réparation',
                backgroundColor: '#355282',
                borderColor: '#000033',
                borderWidth: 2,
                data: cout,
            },
        ],
    }

    return (
        <div>
            <Bar
                data={state}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    indexAxis: 'y',
                }}
            />
        </div>
    )
}

export default DetailsCategories
