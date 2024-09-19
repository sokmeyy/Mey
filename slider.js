document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.slide');
    
    let currentIndex = 0;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function goToNextSlide() {
        goToSlide(currentIndex + 1);
    }

    function goToPrevSlide() {
        goToSlide(currentIndex - 1);
    }

    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);

    // Auto-play functionality
    setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
});