import React from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'

const DetailsMateriels = (props) => {
    // Initiate dataset
    let labels = []
    let pannes = []
    let cout = []

    for (let i = 0; i < props.materiels.length; i++) {
        labels.push(props.materiels[i].nom)
        pannes.push(props.materiels[i].pannes)
        cout.push(props.materiels[i].cout)
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

export default DetailsMateriels
