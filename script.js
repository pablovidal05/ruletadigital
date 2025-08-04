// Esperamos a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtenemos los elementos del DOM
    const playButton = document.getElementById('playHereButton');
    const rouletteWheel = document.getElementById('ruletaAnimada');
    
    // Variable para controlar si la ruleta está girando
    let isSpinning = false;

    // Variable para guardar la rotación total y que los giros se sumen
    let currentRotation = 0;
    
    // Función que se ejecuta al hacer clic en el botón
    playButton.addEventListener('click', function() {
        if (!isSpinning) {
            // Desactivamos el botón para evitar clics múltiples
            isSpinning = true;
            playButton.disabled = true;
            
            // --- INICIO DE LA LÓGICA PARA EL GIRO ALEATORIO ---
            // 1. Número de premios
            const numberOfPrizes = 8;
            
            // 2. Ángulo de cada segmento (360 grados / 8 premios = 45 grados)
            const segmentAngle = 360 / numberOfPrizes;
            
            // 3. Elegimos un premio aleatorio (número entre 0 y 7)
            const randomPrizeIndex = Math.floor(Math.random() * numberOfPrizes);
            
            // 4. Calculamos el ángulo para que el puntero caiga en el centro del premio
            // Restamos la mitad del ángulo del segmento (22.5 grados) para centrarlo
            const prizeAngle = (randomPrizeIndex * segmentAngle) + (segmentAngle / 2);
            
            // 5. Añadimos giros adicionales (5 vueltas completas) para que la ruleta parezca que da varias vueltas
            // Esto se suma a la rotación actual para que cada giro parta desde donde terminó el anterior
            const additionalRotation = 1800 + (360 - prizeAngle);

            // 6. Actualizamos la rotación total
            currentRotation += additionalRotation;
            
            // 7. Eliminamos la transición actual para que no haya conflicto
            rouletteWheel.style.transition = 'none';

            // 8. Usamos un pequeño retraso para asegurar que el navegador registre el cambio
            // antes de aplicar la nueva transición y el transform
            setTimeout(() => {
                rouletteWheel.style.transition = 'transform 4s ease-out';
                rouletteWheel.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            }, 50);

            // --- FIN DE LA LÓGICA PARA EL GIRO ALEATORIO ---
            
            // Esperamos a que la transición termine
            rouletteWheel.addEventListener('transitionend', () => {
                isSpinning = false;
                playButton.disabled = false;
                
                // Reiniciamos la transición para que el siguiente giro sea "limpio"
                rouletteWheel.style.transition = 'none';

            }, { once: true }); // Usamos { once: true } para que el evento se ejecute una sola vez
        }
    });
});