import React from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'

const CoutTotale = (props) => {
    // Initiate dataset
    let labels = []
    let achat = []
    let maintenance = []

    for (let i = dayjs().year() - 10; i < 2000 + props.achat.length; i++) {
        labels.push([i])
        achat.push(props.achat[i - 2000][i])
        maintenance.push(props.maintenance[i - 2000][i])
    }

    const state = {
        labels: labels,
        datasets: [
            {
                label: 'Cout achat par année',
                backgroundColor: '#86BBD8',
                borderColor: '#000033',
                borderWidth: 2,
                data: achat,
            },
            {
                label: 'Cout maintenance par année',
                backgroundColor: '#355282',
                borderColor: '#000033',
                borderWidth: 2,
                data: maintenance,
            },
        ],
    }

    return (
        <div>
            <Bar
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: 'right',
                    },
                }}
            />
        </div>
    )
}

export default CoutTotale
