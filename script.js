// Function to load the chart data based on the selected sensor type
function loadChartData(sensorType) {
    var ctx = document.getElementById('dataChart').getContext('2d');

    // Realistic sensor data for each sensor type
    var chartData = {
        temperature: [23.2, 23.5, 23.7, 23.8, 24.0, 24.5],  // Temperature in Celsius (ideal for fish growth)
        ammonia: [0.05, 0.06, 0.07, 0.08, 0.09, 0.1], // Ammonia in ppm (parts per million) in water
        oxygen: [7.2, 7.4, 7.1, 6.9, 7.0, 7.3],   // Dissolved Oxygen (mg/L) ideal range for aquaculture is around 5-8 mg/L
        ph: [6.9, 7.0, 7.1, 7.2, 7.1, 7.0],  // pH levels typically range from 6.5 to 8 for most fish species
    };

    // Get the correct dataset based on the selected sensor type
    var dataValues = chartData[sensorType];

    // Chart configurations
    var chartConfig = {
        type: 'line',
        data: {
            labels: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],  // Time labels
            datasets: [{
                label: sensorType.charAt(0).toUpperCase() + sensorType.slice(1),
                data: dataValues,
                borderColor: getRandomColor(),
                backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light transparent background
                tension: 0.4,  // Slightly curved lines to mimic real data trends
                fill: true, // Optional: Fill the area beneath the line
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItem) {
                            return `Time: ${tooltipItem[0].label}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false, // Do not force zero for all charts
                    suggestedMax: function () {
                        return getYAxisMax(sensorType);  // Max value dynamically set for realistic scaling
                    }
                }
            }
        }
    };

    // Destroy previous chart if exists and create the new one
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new chart with the given sensor data
    window.myChart = new Chart(ctx, chartConfig);
}

// Get maximum value for each sensor type to ensure proper scaling of Y-axis
function getYAxisMax(sensorType) {
    switch (sensorType) {
        case 'temperature':
            return 30;  // Max temperature realistic for fish growth
        case 'ammonia':
            return 0.15;  // Ammonia typically stays under 0.1 ppm for safe levels in aquaculture
        case 'oxygen':
            return 9;  // Ideal oxygen levels should be between 5-8 mg/L
        case 'ph':
            return 8;  // pH level should not exceed 8 for optimal conditions
        default:
            return 10;  // Fallback max value
    }
}

// Function to generate a random color for each sensor type line
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Destroy the chart when the modal closes
document.getElementById('chartModal').addEventListener('hidden.bs.modal', function () {
    var ctx = document.getElementById('dataChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
});

// Example of manually opening the modal for a specific sensor type
function openChartModal(sensorType) {
    loadChartData(sensorType);
    
    // Show the modal (Bootstrap will handle this)
    var myModal = new bootstrap.Modal(document.getElementById('chartModal'));
    myModal.show();
}