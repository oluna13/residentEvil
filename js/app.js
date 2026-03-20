// Registramos el plugin necesario
gsap.registerPlugin(ScrollTrigger);


// Verificamos si los elementos existen en la página para no generar errores
if (document.querySelector(".umbrella-hero-revealer") && document.querySelector(".umbrella-sierra-logo")) {

    // Creamos la línea de tiempo maestra con pin y scrub
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".umbrella-hero-revealer", // El contenedor que activa la animación
            start: "top top",          // Comienza cuando la parte superior de la sección toca el tope de la pantalla
            end: "+=2500",             // La animación dura 2500px de scroll (ajusta si quieres que sea más largo/lento)
            pin: true,                 // FIJA la sección en pantalla mientras ocurre la animación
            scrub: 1                   // Suaviza la animación para que siga el movimiento del scroll
        }
    });


    // --- LA ANIMACIÓN DE REVELACIÓN (CORTINA / SIERRA) ---

    // 1. Efecto "Arranque" (Un pequeño temblor/flicker para simular que el motor de la sierra arranca)
    tl.to(".umbrella-sierra-logo", {
        duration: 0.05,
        opacity: 0.7,
        scale: 1.1, // Da un pequeño brinco
        repeat: 4,  // Parpadea/tiembla 4 veces rápido
        yoyo: true,
        ease: "power2.inOut"
    }, 0); // Empieza en el segundo 0 de la línea de tiempo

    // 2. El Giro de Sierra y Desvanecimiento al Fondo
    // Aquí es donde sucede la magia: el logo gira muy rápido y se "hunde" en la pantalla
    tl.to(".umbrella-sierra-logo", {
        duration: 1.5,             // Toma una buena porción de la línea de tiempo
        rotationZ: 2160,           // Gira 6 veces (360 * 4 = 1440, +720 = 2160) rápidamente
        scale: 0.1,                // Se hace extremadamente pequeño como si perforara hacia el fondo
        opacity: 0,                // Desaparece por completo
        ease: "power3.in"          // Acelera la rotación a medida que avanzas el scroll (el efecto sierra)
    }, 0.1); // Empieza justo después del "arranque"

    // 3. Desvanecer el texto "UMBRELLA CORPORATION"
    tl.to(".umbrella-text-bottom", {
        duration: 0.8,
        opacity: 0,
        y: 100,                     // Se desliza hacia abajo mientras desaparece
        ease: "power1.inOut"
    }, 0.3); // Empieza un poco después que el giro

    // 4. Revelar suavemente la sección de abajo (Las tarjetas)
    // Hacemos que la siguiente sección que estaba oculta con opacity: 0 en CSS, aparezca
    tl.to(".seccion-siguiente", {
        duration: .5,
        opacity: 1,
        ease: "power1.out"
    }, 1); // Empieza a la mitad de la animación del logo (segundo 1 de 2.5 aprox)

    // 5. (Opcional but Recommended) Ocultar el contenedor de la cortina completamente al final
    // Esto es para que no bloquee los clicks en la siguiente sección una vez terminada la animación.
    tl.to(".curtain-container", {
        visibility: "hidden"
    }, 2.5); // Se oculta al final de toda la secuencia

} else {
    // Mensaje de advertencia si los elementos no se encuentran, para evitar errores silenciosos
    console.warn("GSAP: No se encontraron las clases .umbrella-hero-revealer o .umbrella-sierra-logo. Verifica tu HTML.");
}

