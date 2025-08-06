document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playHereButton');
    const rouletteWheel = document.getElementById('ruletaAnimada');

    let isSpinning = false;
    let currentRotation = 0;
    let oticCount = 0;

    playButton.addEventListener('click', function () {
        if (!isSpinning) {
            isSpinning = true;
            playButton.disabled = true;

            const numberOfPrizes = 8;
            const segmentAngle = 360 / numberOfPrizes;

            const randomPrizeIndex = Math.floor(Math.random() * numberOfPrizes);
            const prizeAngle = (randomPrizeIndex * segmentAngle) + (segmentAngle / 2);
            const additionalRotation = 1300 + (360 - prizeAngle);
            currentRotation += additionalRotation;

            // Reset transition
            rouletteWheel.style.transition = 'none';
            setTimeout(() => {
                rouletteWheel.style.transition = 'transform 4s ease-out';
                rouletteWheel.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            }, 50);

            rouletteWheel.addEventListener('transitionend', () => {
                isSpinning = false;
                playButton.disabled = false;

                const normalizedRotation = currentRotation % 360;
                const pointerAngle = 360 - normalizedRotation;

                // Ajuste por puntero apuntando a 180°
                let correctedAngle = (pointerAngle + 22.5 - 180 + 360) % 360;

                const segmentIndex = Math.floor(correctedAngle / 45);

                const prizeElements = document.querySelectorAll('.prize-text span');
                const selectedPrizeText = prizeElements[segmentIndex].innerText.replace(/\s+/g, ' ').trim().toUpperCase();

                console.log("Premio visible:", selectedPrizeText);

                if (selectedPrizeText.includes("PREMIO OTIC")) {
                    oticCount++;
                    console.log("OTIC ha salido:", oticCount, "veces");

                    if (oticCount >= 21) {
                        const oticElement = document.querySelector('.prize-text.prize-1 span');
                        if (oticElement) {
                            oticElement.textContent = "SIGA\nPARTICIPANDO";
                            oticElement.style.fontSize = "2vw";
                            oticElement.style.textAlign = "center";
                            console.log("PREMIO OTIC cambiado a SIGA PARTICIPANDO");
                        }
                    }
                }
            }, { once: true }); // esto asegura que no se acumulen múltiples listeners
        }
    });
});
