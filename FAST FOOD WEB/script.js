// Pura page load hone ke baad iske andar ka code chalega ("ready state")
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LENIS SMOOTH SCROLL (Apple - Awwwards Jaisa Scrolling Effect)
    // ==========================================
    // Yeh scroll ke jhatkon ko rok ke smooth (makhan-jaisa) slide chalata hai
    const lenis = new Lenis({
        duration: 1.2, // Kitta delay kr k ruke mouse ghumne k badh
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Maths calculation smooth fade k lyi
        smooth: true,
        smoothTouch: false, // Phone k chote scroll pe theek rhe native 
    });

    // Har frame render hoti reh is lie function lagaya (requestAnimationFrame)
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger plugin ko Lenis k smooth system k saTh link kr raha hi
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0); // Lag nhi marn chahiye 

    // ==========================================
    // 2. PRE-LOADER SPLASH SCREEN ("0% to 100%" Loading vala black page)
    // ==========================================
    let progress = 0;
    const progressEl = document.querySelector('.loader-progress');
    
    // Ek random interval lagai jo percent count karegi
    const loaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5; // Fake load hoti dikh rahi h number badhti
        if (progress > 100) progress = 100;
        progressEl.innerText = progress + '%';
        
        if (progress === 100) {
            clearInterval(loaderInterval); // 100 pohuche tou rok do 
            finishLoading(); // Parda kholne vala function run kar do
        }
    }, 150);

    // Loader hat-te wakht hero page k text aate hy slide se unki setting
    function finishLoading() {
        const tl = gsap.timeline(); // multiple animation chalane ka tarika tl
        // Sabse pehele Black load bar slide hoke uper gaya (-100% y)
        tl.to("#loader", { yPercent: -100, duration: 1.2, ease: "power4.inOut", delay: 0.2 })
          
          // Fir the THE STREET wale sabd uper aana shuru hue
          .from(".split-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=0.6")
          
          // Uske baad Burger rubber bend elastic bounce mar k center mei prkat huva 
          .from(".hero-burger", { scale: 0.1, rotation: -90, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=1")
          
          // Baki chhote tex (subtile) fade hoker aa gye
          .from(".fade-up", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=1.2");
        
        // Pura show bn jane k bddh , ab burger continously halke hawel me tairne (Float) karega repeat infinite 
        gsap.to(".hero-burger", {
            y: -40, rotation: 3, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5
        });
    }

    // ==========================================
    // 3. HAMBURGER FULL-SCREEN MENU (Khulne Wala Dark Navbar Overlay)
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.full-nav a');

    // Menu khulne pe ye chalega
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active'); // active p CSS height fix set kia 
        lenis.stop(); // Background (piche k scroll ko block kardo freeze krna tha yhe p professional look liye)
    });

    // Cross pe back cut krney ki setting
    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        lenis.start(); // Resumes scrolling wapis continue hogi scroll tab 
    });

    // Menu Andra links p click hotae hi us link p phuchengey aur panel close krdo.
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            lenis.start();
        });
    });

    // ==========================================
    // 4. GSAP SCROLL ANIMATIONS (Mousw wheel Scroll krna Par jo action huta unki JS)
    // ==========================================
    
    // Background k colour change hone wall timeline jaise "marquee" aya wahi badla.
    ScrollTrigger.create({
        trigger: ".marquee-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => document.querySelector(".scroll-bg").style.backgroundColor = "#0e0600", // Dark Brown/orange
        onLeaveBack: () => document.querySelector(".scroll-bg").style.backgroundColor = "#050505", // Waps Default Black  
        onEnterBack: () => document.querySelector(".scroll-bg").style.backgroundColor = "#0e0600",
        onLeave: () => document.querySelector(".scroll-bg").style.backgroundColor = "#000000" // Pitch black p girna
    });

    // Bada Burger nichay scroll karte waqht chota or roate or transpernt hoga "Scrub" effect ka istemal
    gsap.to(".hero-burger-wrapper", {
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 }, // scrub:1.5= scroll krne par mouse k sahth khelega
        yPercent: 80, scale: 0.6, rotation: 45, opacity: 0
    });

    // Jo random cheze asman se giyr rhe hy jse "noodles-fall" unki setting 
    gsap.to(".noodles-fall", {
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 2.5 },
        top: "120%", left: "60%", rotation: 220, ease: "none" // Uper se le kr pta nhi niche bottom tak rotate kre ga
    });

    gsap.to(".momos-fall", {
        scrollTrigger: { trigger: ".marquee-section", start: "top bottom", end: "bottom top", scrub: 1.5 },
        top: "120%", right: "80%", rotation: -200, scale: 1.5, ease: "none"
    });

    gsap.to(".roll-fall", {
        scrollTrigger: { trigger: ".vibe-section", start: "top bottom", end: "bottom top", scrub: 1 },
        bottom: "80%", left: "5%", rotation: 90, scale: 1.2, ease: "none"
    });

    // Vibe Secxtion wale Drift Word (Jisme Right And Left bhaag ra hi shabd un ki timeline set ki h)
    const vibeTextTl = gsap.timeline({
        scrollTrigger: { trigger: ".vibe-section", start: "top bottom", end: "bottom top", scrub: 1 }
    });

    vibeTextTl.fromTo(".drift-left",  { x: "20%" }, { x: "-30%" }, 0) // Ye ek shabd ko left move kree raha h
              .fromTo(".drift-right", { x: "-20%" }, { x: "30%" }, 0) // Ye ulta right direction mein bhej rai h shabd 
              .to(".pulse", { scale: 1.1 }, 0); // "FLAVOR" bada huva aage ataaa

    // ==========================================
    // 5. CAZARD SWIPER (3D Coverflow) & VANILLA TILT
    // ==========================================
    
    // Wo menu cards ko aasan banane k lie flat 'slide' effect pe badla gaya taaki sab clearly dikhe 
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30, // Cards ke beech free space de diya hai
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false }
    });

    // Vanilla tilt (Hover mouse karni m Cards move hotey uskay javascript controlr setup)
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 8, // Sirf 8 degree muuden ge , zada kia to azeeb ho jata
        speed: 500,
        glare: true, // kaanch (Glass) ki jhkak (chamakne )ki patti daal dyi 
        "max-glare": 0.15,
        perspective: 1200
    });

    // ==========================================
    // 6. WHATSAPP AOUT-MESSAGE API (FORM SUBMISSION FOOTER)
    // ==========================================
    const contactForm = document.getElementById('contactForm'); // Us "form" ki Id pakdi huvey 
    
    if (contactForm) {
        // Jab Submit ("Enter game") dabata hei user 
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Default Page refresh reload ka behavior rok dete takki blank page na aye.
            
            // Name wala dabbe ki 'value' store lli JS file variables may
            const name = document.getElementById('name').value;
            // Phone numb wala box se number uthaya 
            const phone = document.getElementById('phone').value;
            
            // Bhai ka Original apna contact whatsappnumber idhr hardcode kiya hei "Country Code + Whatsapp" ke sat (91 + 8381975388)
            const whatsappNumber = '918381975388';
            
            // Ek beautiful pre-filled readymade message ka blueprint framework design kra , line change ka space (%0A) he ismey HTML encode format vali format 
            const message = `🔥 *VANSH FAST FOOD - NEW ORDER/INQUIRY* 🔥%0A%0A*Name:* ${name}%0A*Contact Number:* ${phone}%0A%0A_Awaiting Response!_`;
            
            // Actual API calling system direct URL se bhej dega web WhatsApp mein. Text jodh kar parameter pass kardi function link p.
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Us link ko "_blank" maayne ki nyi nayi choti Window ya Mobile watsapp Application khul kr vhi dikah dega window pop ho jye gyi , default pe nahi rehta 
            window.open(whatsappURL, '_blank');
            
            // Msg jatey he Puraana daala huwa input Box reset khali zero saaf kar dia fresh dubara daalnyay form bharnay ko 
            contactForm.reset();
        });
    }

});