if (document.querySelector(".seccion-siguiente") && document.querySelector(".card")) {

    // Creamos una línea de tiempo para esta sección
    let virusTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".seccion-siguiente", // Se activa cuando esta sección entra en vista
            start: "top 80%",              // Empieza cuando el top de la sección está al 80% de la pantalla
            end: "bottom center",           // Termina cuando el bottom llega al centro
            toggleActions: "play none none reverse", // Juega al entrar, reversa al salir
            // scrub: 1, // Descomenta esta línea si quieres que la animación siga el scroll del ratón
        }
    });

    // ==========================================
    // 1. APARECIDA "SALVAJE" DEL TÍTULO (IMPACTO + GLITCH)
    // ==========================================
    
    // Primero, un impacto fuerte: aparece de la nada, gigante y rojo, y se encoge de golpe
    virusTl.fromTo(".seccion-siguiente h2", 
        { 
            opacity: 0, 
            scale: 10,        // Empieza ENORME
            color: "#ff0000",  // Rojo puro sangre
            z: 1000,           // Viene desde muy al fondo (3D)
        }, 
        { 
            duration: 0.4, 
            opacity: 1, 
            scale: 1, 
            color: "#ffffff",  // Termina en blanco
            z: 0, 
            ease: "expo.out"   // Frenazo brusco y seco
        }
    );

    // Segundo, INMEDIATAMENTE después del impacto, un glitch agresivo de color y forma
    // Usamos un 'stagger' muy bajo para que parezca caótico
    virusTl.to(".seccion-siguiente h2", {
        duration: 0.03,        // Super rápido
        skewX: 40,             // Deformación horizontal violenta
        // Separación de colores RGB (Rojo y Cian)
        textShadow: "10px 0 #ff2233, -10px 0 #00ffff, 0 0 10px #fff", 
        repeat: 7,             // Parpadea/se deforma 7 veces
        yoyo: true,            // Va y viene
        ease: "none",
        // Al terminar, limpiamos los estilos para que se quede estático y blanco
        clearProps: "skewX,textShadow,transform" 
    }, "-=0.1");               // Empieza un pelín antes de que termine el impacto para mayor caos

    // Pequeño parpadeo final de "señal inestable"
    virusTl.to(".seccion-siguiente h2", {
        duration: 0.05,
        opacity: 0.3,
        repeat: 3,
        yoyo: true,
        ease: "none",
        clearProps: "opacity"
    }, "+=0.1"); // Una micra de segundo después del glitch fuerte

    // 2. Aparece y se mueve la LÍNEA DE ESCANEO
    virusTl.fromTo(".scan-line", 
        { top: "0%", opacity: 0 }, // Inicio: arriba e invisible
        { 
            duration: 1.2,          // Tiempo que tarda en bajar
            top: "100%",            // Final: abajo del todo
            opacity: 1,             // Se hace visible
            ease: "power1.inOut",   // Movimiento suave
            onComplete: function() { // Desaparece al terminar
                gsap.to(".scan-line", { opacity: 0, duration: 0.3 });
            }
        },
        "-=0.3" // Empieza un poco antes de que termine la animación del título
    );

    // 3. Aparición ESCALONADA (Stagger) de las tarjetas
    // Esto hace que parezca que se "activan" a medida que pasa el escáner
    virusTl.to(".card", {
        duration: 0.6,
        opacity: 1,
        y: 0,               // Regresa a su posición original
        rotateX: 0,          // Quita la rotación 3D inicial
        stagger: {
            amount: 0.8,     // Tiempo total que tarda en empezar la última tarjeta
            grid: [3, 3],    // Dile a GSAP que es una cuadrícula de 3x3
            from: "top"      // Empieza a animar desde la fila superior
        },
        ease: "power2.out",  // Suavizado de salida
    }, "-=1.0"); // Empieza a mitad de camino de la animación de la línea de escaneo

} else {
    console.warn("GSAP: No se encontraron los elementos de la sección 'VIRUS'.");
}
// ==========================================
// 3. PROYECTO B.O.W. (Sincronizado con HUD Táctico)
// ==========================================

