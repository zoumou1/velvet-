/* ============================================
   VELVET — Social Popup Buttons
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.social-float__toggle');
    const items = document.querySelector('.social-float__items');

    if (toggle && items) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            items.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.social-float')) {
                toggle.classList.remove('active');
                items.classList.remove('open');
            }
        });
    }
});
