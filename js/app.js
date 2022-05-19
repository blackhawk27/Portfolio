/* --------------- Grab elements from DOM --------------- */

const header = document.querySelector("header");



function updateCount(num, maxNum){
    let currentNum = +num.innerText;


    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12)
    }
}

/* --------------- Animations --------------- */

const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -500px 0px"
};

const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
    function(entries, appearOnScroll){
        entries.forEach(entry =>{
            if(!entry.isIntersecting)
            return;
            else{
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        })
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

/* --------------- Sticky Navbar --------------- */

function stickyNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0);

}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600 });
sr.reveal(".showcase-image", {origin: "top", delay: 700 });

/* --------------- Skills Progress Bar Animation --------------- */

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");




function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}


let skillsPlayed = false;


function skillsCounter(){

    if(!hasReached(first_skill)) return;

    skillsPlayed = true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);


        setTimeout(() => {
            updateCount(counter, target);
        }, 400);

    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );

}



/* --------------- Services Counter Animation --------------- */

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span")

let mlPlayed = false;

function mlCounter(){
    if(!hasReached(ml_section)) return;

    mlPlayed = true;

    ml_counters.forEach(ctr => {
        let target = +ctr.dataset.target;


        setTimeout(() => {
            updateCount(ctr, target)
        }, 400);

    });
}

/* --------------- Portfolio Filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: ".prt-card",
    },
    animation: {
        duration: 500,
    },
});

/* --------------- Modal Pop Up Animation Animation --------------- */

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

let currentIndex = 0;

zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
}));

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});


prev_btn.addEventListener("click", () => {
    if (currentIndex === 0){
        currentIndex = images.length-1;
    }
    else{
    currentIndex--;
    }
    changeImage(currentIndex);
    
});

next_btn.addEventListener("click", () => {
    if (currentIndex === images.length-1){
        currentIndex = 0;
    }
    else{
    currentIndex++;
    }
    changeImage(currentIndex);
    
});

function changeImage(index){
    images.forEach(img => img.classList.remove("showImage"));
    //console.log(images[i]);
    images[index].classList.add("showImage");
}

/* --------------- Swiper Animation --------------- */

const swiper = new Swiper('.swiper', {
    
    loop: true,
    speed: 500,
    autoplay: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    
    /* - to be added
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    */
  });

/* --------------- Change Active Link On Scroll --------------- */

const links = document.querySelectorAll(".nav-link");

function activeLink(){
    // tager kun sections med et id
    let sections = document.querySelectorAll("section[id]"); 

    // når vi scroller skal vi vide hvilken section vi er på, derved finder vi top positionen af hver section, relativt til vinduet.

    let passedSections = Array.from(sections).map((sct, i) => {
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight, 
            id: i,
        };
    }).filter((sct) => sct.y <= 0); 
    // .at(-1) giver sidste element af arrayet ved ikke hvorfor den siger at det er en fejl... virker tydeligvis i browser
    let currSectionID = passedSections.at(-1).id;

    //console.log(currSectionID);
    //console.log(links[currSectionID]);

    // sletter den tideligere sections active nav link
    links.forEach((l) => l.classList.remove("active"));

    // og tilføjer den til den nye section der er scrollet til
    links[currSectionID].classList.add("active");
    
}

activeLink();

/* --------------- Change Page Theme --------------- */

const toggle_btn = document.querySelector(".toggle-btn");

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        // idk hvorfor den ikke acceptere 1 og 0... det virker i browser...
        localStorage.setItem("dark", 1);
    }
    else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}


toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});

/* --------------- Open & Close Navbar Menu --------------- */





window.addEventListener("scroll", () => {
    activeLink();
    if(!skillsPlayed) skillsCounter();

    if(!mlPlayed) mlCounter();
});