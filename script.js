// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Add event listeners
    addEventListeners();
});

// Function to initialize all charts
function initializeCharts() {
    // Recovery Trend Chart (Line Chart)
    const recoveryCtx = document.getElementById('recoveryChart').getContext('2d');
    const recoveryChart = new Chart(recoveryCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [
                {
                    label: 'Mining Crew',
                    data: [65, 68, 72, 74, 69, 71, 75, 78],
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Logistics',
                    data: [70, 72, 75, 76, 78, 74, 76, 80],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Operations',
                    data: [62, 65, 68, 71, 73, 70, 72, 74],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Recovery Score (%)'
                    }
                }
            }
        }
    });
    
    // Sleep Quality Distribution Chart (Doughnut Chart)
    const sleepCtx = document.getElementById('sleepChart').getContext('2d');
    const sleepChart = new Chart(sleepCtx, {
        type: 'doughnut',
        data: {
            labels: ['Excellent (8+ hrs)', 'Good (7-8 hrs)', 'Fair (6-7 hrs)', 'Poor (<6 hrs)'],
            datasets: [{
                data: [15, 35, 30, 20],
                backgroundColor: [
                    '#28a745',
                    '#0066cc',
                    '#ffc107',
                    '#dc3545'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            cutout: '70%'
        }
    });
    
    // Activity vs Recovery Chart (Scatter Chart)
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    const activityChart = new Chart(activityCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Employees',
                data: [
                    { x: 2.5, y: 45 },
                    { x: 3.2, y: 52 },
                    { x: 4.1, y: 65 },
                    { x: 5.3, y: 74 },
                    { x: 6.2, y: 85 },
                    { x: 3.8, y: 58 },
                    { x: 4.5, y: 72 },
                    { x: 5.1, y: 69 },
                    { x: 5.8, y: 76 },
                    { x: 4.3, y: 62 },
                    { x: 3.5, y: 55 },
                    { x: 6.5, y: 80 },
                    { x: 5.5, y: 73 },
                    { x: 4.8, y: 68 },
                    { x: 3.9, y: 60 },
                    { x: 5.7, y: 82 },
                    { x: 4.2, y: 63 },
                    { x: 5.0, y: 71 },
                    { x: 3.0, y: 50 },
                    { x: 6.0, y: 78 }
                ],
                backgroundColor: function(context) {
                    const value = context.raw.y;
                    if (value < 60) return '#dc3545';
                    if (value < 70) return '#ffc107';
                    return '#28a745';
                },
                pointRadius: 8,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Activity: ${context.raw.x} hrs, Recovery: ${context.raw.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Daily Activity (hours)'
                    },
                    min: 2,
                    max: 7
                },
                y: {
                    title: {
                        display: true,
                        text: 'Recovery Score (%)'
                    },
                    min: 40,
                    max: 90
                }
            }
        }
    });
}

// Function to add event listeners
function addEventListeners() {
    // Team selection dropdown
    const teamSelect = document.getElementById('teamSelect');
    if (teamSelect) {
        teamSelect.addEventListener('change', function() {
            // In a real application, this would filter the data
            console.log('Team selected:', this.value);
            // You would update the charts here based on the selected team
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Update header title
            const headerTitle = document.querySelector('header h1');
            if (headerTitle) {
                headerTitle.textContent = this.textContent.trim();
            }
            
            // In a real application, this would load the corresponding page content
            console.log('Navigation to:', this.getAttribute('href'));
        });
    });
    
    // Contact buttons
    const contactButtons = document.querySelectorAll('.btn.small');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeName = this.closest('tr').querySelector('.employee-cell span').textContent;
            alert(`Contact initiated with ${employeeName}`);
            // In a real application, this would open a contact form or messaging interface
        });
    });
    
    // Insight cards
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach(card => {
        card.addEventListener('click', function() {
            const insightTitle = this.querySelector('h4').textContent;
            alert(`Viewing detailed analysis for: ${insightTitle}`);
            // In a real application, this would open a detailed view of the insight
        });
    });
}

// Simulate data updates (in a real application, this would fetch data from an API)
function simulateDataUpdates() {
    // This function would be called periodically to update the dashboard with new data
    console.log('Updating dashboard data...');
    // In a real application, you would fetch data from the Polar API here
}

// Call simulateDataUpdates every 5 minutes (300000 ms)
setInterval(simulateDataUpdates, 300000);
