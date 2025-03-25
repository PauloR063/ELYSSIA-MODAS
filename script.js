document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function mudarSlide() {
        slides[index].classList.remove("ativo");
        index = (index + 1) % slides.length;
        slides[index].classList.add("ativo");
    }

    setInterval(mudarSlide, 3000); // Troca a cada 3 segundos
});