if (document.querySelector(".bow-section")) {
    let panels = gsap.utils.toArray(".bow-panel");
    let scrollContainer = document.querySelector(".bow-horizontal-scroll");

    // Timeline principal del scroll horizontal
    let bowTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".bow-section",
            start: "top top",
            // Mantengo tu velocidad rápida (/ 2)
            end: () => "+=" + scrollContainer.offsetWidth / 2, 
            pin: true,
            scrub: 1, 
            invalidateOnRefresh: true,
            anticipatePin: 1,
        }
    });

    // Movimiento del riel
    bowTl.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth),
        ease: "none" 
    });

    // Animaciones individuales por cada Sujeto
    panels.forEach((panel) => {
        let img = panel.querySelector(".bow-img");
        let info = panel.querySelector(".bow-info");
        let dataBlocks = panel.querySelectorAll(".data-block");
        let statFills = panel.querySelectorAll(".fill");

        // 1. Efecto Linterna / Flicker de imagen
        gsap.to(img, {
            scrollTrigger: {
                trigger: panel,
                containerAnimation: bowTl,
                start: "left center",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            filter: "grayscale(0%)",
            duration: 0.1,
            repeat: 2,
            yoyo: true,
            onComplete: () => gsap.to(img, { opacity: 0.8, filter: "grayscale(40%)", duration: 0.5 })
        });

        // 2. Entrada del contenedor de Info
        gsap.from(info, {
            scrollTrigger: {
                trigger: panel,
                containerAnimation: bowTl,
                start: "left 70%",
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // 3. NUEVO: Carga secuencial de bloques de datos (Análisis, Bio, etc.)
        gsap.from(dataBlocks, {
            scrollTrigger: {
                trigger: panel,
                containerAnimation: bowTl,
                start: "left 60%",
            },
            y: 20,
            opacity: 0,
            stagger: 0.2, // Aparece uno tras otro
            duration: 0.5,
            ease: "power1.out"
        });

        // 4. NUEVO: Llenado de barras de stats (HUD Animado)
        statFills.forEach((fill) => {
            let targetWidth = fill.style.width; // Guardamos el % que pusiste en el HTML
            
            gsap.fromTo(fill, 
                { width: "0%" }, // Empiezan en cero
                { 
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: bowTl,
                        start: "left 50%",
                    },
                    width: targetWidth, // Se llenan hasta su valor
                    duration: 1.5,
                    ease: "expo.out"
                }
            );
        });
    });
}

// ==========================================
// 4. ANIMACIÓN DE LA GALERÍA FINAL
// ==========================================

if (document.querySelector(".evidence-gallery")) {
    gsap.to(".g-img", {
        scrollTrigger: {
            trigger: ".evidence-gallery",
            start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05, // Más rápido para que se vea como un flujo de datos
        ease: "power2.out"
    });
}

// AL FINAL DE TODO TU ARCHIVO: Refrescar para asegurar posiciones
ScrollTrigger.refresh();


// ==========================================
// SECCIÓN 5: SUJETOS DE INTERÉS (Entrada "Bounce")
// ==========================================

if (document.querySelector(".subjects-section")) {
    
    // Timeline para la entrada secuencial de las tarjetas
    let virusTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".subjects-section",
            start: "top 70%", // Se activa cuando el top llega al 70% de la pantalla
            once: true, // Solo corre una vez, no reverso
        }
    });

    // Las cartas caen de arriba, grandes y rebotando
    virusTl.from(".subject-card", {
        scale: 3, // Caen de muy "cerca"
        opacity: 0,
        y: -100,
        rotateX: -30,
        stagger: {
            amount: 1, // Tiempo total para que entren todas (1 segundo)
            ease: "none"
        },
        duration: 0.8,
        ease: "bounce.out" // Rebotan al caer sobre la "mesa"
    });

    // Y luego hacemos que el sello de cada una aparezca con un parpadeo
    virusTl.from(".stamp", {
        opacity: 0,
        scale: 10,
        delay: -1.2, // Empieza antes de que terminen las cartas
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(".stamp", { opacity: 0.8, repeat: 3, yoyo: true, duration: 0.05 }) // Parpadeo final
        }
    });
}