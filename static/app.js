function updateStatus() {
    fetch('/status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('altitude').textContent = data.altitude;
            document.getElementById('speed').textContent = data.speed;
            document.getElementById('position').textContent = `(${data.position[0]}, ${data.position[1]})`;
            document.getElementById('battery-level').textContent = data.battery_level;
        });
}

document.getElementById('set-altitude-btn').addEventListener('click', () => {
    const altitude = document.getElementById('altitude-input').value;
    fetch('/altitude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ altitude: Number(altitude) })
    })
    .then(response => response.json())
    .then(data => updateStatus());
});

document.getElementById('set-speed-btn').addEventListener('click', () => {
    const speed = document.getElementById('speed-input').value;
    fetch('/speed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speed: Number(speed) })
    })
    .then(response => response.json())
    .then(data => updateStatus());
});

document.getElementById('set-position-btn').addEventListener('click', () => {
    const position = document.getElementById('position-input').value.split(',');
    const x = Number(position[0].trim());
    const y = Number(position[1].trim());
    fetch('/position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: [x, y] })
    })
    .then(response => response.json())
    .then(data => updateStatus());
});

document.getElementById('takeoff-btn').addEventListener('click', () => {
    fetch('/takeoff', { method: 'POST' })
        .then(response => response.json())
        .then(data => updateStatus());
});

document.getElementById('patrol-btn').addEventListener('click', () => {
    fetch('/patrol', { method: 'POST' })
        .then(response => response.json())
        .then(data => updateStatus());
});

document.getElementById('land-btn').addEventListener('click', () => {
    fetch('/land', { method: 'POST' })
        .then(response => response.json())
        .then(data => updateStatus());
});

document.getElementById('return-btn').addEventListener('click', () => {
    fetch('/return_to_base', { method: 'POST' })
        .then(response => response.json())
        .then(data => updateStatus());
});

updateStatus();
