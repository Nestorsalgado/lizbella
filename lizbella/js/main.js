/* ==========================================================================
   Liz-Bella - JavaScript principal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('¡Gracias! Te contactaremos pronto.');
            form.reset();
        });
    }

    // Botón "volver arriba": aparece al bajar y vuelve al inicio al hacer clic
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        const toggleBackToTop = function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
