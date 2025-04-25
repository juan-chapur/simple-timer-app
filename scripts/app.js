// scripts/app.js

let timers = [];

// Cargar temporizadores desde localStorage al iniciar
window.onload = () => {
    const savedTimers = localStorage.getItem('timers');
    if (savedTimers) {
        timers = JSON.parse(savedTimers);
        renderTimers();
    }
};

function saveTimers() {
    localStorage.setItem('timers', JSON.stringify(timers));
}

function addTimer() {
    const timerName = prompt("Ingrese el nombre del temporizador:");
    if (!timerName) return;

    const timer = {
        name: timerName,
        minutes: 0,
        seconds: 0,
        initialMinutes: 0, // Tiempo inicial
        initialSeconds: 0, // Tiempo inicial
        intervalId: null,
        finished: false,
        announceIntervalId: null // Nuevo: para manejar el intervalo de anuncio
    };

    timers.push(timer);
    saveTimers(); // Guardar en localStorage
    renderTimers();
}

function renderTimers() {
    const timerContainer = document.getElementById('timers-container');
    timerContainer.innerHTML = '';

    timers.forEach((timer, index) => {
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';

        const nameElement = document.createElement('span');
        nameElement.textContent = timer.name;

        const timeElement = document.createElement('span');
        timeElement.className = 'time-display';
        timeElement.textContent = formatTime(timer.minutes, timer.seconds);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => adjustTimer(index, 1);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => adjustTimer(index, -1);

        const startButton = document.createElement('button');
        startButton.textContent = 'Iniciar';
        startButton.onclick = () => startTimer(index);

        const deleteButton = document.createElement('button'); // Botón de eliminar
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTimer(index);

        timerElement.appendChild(nameElement);
        timerElement.appendChild(timeElement);
        timerElement.appendChild(increaseButton);
        timerElement.appendChild(decreaseButton);
        timerElement.appendChild(startButton);
        timerElement.appendChild(deleteButton);

        if (timer.finished) {
            const stopButton = document.createElement('button');
            stopButton.textContent = 'Stop';
            stopButton.className = 'stop-btn';
            stopButton.onclick = () => stopAnnouncement(index);
            timerElement.appendChild(stopButton);
        }

        timerContainer.appendChild(timerElement);
    });
}

function adjustTimer(index, change) {
    const timer = timers[index];
    timer.minutes = Math.max(0, timer.minutes + change);
    timer.seconds = 0; // Reinicia los segundos al ajustar los minutos
    timer.initialMinutes = timer.minutes; // Actualiza el tiempo inicial
    timer.initialSeconds = timer.seconds;
    saveTimers(); // Guardar en localStorage
    renderTimers();
}

function startTimer(index) {
    const timer = timers[index];
    if (timer.intervalId) return;

    timer.finished = false;
    timer.initialMinutes = timer.minutes; // Guarda el tiempo inicial al iniciar
    timer.initialSeconds = timer.seconds;

    timer.intervalId = setInterval(() => {
        if (timer.minutes > 0 || timer.seconds > 0) {
            if (timer.seconds === 0) {
                timer.minutes--;
                timer.seconds = 59;
            } else {
                timer.seconds--;
            }
        } else {
            clearInterval(timer.intervalId);
            timer.intervalId = null;
            timer.finished = true;
            announceTimerFinished(index);
        }
        saveTimers(); // Guardar en localStorage
        renderTimers();
    }, 1000);
}

function announceTimerFinished(index) {
    const timer = timers[index];
    timer.announceIntervalId = setInterval(() => {
        const utterance = new SpeechSynthesisUtterance(`Listo ${timer.name}`);
        speechSynthesis.speak(utterance);
    }, 3000); // Repite el anuncio cada 3 segundos
    renderTimers(); // Actualiza la interfaz para mostrar el botón "Stop"
}

function stopAnnouncement(index) {
    const timer = timers[index];
    if (timer.announceIntervalId) {
        clearInterval(timer.announceIntervalId); // Detiene el intervalo de anuncio
        timer.announceIntervalId = null; // Limpia el ID del intervalo
    }
    speechSynthesis.cancel(); // Limpia la cola de mensajes pendientes

    // Restaurar el tiempo inicial
    timer.minutes = timer.initialMinutes;
    timer.seconds = timer.initialSeconds;
    timer.finished = false;

    saveTimers(); // Guardar en localStorage
    renderTimers(); // Actualiza la interfaz para reflejar el cambio
}

function deleteTimer(index) {
    const timer = timers[index];

    // Detener el intervalo de cuenta regresiva si está activo
    if (timer.intervalId) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
    }

    // Detener el intervalo de anuncio si está activo
    if (timer.announceIntervalId) {
        clearInterval(timer.announceIntervalId);
        timer.announceIntervalId = null;
    }

    // Cancelar cualquier mensaje pendiente en la cola de speechSynthesis
    speechSynthesis.cancel();

    // Eliminar el temporizador del arreglo
    timers.splice(index, 1);

    saveTimers(); // Guardar en localStorage
    renderTimers();
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('add-timer').onclick = addTimer;