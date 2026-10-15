var display = document.querySelector('#display h3');
var minutos = document.getElementById('minutos');
var segundos = document.getElementById('segundos');
var comecar = document.getElementById('comecar');
var sound = document.getElementById('sound');

var minutoAtual;
var segundoAtual;
var interval;

// Preenche os selects de minutos e segundos
for (var i = 0; i <= 59; i++) {
    minutos.innerHTML += '<option value="' + i + '">' + i + '</option>';
    segundos.innerHTML += '<option value="' + i + '">' + i + '</option>';
}

function atualizarDisplay() {
    display.textContent =
        String(minutoAtual).padStart(2, '0') + ':' +
        String(segundoAtual).padStart(2, '0');
}

comecar.addEventListener('click', function () {
    // Evita iniciar vários intervalos
    clearInterval(interval);

    minutoAtual = Number(minutos.value);
    segundoAtual = Number(segundos.value);

    // Se o tempo for zero, não inicia
    if (minutoAtual === 0 && segundoAtual === 0) {
        display.textContent = '00:00';
        return;
    }

    comecar.disabled = true;
    atualizarDisplay();

    interval = setInterval(function () {
        if (segundoAtual > 0) {
            segundoAtual--;
        } else if (minutoAtual > 0) {
            minutoAtual--;
            segundoAtual = 59;
        } else {
        clearInterval(interval);
        comecar.disabled = false;

        display.textContent = '00:00';

        sound.currentTime = 0;

        sound.play().catch(function (erro) {
            console.log('Erro ao tocar o áudio:', erro);
        });

        alert('Desligar Alarme');
        return;
    }

        atualizarDisplay();
    }, 1000);
});
