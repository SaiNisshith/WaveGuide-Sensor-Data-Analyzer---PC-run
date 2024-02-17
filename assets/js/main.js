let myChart; // Declare myChart variable outside the chartPlot function

function chartPlot(dat) {

    let tempererature = dat.y;
    let time = dat.x;

    const labels = time;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Temperature',
            data: tempererature,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            animation: {
                duration: 0 // Disable animations
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature vs Time',
                    font: {
                        size: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `Temperature: ${context.parsed.y}`;
                        }
                    }
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time(DD/MM/YYYY ; Hours:Minutes:Seconds)',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temperature(°C)',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    };

    // Destroy existing chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('temperatureChart').getContext('2d');
    myChart = new Chart(ctx, config);
}

function reload(sensor) {
    fetch(`/get_temp_data/${sensor}`)
        .then(resp => resp.json())
        .then(data => {
            chartPlot(data);
            
            let l = data.y.length;
          
            document.getElementById('temp').innerHTML = data.y[l-1] + " (°C)";

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

let intervalIds = [];

document.getElementById("sensor").addEventListener("change", function() {
    var selectedSensor = this.value;
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];
    // console.log("Selected value:", selectedSensor);
    reload(selectedSensor);
    intervalIds.push(setInterval(function() {
        reload(selectedSensor);
    }, 10000));
});




