// Global vars
let currentUser = null;
let role = null;

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    checkSession();
});

function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const toggleReg = document.getElementById('toggleReg');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (regForm) {
        regForm.addEventListener('submit', handleRegister);
    }
    if (toggleReg) {
        toggleReg.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
            regForm.style.display = regForm.style.display === 'none' ? 'block' : 'none';
        });
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const roleSel = document.getElementById('role').value;

    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', username, password, role: roleSel })
        });
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            role = data.role;
            showDashboard();
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (err) {
        alert('Erreur connexion: ' + err.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', username, email, password, role })
        });
        const data = await response.json();
        
        if (data.success) {
            alert('Inscription réussie! Connectez-vous.');
            // Switch to login
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (err) {
        alert('Erreur: ' + err.message);
    }
}

async function checkSession() {
    try {
        const response = await fetch('php/auth.php?action=session');
        const data = await response.json();
        if (data.success) {
            currentUser = data.user;
            role = data.role;
            showDashboard();
        }
    } catch (err) {
        console.log('No session');
    }
}

function showDashboard() {
    document.getElementById('auth-form').style.display = 'none';
    let dashboardHtml = `
        <div class="dashboard">
            <a href="#" class="logout" onclick="logout()">Déconnexion</a>
            <h2>Bienvenue ${currentUser.username} (${role.toUpperCase()})</h2>
            <div id="role-content"></div>
        </div>
    `;
    document.querySelector('.container').innerHTML = dashboardHtml;
    
    loadRoleContent();
    initNotifications();
}

async function loadRoleContent() {
    const content = document.getElementById('role-content');
    let apiUrl = '';
    
    if (role === 'patient') {
        apiUrl = 'php/api/appointments.php?action=list&user_id=' + currentUser.id;
        content.innerHTML = `
            <div class="card">
                <h3>📅 Mes Rendez-vous</h3>
                <div id="appointments-list"></div>
                <button onclick="showBookForm()">Nouveau RDV</button>
            </div>
            <div class="card">
                <h3>📝 Réclamations</h3>
                <textarea id="claimDesc" placeholder="Décrivez votre réclamation..."></textarea>
                <button onclick="submitClaim()">Envoyer</button>
                <div id="claims-list"></div>
            </div>
        `;
        loadAppointments();
        loadClaims();
    } else if (role === 'doctor') {
        // Doctor content
        content.innerHTML = `
            <div class="card">
                <h3>📅 Mes Disponibilités</h3>
                <input type="date" id="availDate">
                <input type="time" id="availTime">
                <button onclick="addAvailability()">Ajouter</button>
                <div id="avail-list"></div>
            </div>
            <div class="card">
                <h3>👥 Rendez-vous</h3>
                <div id="doctor-appts"></div>
            </div>
        `;
        loadAvailabilities();
        loadDoctorAppts();
    } else if (role === 'admin') {
        // Admin content
        content.innerHTML = `
            <div class="card">
                <h3>👥 Gestion Comptes</h3>
                <div id="users-list"></div>
            </div>
            <div class="card">
                <h3>📊 Statistiques</h3>
                <div id="stats"></div>
            </div>
        `;
        loadUsers();
        loadStats();
    }
}

async function logout() {
    await fetch('php/auth.php', { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
    location.reload();
}

async function initNotifications() {
    // Poll for notifications every 30s
    setInterval(loadNotifications, 30000);
    loadNotifications();
}

async function loadNotifications() {
    try {
        const res = await fetch(`php/api/notifications.php?action=list&user_id=${currentUser.id}`);
        const notifs = await res.json();
        // Display in UI (simplified)
        console.log('Notifications:', notifs);
    } catch (err) {}
}

// Patient functions
async function loadAppointments() {
    const res = await fetch(`php/api/appointments.php?action=list&patient_id=${currentUser.id}`);
    const appts = await res.json();
    document.getElementById('appointments-list').innerHTML = appts.map(a => 
        `<div>${a.doctor_username} - ${a.date} ${a.time} (${a.status})</div>`
    ).join('');
}

function showBookForm() {
    const form = `
        <input type="date" id="bookDate">
        <input type="time" id="bookTime">
        <select id="doctorSelect"></select>
        <button onclick="bookAppointment()">Réserver</button>
    `;
    document.getElementById('appointments-list').innerHTML += form;
    loadDoctorsForSelect();
}

async function bookAppointment() {
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const doctor_id = document.getElementById('doctorSelect').value;
    
    await fetch('php/api/appointments.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'create', patient_id: currentUser.id, doctor_id, date, time})
    });
    loadAppointments();
}

async function submitClaim() {
    const desc = document.getElementById('claimDesc').value;
    await fetch('php/api/claims.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'create', user_id: currentUser.id, description: desc})
    });
    loadClaims();
}

async function loadClaims() {
    const res = await fetch(`php/api/claims.php?action=list&user_id=${currentUser.id}`);
    const claims = await res.json();
    document.getElementById('claims-list').innerHTML = claims.map(c => 
        `<div class="notification">${c.description} (${c.status})</div>`
    ).join('');
}

// Doctor functions
async function addAvailability() {
    const date = document.getElementById('availDate').value;
    const time = document.getElementById('availTime').value;
    await fetch('php/api/availabilities.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'create', doctor_id: currentUser.id, date, time})
    });
    loadAvailabilities();
}

async function loadAvailabilities() {
    // Implement similar to appointments
}

async function loadDoctorAppts() {
    // Load appts where doctor_id = currentUser.id
}

// Admin functions
async function loadUsers() {
    // Load all users table
}

async function loadStats() {
    // Stats summary
}

async function loadDoctorsForSelect() {
    const res = await fetch('php/api/users.php?action=list_doctors');
    const doctors = await res.json();
    const select = document.getElementById('doctorSelect');
    select.innerHTML = doctors.map(d => `<option value="${d.id}">${d.username} (${d.specialty})</option>`).join('');
}
