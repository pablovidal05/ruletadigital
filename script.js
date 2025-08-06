document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playHereButton');
    const rouletteWheel = document.getElementById('ruletaAnimada');

    let isSpinning = false;
    let currentRotation = 0;
    let oticCount = parseInt(localStorage.getItem('oticCount')) || 0;
    const replacedSegments = JSON.parse(localStorage.getItem('replacedSegments')) || [];

    // Restaurar textos si ya fueron cambiados antes
    const prizeElements = document.querySelectorAll('.prize-text span');
    replacedSegments.forEach(index => {
        if (prizeElements[index]) {
            prizeElements[index].innerText = "SIGA PARTICIPANDO";
            prizeElements[index].style.fontSize = "2vw";
            prizeElements[index].style.textAlign = "center";
        }
    });

    playButton.addEventListener('click', function () {
        if (!isSpinning) {
            isSpinning = true;
            playButton.disabled = true;

            const numberOfPrizes = 8;
            const segmentAngle = 360 / numberOfPrizes;
            const randomPrizeIndex = Math.floor(Math.random() * numberOfPrizes);
            const centerAngle = (randomPrizeIndex * segmentAngle) + (segmentAngle / 2);
            const pointerDirection = 270;
            const normalizedRotation = currentRotation % 360;
            const neededNormalized = (pointerDirection - centerAngle + 360) % 360;
            const delta = (neededNormalized - normalizedRotation + 360) % 360;
            const spins = 6;
            currentRotation += (spins * 360) + delta;

            // Iniciar animación
            rouletteWheel.style.transition = 'none';
            setTimeout(() => {
                rouletteWheel.style.transition = 'transform 4s ease-out';
                rouletteWheel.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            }, 50);

            rouletteWheel.addEventListener('transitionend', () => {
                isSpinning = false;
                playButton.disabled = false;

                const finalNormalized = currentRotation % 360;
                const angleAtPointer = (pointerDirection - finalNormalized + 360) % 360;
                const segmentIndex = Math.floor(angleAtPointer / segmentAngle);

                const selectedPrizeText = prizeElements[segmentIndex].innerText
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toUpperCase();

                console.log("Premio visible:", selectedPrizeText);

                if (selectedPrizeText === "PREMIO OTIC") {
                    oticCount++;
                    localStorage.setItem('oticCount', oticCount);
                }

                if (oticCount >= 21 && !replacedSegments.includes(segmentIndex)) {
                    // Cambiar texto y estilo
                    prizeElements[segmentIndex].innerText = "SIGA PARTICIPANDO";
                    prizeElements[segmentIndex].style.fontSize = "2vw";
                    prizeElements[segmentIndex].style.textAlign = "center";

                    // Guardar segmento reemplazado
                    replacedSegments.push(segmentIndex);
                    localStorage.setItem('replacedSegments', JSON.stringify(replacedSegments));
                }

            }, { once: true });
        }
    });
});
