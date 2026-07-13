// cuenta de stats - números //
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";

        let current = 0;
        // 80 frames es aproximadamente 1.3 segundos a 60fps
        const increment = target / 80; 

        const updateCounter = () => {
            current += increment;

            // Cambiamos la condición para asegurar suavidad hasta el final
            if (current < target) {
                counter.textContent =
                    prefix +
                    Math.round(current) + // Usamos round para que los números pequeños (como el 3) se actualicen bien
                    suffix;

                requestAnimationFrame(updateCounter);
            } else {
                // Aseguramos que el valor final sea exactamente el target
                counter.textContent = prefix + target + suffix;
            }
        };

        updateCounter();
        observer.unobserve(counter); // Deja de observar para que solo ocurra una vez
    });
}, {
    threshold: 0.5 // Se activa cuando el 50% de la sección es visible
});

counters.forEach(counter => observer.observe(counter));


/* =========================
   NAVBAR MOBILE
========================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
            document.body.style.overflow = "hidden";
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
            document.body.style.overflow = "";
        }

    });

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            document.body.style.overflow = "";

        });

    });

}

// videos //

const simCards = document.querySelectorAll(".sim-card");

simCards.forEach(card => {

    const video = card.querySelector(".sim-video");

    card.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});

// videos mobile //

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 430px)").matches;

  if (!isMobile) return;

  const videos = document.querySelectorAll(".sim-video");

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    // Intento inmediato
    tryPlay();

    // Backup: cuando entra en viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tryPlay();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(video);
  });
});



// esenciales de simulador //

const hotspots = document.querySelectorAll(".part-hotspot");
const popups = document.querySelectorAll(".part-popup");

hotspots.forEach((hotspot, index) => {

    hotspot.addEventListener("click", () => {

        const currentPopup = popups[index];

        if(currentPopup.classList.contains("active")){

            currentPopup.classList.remove("active");
            hotspot.classList.remove("active");

            return;
        }

        popups.forEach(popup => {
            popup.classList.remove("active");
        });

        hotspots.forEach(btn => {
            btn.classList.remove("active");
        });

        currentPopup.classList.add("active");
        hotspot.classList.add("active");

    });

});


// botones de aprendizaje //

const aprenderBtns = document.querySelectorAll(".aprender-toggle-btn");

aprenderBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const item = btn.closest(".aprender-item");
        const card = item.querySelector(".aprender-card");

        card.classList.toggle("active");
        btn.classList.toggle("active");

    });

});


// =========================
// TESTIMONIOS
// =========================

const testimonios = [

{
    quote: "CON APEX APRENDÍ QUE CON TRABAJO Y DEDICACIÓN, CUALQUIER OBJETIVO ESTÁ MÁS CERCA DE LO QUE PARECE.",
    author: "Santiago M., ex alumno y actual piloto de Fórmula 4"
},

{
    quote: "LA TELEMETRÍA Y EL ANÁLISIS ME PERMITIERON BAJAR SEGUNDOS POR VUELTA QUE NO SABÍA DE DÓNDE SACAR.",
    author: "Lucas G., piloto de simracing competitivo"
},

{
    quote: "APRENDÍ A ENTENDER EL AUTO, TOMAR MEJORES DECISIONES Y COMPETIR CON CONFIANZA.",
    author: "Tomás R., alumno Elite"
}

];


const quoteEl = document.querySelector(".testimonio-quote");
const authorEl = document.querySelector(".testimonio-author");

const prevBtn = document.querySelector(".arrow-left");
const nextBtn = document.querySelector(".arrow-right");

const dots = document.querySelectorAll(".dot");


let current = 0;
let autoplay;



// =========================
// RENDER
// =========================

function renderTestimonio(index, direction = "right"){


    // SALE EL ACTUAL

    quoteEl.style.transition =
        "opacity .35s ease, transform .35s ease";

    authorEl.style.transition =
        "opacity .35s ease, transform .35s ease";



    if(direction === "right"){

        quoteEl.style.transform = "translateX(-20px)";
        authorEl.style.transform = "translateX(-20px)";

    } else {

        quoteEl.style.transform = "translateX(20px)";
        authorEl.style.transform = "translateX(20px)";

    }


    quoteEl.style.opacity = "0";
    authorEl.style.opacity = "0";



    setTimeout(()=>{


        quoteEl.textContent =
            `"${testimonios[index].quote}"`;


        authorEl.textContent =
            `— ${testimonios[index].author}`;



        // ENTRA EL NUEVO DESDE EL LADO CONTRARIO

        quoteEl.style.transition = "none";
        authorEl.style.transition = "none";



        if(direction === "right"){

            quoteEl.style.transform = "translateX(20px)";
            authorEl.style.transform = "translateX(20px)";

        } else {

            quoteEl.style.transform = "translateX(-20px)";
            authorEl.style.transform = "translateX(-20px)";

        }



        requestAnimationFrame(()=>{


            quoteEl.style.transition =
                "opacity .45s ease, transform .45s ease";

            authorEl.style.transition =
                "opacity .45s ease, transform .45s ease";



            quoteEl.style.opacity = "1";
            authorEl.style.opacity = "1";


            quoteEl.style.transform = "translateX(0)";
            authorEl.style.transform = "translateX(0)";


        });



    },350);



    dots.forEach(dot =>
        dot.classList.remove("active")
    );


    dots[index].classList.add("active");


}



// =========================
// SIGUIENTE
// =========================

function nextTestimonio(){


    current++;


    if(current >= testimonios.length){

        current = 0;

    }


    renderTestimonio(current,"right");

}



// =========================
// ANTERIOR
// =========================

function prevTestimonio(){


    current--;


    if(current < 0){

        current = testimonios.length - 1;

    }


    renderTestimonio(current,"left");

}




// =========================
// FLECHAS
// =========================

nextBtn.addEventListener("click",()=>{


    nextTestimonio();

    restartAutoplay();


});


prevBtn.addEventListener("click",()=>{


    prevTestimonio();

    restartAutoplay();


});




// =========================
// DOTS
// =========================

dots.forEach(dot=>{


    dot.addEventListener("click",()=>{


        const newIndex = Number(dot.dataset.index);


        if(newIndex === current) return;



        const direction =
            newIndex > current
                ? "right"
                : "left";



        current = newIndex;


        renderTestimonio(current,direction);


        restartAutoplay();


    });


});




// =========================
// AUTOPLAY
// =========================

function startAutoplay(){


    autoplay = setInterval(()=>{


        nextTestimonio();


    },6000);


}



function restartAutoplay(){


    clearInterval(autoplay);


    startAutoplay();


}


// =========================
// SWIPE MOBILE
// =========================

let touchStartX = 0;
let touchEndX = 0;


const swipeArea = document.querySelector(".testimonio-content");



if(swipeArea){


    swipeArea.addEventListener("touchstart",(e)=>{


        touchStartX = e.changedTouches[0].screenX;


    },{passive:true});



    swipeArea.addEventListener("touchend",(e)=>{


        touchEndX = e.changedTouches[0].screenX;


        handleSwipe();


    },{passive:true});


}



function handleSwipe(){


    const distance = touchEndX - touchStartX;



    if(Math.abs(distance) < 50) return;



    if(distance < 0){


        nextTestimonio();


    } else {


        prevTestimonio();


    }


    restartAutoplay();


}




// =========================
// INICIALIZAR
// =========================

quoteEl.textContent =
    `"${testimonios[0].quote}"`;


authorEl.textContent =
    `— ${testimonios[0].author}`;


startAutoplay();



// =========================
// METODO APEX
// =========================

const apexWrapper = document.querySelector(".apex-scroll-wrapper");
const apexItems = document.querySelectorAll(".method-item");
const apexImage = document.getElementById("apexGraphic");

const apexImages = [
    "imagenes/tutoria 2.jpg",
    "imagenes/cockpit 2.jpg",
    "imagenes/analisis 2.jpg",
    "imagenes/juntos 4.jpg"
];

let currentStep = 0;
let isLocked = false;

function activateStep(step){

    apexItems.forEach(item => {
        item.classList.remove("active");
    });

    apexItems[step].classList.add("active");

    apexImage.style.opacity = "0";

    setTimeout(() => {

        apexImage.src = apexImages[step];

        apexImage.onload = () => {
            apexImage.style.opacity = "1";
        };

    }, 200);

}

window.addEventListener("wheel", (e) => {

    const rect = apexWrapper.getBoundingClientRect();

    const sectionVisible =
        rect.top <= 100 &&
        rect.bottom >= window.innerHeight - 100;

    if(!sectionVisible) return;

    if(isLocked) return;

    if(e.deltaY > 0){

        if(currentStep < apexItems.length - 1){

            e.preventDefault();

            isLocked = true;

            currentStep++;

            activateStep(currentStep);

            setTimeout(() => {
                isLocked = false;
            }, 700);

        }

    } else {

        if(currentStep > 0){

            e.preventDefault();

            isLocked = true;

            currentStep--;

            activateStep(currentStep);

            setTimeout(() => {
                isLocked = false;
            }, 700);

        }

    }

}, { passive: false });

activateStep(0);


// PORCENTAJES

const porcentajeCards = document.querySelectorAll(".porcentaje-card");

const porcentajeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            porcentajeObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: .3
});

porcentajeCards.forEach(card => {
    porcentajeObserver.observe(card);
});

