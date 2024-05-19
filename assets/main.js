import "https://cdn.jsdelivr.net/npm/chart.js"

export function init(ctx, s) {
    var audio = new Audio('http://localhost:8080/lisbon_heat.wav');

    audio.play();

    let currentIndex = 0 
    function updateData() {
        if (currentIndex >= 5) {
            currentIndex = 0;
        }
        document.getElementById('textoAnoTasavg').innerText = 'Index: ' + currentIndex;
        currentIndex++;
    }

    ctx.root.innerHTML = `
    <body>
        <h2>Temperature Anomalies</h2>
        <canvas id="multiLineChart"></canvas>
    </body>
    `
    const ctxChart = document.getElementById('multiLineChart').getContext('2d');
    const multiLineChart = new Chart(ctxChart, {
        type: 'line',
        data: {
            labels: ['1971'],
            datasets: [
                {
                    label: 'tasmin',
                    data: [-0.98],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'tasavg',
                    data: [-0.79],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'taxmax',
                    data: [-0.59],
                    borderColor: 'rgb(255, 165, 64, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const newData = [
        { year: '1972', tasmin: -1.18, tasavg: -1.29, tasmax: -1.40 },
        { year: '1973', tasmin: -0.58, tasavg: -0.40, tasmax: -0.21 },
        { year: '1974', tasmin: -0.79, tasavg: -0.56, tasmax: -0.33 },
        { year: '1975', tasmin: -0.61, tasavg: -0.52, tasmax: -0.43 },
        { year: '1976', tasmin: -0.59, tasavg: -0.40, tasmax: -0.22 },
        { year: '1977', tasmin: -0.39, tasavg: -0.38, tasmax: -0.37 },
        { year: '1978', tasmin: -0.29, tasavg: -0.14, tasmax: 0.00 },
        { year: '1979', tasmin: -0.41, tasavg: -0.41, tasmax: -0.42 },
        { year: '1980', tasmin: -0.42, tasavg: -0.11, tasmax: 0.20 },
        { year: '1981', tasmin: 0.29, tasavg: 0.47, tasmax: 0.65 },
        { year: '1982', tasmin: -0.00, tasavg: -0.00, tasmax: -0.01 },
        { year: '1983', tasmin: -0.01, tasavg: -0.02, tasmax: -0.05 },
        { year: '1984', tasmin: -0.53, tasavg: -0.37, tasmax: -0.22 },
        { year: '1985', tasmin: 0.02, tasavg: 0.04, tasmax: 0.07 },
        { year: '1986', tasmin: -0.23, tasavg: -0.19, tasmax: -0.14 },
        { year: '1987', tasmin: 0.68, tasavg: 0.58, tasmax: 0.48 },
        { year: '1988', tasmin: 0.11, tasavg: -0.00, tasmax: -0.12 },
        { year: '1989', tasmin: 0.92, tasavg: 0.79, tasmax: 0.66 },
        { year: '1990', tasmin: 0.59, tasavg: 0.49, tasmax: 0.38 },
        { year: '1991', tasmin: 0.08, tasavg: 0.11, tasmax: 0.13 },
        { year: '1992', tasmin: -0.13, tasavg: -0.04, tasmax: 0.05 },
        { year: '1993', tasmin: -0.24, tasavg: -0.62, tasmax: -1.00 },
        { year: '1994', tasmin: 0.45, tasavg: 0.17, tasmax: -0.10 },
        { year: '1995', tasmin: 1.27, tasavg: 1.21, tasmax: 1.16 },
        { year: '1996', tasmin: 0.43, tasavg: 0.24, tasmax: 0.07 },
        { year: '1997', tasmin: 1.31, tasavg: 1.16, tasmax: 1.02 },
        { year: '1998', tasmin: 0.47, tasavg: 0.45, tasmax: 0.45 },
        { year: '1999', tasmin: 0.30, tasavg: 0.13, tasmax: -0.05 },
        { year: '2000', tasmin: 0.47, tasavg: 0.42, tasmax: 0.38 },
        { year: '2001', tasmin: 0.44, tasavg: 0.41, tasmax: 0.38 },
        { year: '2002', tasmin: 0.46, tasavg: 0.55, tasmax: 0.65 },
        { year: '2003', tasmin: 0.79, tasavg: 0.92, tasmax: 1.06 },
        { year: '2004', tasmin: 0.35, tasavg: 0.67, tasmax: 0.99 },
        { year: '2005', tasmin: 0.08, tasavg: 0.56, tasmax: 1.04 },
        { year: '2006', tasmin: 0.79, tasavg: 1.06, tasmax: 1.34 },
        { year: '2007', tasmin: 0.19, tasavg: 0.44, tasmax: 0.68 },
        { year: '2008', tasmin: 0.26, tasavg: 0.52, tasmax: 0.77 },
        { year: '2009', tasmin: 0.83, tasavg: 1.20, tasmax: 1.56 },
        { year: '2010', tasmin: 0.46, tasavg: 0.69, tasmax: 0.93 },
        { year: '2011', tasmin: 0.96, tasavg: 1.25, tasmax: 1.54 },

    ];

    let index = 0;
    setInterval(() => {
        if (index < newData.length) {
            const data = newData[index++];
            multiLineChart.data.labels.push(data.year);
            multiLineChart.data.datasets[0].data.push(data.tasmin);
            multiLineChart.data.datasets[1].data.push(data.tasavg);
            multiLineChart.data.datasets[2].data.push(data.tasmax);
            multiLineChart.update();
        }
    }, 2000);
  }

