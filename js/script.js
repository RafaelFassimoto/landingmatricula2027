
/* =========================================
   FADELITO - MATRÍCULAS 2027
   JAVASCRIPT PRINCIPAL
========================================= */


/* =========================================
   CONFIGURAÇÕES DOS LINKS
========================================= */

const CONFIG = {
    whatsapp: "https://wa.me/5511999999999",
    tabelaValores: "#",
    propostaPedagogica: "arquivos/proposta-pedagogica-2027.pdf"
};

// Atualiza os links de WhatsApp
document.querySelectorAll("#whatsapp-link, #footer-whatsapp").forEach(link => {
    link.href = CONFIG.whatsapp;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
});

// Atualiza o link da tabela de valores
const valuesLink = document.querySelector("#values-link");

if (valuesLink) {
    valuesLink.href = CONFIG.tabelaValores;
}


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Fecha o menu ao clicar em um link
    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    // Fecha o menu ao clicar fora
    document.addEventListener("click", event => {

        if (
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

}


/* =========================================
   GALERIA DE IMAGENS
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const galleryModal = document.querySelector("#gallery-modal");
const galleryModalImage = document.querySelector("#gallery-modal-image");
const galleryCounter = document.querySelector("#gallery-counter");

const galleryClose = galleryModal?.querySelector(".modal-close");
const galleryPrev = galleryModal?.querySelector(".gallery-prev");
const galleryNext = galleryModal?.querySelector(".gallery-next");

const galleryImages = Array.from(galleryItems).map(item => {
    const image = item.querySelector("img");

    return {
        src: image.src,
        alt: image.alt
    };
});

let currentGalleryIndex = 0;

function openGallery(index) {

    if (!galleryImages.length || !galleryModal) return;

    currentGalleryIndex = index;

    updateGallery();

    galleryModal.classList.add("active");
    galleryModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

}

function updateGallery() {

    const image = galleryImages[currentGalleryIndex];

    galleryModalImage.src = image.src;
    galleryModalImage.alt = image.alt;

    galleryCounter.textContent =
        `${currentGalleryIndex + 1} / ${galleryImages.length}`;

}

function closeGallery() {

    if (!galleryModal) return;

    galleryModal.classList.remove("active");
    galleryModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}

function nextGalleryImage() {

    currentGalleryIndex++;

    if (currentGalleryIndex >= galleryImages.length) {
        currentGalleryIndex = 0;
    }

    updateGallery();

}

function previousGalleryImage() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {
        currentGalleryIndex = galleryImages.length - 1;
    }

    updateGallery();

}

// Abre a imagem selecionada
galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
        openGallery(index);
    });

});

// Navegação
galleryNext?.addEventListener("click", nextGalleryImage);

galleryPrev?.addEventListener("click", previousGalleryImage);

// Fechar galeria
galleryClose?.addEventListener("click", closeGallery);

// Fecha ao clicar no fundo
galleryModal?.addEventListener("click", event => {

    if (event.target === galleryModal) {
        closeGallery();
    }

});


/* =========================================
   NAVEGAÇÃO POR TECLADO NA GALERIA
========================================= */

document.addEventListener("keydown", event => {

    if (!galleryModal?.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        nextGalleryImage();
    }

    if (event.key === "ArrowLeft") {
        previousGalleryImage();
    }

    if (event.key === "Escape") {
        closeGallery();
    }

});


/* =========================================
   GESTOS DE DESLIZAR NA GALERIA
========================================= */

let touchStartX = 0;
let touchEndX = 0;

galleryModal?.addEventListener("touchstart", event => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });

galleryModal?.addEventListener("touchend", event => {

    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
        nextGalleryImage();
    } else {
        previousGalleryImage();
    }

}, { passive: true });


/* =========================================
   MODAL DE VÍDEO
========================================= */

const videoModal = document.querySelector("#video-modal");
const videoFrame = document.querySelector("#video-frame");

const videoClose = videoModal?.querySelector(".modal-close");

const videoButtons = document.querySelectorAll(".js-video-open");

function openVideo(videoUrl) {

    if (!videoModal || !videoFrame || !videoUrl) return;

    // Adiciona autoplay ao endereço do vídeo
    const separator = videoUrl.includes("?") ? "&" : "?";

    videoFrame.src = videoUrl + separator + "autoplay=1";

    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

}

function closeVideo() {

    if (!videoModal || !videoFrame) return;

    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");

    // Remove o iframe para interromper o vídeo
    videoFrame.src = "";

    document.body.classList.remove("modal-open");

}

// Abre o vídeo
videoButtons.forEach(button => {

    button.addEventListener("click", () => {

        const videoUrl = button.dataset.video;

        openVideo(videoUrl);

    });

});

// Fecha o vídeo
videoClose?.addEventListener("click", closeVideo);

// Fecha clicando fora
videoModal?.addEventListener("click", event => {

    if (event.target === videoModal) {
        closeVideo();
    }

});

// Tecla ESC
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeVideo();
    }

});


/* =========================================
   ROLAGEM SUAVE
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            document.querySelector(".header")?.offsetHeight || 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================
   ANIMAÇÕES DE ENTRADA
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .stage-card, .activity-card, " +
    ".care-card, .baby-content, .cambridge-content, .ebook-content, " +
    ".gallery-item, .highlight-item"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================
   LAZY LOADING DAS IMAGENS
========================================= */

document.querySelectorAll("img").forEach(image => {

    if (!image.closest(".hero")) {
        image.loading = "lazy";
    }

    image.decoding = "async";

});


/* =========================================
   ANO AUTOMÁTICO NO FOOTER
========================================= */

// Mantém o ano atualizado no rodapé
const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {
    footerYear.textContent =
        `© ${new Date().getFullYear()} Fadelito. Todos os direitos reservados.`;
}


/* =========================================
   FINALIZAÇÃO
========================================= */

console.log("Landing Page Fadelito - Matrículas 2027 carregada!");

/* =========================================
   MODAIS DA PROPOSTA PEDAGÓGICA
========================================= */

const contentModals = document.querySelectorAll(".content-modal");

const modalTriggers = document.querySelectorAll(
    ".modal-trigger[data-modal]"
);

let activeContentModal = null;
let previousScrollPosition = 0;


/* ABRIR MODAL */

function openContentModal(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) return;

    // Evita abrir mais de um modal ao mesmo tempo
    if (activeContentModal) {
        closeContentModal();
    }

    previousScrollPosition = window.scrollY;

    activeContentModal = modal;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    // A modal de atividades sempre começa no topo.
    // Os cards específicos fazem a rolagem até a atividade escolhida depois.
    if (modalId === "modal-extras") {

        const scrollArea =
            modal.querySelector(".content-modal-box") ||
            modal.querySelector(".modal-body") ||
            modal;

        scrollArea.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }

    const closeButton = modal.querySelector(".content-modal-close");

    if (closeButton) {
        closeButton.focus();
    }

}


/* FECHAR MODAL */

function closeContentModal() {

    if (!activeContentModal) return;

    activeContentModal.classList.remove("active");

    activeContentModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    activeContentModal = null;

    // Retorna à posição anterior da página
    window.scrollTo({
        top: previousScrollPosition,
        behavior: "instant"
    });

}


/* EVENTOS DOS BOTÕES */

modalTriggers.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;

        openContentModal(modalId);

    });

});


/* BOTÃO FECHAR */

contentModals.forEach(modal => {

    const closeButton = modal.querySelector(".content-modal-close");

    closeButton?.addEventListener("click", closeContentModal);

});


/* FECHAR CLICANDO FORA */

contentModals.forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeContentModal();
        }

    });

});


/* FECHAR COM ESC */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        activeContentModal
    ) {
        closeContentModal();
    }

});


/* EVITAR QUE O CLIQUE NO CONTEÚDO FECHE O MODAL */

document.querySelectorAll(".content-modal-box").forEach(box => {

    box.addEventListener("click", event => {
        event.stopPropagation();
    });

});


/* =========================================
   ATIVIDADES EXTRAS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const activityCards = document.querySelectorAll(".extra-card[data-atividade]");
    const openExtrasButton = document.querySelector('[data-modal="modal-extras"]');
    const extrasModal = document.getElementById("modal-extras");

    // Identifica a área que realmente possui a rolagem da modal.
    function getExtrasScrollArea() {

        if (!extrasModal) return null;

        return (
            extrasModal.querySelector(".content-modal-box") ||
            extrasModal.querySelector(".modal-body") ||
            extrasModal
        );

    }


    // Cards de atividades: abrem a modal na atividade correspondente.
    activityCards.forEach(card => {

        function openActivity() {

            const activity = card.dataset.atividade;
            const target = document.getElementById("atividade-" + activity);

            if (!target || !openExtrasButton) return;

            // Aciona o mesmo botão que abre "Ver todas as atividades".
            // A abertura da modal já posiciona a rolagem no topo.
            openExtrasButton.click();

            // Depois que a modal abrir, rola até a atividade escolhida.
            setTimeout(() => {

                const scrollArea = getExtrasScrollArea();

                if (!scrollArea || !target) return;

                const targetPosition =
                    target.getBoundingClientRect().top -
                    scrollArea.getBoundingClientRect().top +
                    scrollArea.scrollTop;

                scrollArea.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }, 400);

        }

        card.addEventListener("click", openActivity);

        // Acessibilidade: permite abrir com Enter ou Espaço.
        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openActivity();
            }

        });

    });

});


/* =========================================
   CONTROLE DE SCROLL DOS MODAIS
========================================= */

document.body.classList.remove("modal-open");


/* =========================================
   AJUSTE DE ACESSIBILIDADE
========================================= */

// Evita que o foco seja perdido ao abrir e fechar os modais

modalTriggers.forEach(button => {

    button.setAttribute("aria-haspopup", "dialog");

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
        }

    });

});

/* =====================================================
   NOSSAS TURMAS — ÍCONES E MODAIS
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Inicializar ícones Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    const turmaModal = document.getElementById("turmaModal");

    const turmaModalTitle =
        document.getElementById("turmaModalTitle");

    const turmaModalSubtitle =
        document.getElementById("turmaModalSubtitle");

    const turmaModalAge =
        document.getElementById("turmaModalAge");

    const turmaModalDescription =
        document.getElementById("turmaModalDescription");

    const turmaModalClose =
        document.querySelector(".turma-modal-close");

    const turmaModalButton =
        document.getElementById("turmaModalButton");

    const turmaCards =
        document.querySelectorAll(".turma-card");

    let lastTurmaTrigger = null;


    /* =================================================
       CONTEÚDO DAS TURMAS
    ================================================== */

    const turmasContent = {

        // BERÇÁRIO
        "bercario": {

            title: "Berçário",

            subtitle: "Um começo cheio de carinho e descobertas",

            age: "0 a 1 ano",

            description:
                "O primeiro ano de vida é marcado por descobertas fundamentais. No Berçário, cada cuidado é também uma oportunidade de aprendizagem. Com acolhimento, atenção individualizada e estímulos adequados, proporcionamos experiências que favorecem o desenvolvimento sensorial, motor, cognitivo e afetivo do bebê.",
 
            page: "bercario.html"
        },


        // MINIMATERNAL
        "mini-maternal": {

            title: "Minimaternal",

            subtitle: "Os primeiros passos em um mundo de descobertas",

            age: "1 a 2 anos",

            description:
                "Para os nossos pequenos do Minimaternal, criamos um ambiente que é um convite constante à descoberta e ao aprendizado natural. Com muita música, brincadeiras e interações, cada momento de convivência se transforma em uma nova conquista.\n\n" +

                "Nossa rotina de trabalho é rica em atividades que estimulam o desenvolvimento cognitivo, psicomotor e da linguagem do seu filho. Promovemos situações em que a criança tem a oportunidade de socializar e se integrar, ampliando e acelerando seu horizonte de conquistas. É o ponto de partida para um desenvolvimento pleno e feliz!",

            page: "minimaternal.html"				
        },


        // MATERNAL I
        "maternal": {

            title: "Maternal I",

            subtitle: "Explorando o mundo com todos os sentidos",

            age: "2 a 3 anos",

            description:
                "No Maternal I, damos um foco especial ao desenvolvimento da linguagem oral do seu filho. De forma lúdica e bem prática, estimulamos o aprimoramento de todas as suas percepções sensoriais: tato, paladar, olfato, audição e visão. Também apoiamos e promovemos ativamente as interações sociais, fundamentais nesta fase.\n\n" +

                "Este é um período muito importante, pois marca, para muitas crianças, a emocionante despedida das fraldas. As primeiras relações de amizade e a vontade de independência começam a florescer com o apoio de nossas educadoras e são impulsionadas pelas novas descobertas diárias. Seu filho desenvolverá a consciência corporal, o reconhecimento dos espaços e a comunicação será aprimorada por meio de músicas e histórias. Isso não só enriquece o vocabulário, mas também desenvolve a criatividade e a noção de tempo.",
	
            page: "maternal1.html"	

        },


        // MATERNAL II
        "maternal-ii": {

            title: "Maternal II",

            subtitle: "Consolidando a independência e os primeiros saberes",

            age: "3 a 4 anos",

            description:
                "No Maternal II, continuamos a fortalecer o trabalho de socialização, mas com um foco maior na independência do seu filho. Nesta fase, percebemos que as crianças já demonstram um equilíbrio e coordenação de movimentos mais avançados, o que as encoraja a explorar mais o ambiente.\n\n" +

                "É aqui que começamos a explorar o mundo dos numerais e quantidades, das cores vibrantes e das primeiras formas geométricas como triângulo, círculo e quadrado. No Maternal II, seu filho também terá o contato inicial com a leitura e a escrita de forma leve e significativa, entendendo-as como uma forma de se comunicar e interagir com o mundo. Estimulamos esse aprendizado prazeroso e constante através da associação do som com figuras, desenhos, histórias envolventes, jogos divertidos e muitos outros recursos criativos.",
				
            page: "maternal2.html"
			
        },


        // JARDIM
        "jardim": {

            title: "Jardim",

            subtitle: "Florescendo para a alfabetização e a criatividade",

            age: "4 a 5 anos",

            description:
                "No Jardim, seu filho terá a oportunidade de se familiarizar de forma concreta e divertida com os numerais (como se escrevem e suas quantidades). Começaremos a explorar as letras do alfabeto, partindo daquelas que compõem o nome dele e de seus amigos, avançando para outras palavras significativas em seu dia a dia. Ele começará a experimentar as primeiras ideias de como as palavras são escritas, de um jeito leve e natural.\n\n" +

                "É também no Jardim que a criança demonstra um interesse crescente pela leitura – tanto pela \"leitura do mundo\" ao seu redor quanto pela leitura das palavras. Ela começa a compreender o conceito de começo, meio e fim das histórias, exercitando a criatividade e construindo seus próprios enredos com um vocabulário cada vez mais rico.\n\n" +

                "Em todas as nossas atividades, a ludicidade está presente, tornando o aprendizado uma grande brincadeira. Desenvolvemos outras habilidades importantes, como a autonomia, o domínio do corpo (esquema corporal e lateralidade), a coordenação, a compreensão de espaço e tempo, e todas as percepções sensoriais (visuais, auditivas, táteis, gustativas e olfativas). Seu filho estará em constante desenvolvimento, aprendendo de forma integral e divertida!",
				
			page: "jardim.html"

        },


        // PRÉ
        "pre": {

            title: "Pré",

            subtitle: "Preparando-se para um futuro brilhante",

            age: "5 a 6 anos",

            description:
                "No Pré, seu filho está encerrando um ciclo pedagógico incrível, construído desde o início da Educação Infantil. É o momento de colher os frutos de um trabalho focado na aquisição de autonomia, segurança, consciência e liberdade com responsabilidade, além de tantas outras conquistas, incluindo a tão esperada alfabetização.\n\n" +

                "Nesta fase, seu filho já é capaz de conectar o que aprendeu com as situações do dia a dia. Ele irá consolidar e ampliar seu conhecimento dos números, começando a fazer pequenos cálculos e operações matemáticas simples. Também aprofundará o aprendizado das letras, construindo sílabas, palavras e pequenas frases.\n\n" +

                "É no Pré que auxiliamos a criança a desenvolver a leitura e escrita espontânea, sempre acompanhando o ritmo e o processo individual de cada aluno. Oferecemos apoio e situações de crescimento que respeitam as individualidades, construindo bases sólidas para que seu filho inicie o Ensino Fundamental de forma segura e confiante. Ele estará pronto para os próximos desafios!",
				
		    page: "pre.html"
			
        }

    };


    /* =================================================
       ABRIR MODAL
    ================================================== */

    function openTurmaModal(turmaKey, trigger) {

        const turma = turmasContent[turmaKey];

        if (!turma || !turmaModal) {
            return;
        }

        lastTurmaTrigger = trigger;

        turmaModalTitle.textContent = turma.title;

        turmaModalSubtitle.textContent = turma.subtitle;

        turmaModalAge.textContent = turma.age;

        turmaModalDescription.textContent =
            turma.description;

        turmaModal.classList.add("active");

        turmaModal.setAttribute(
            "aria-hidden",
            "false"
        );
		
		document.getElementById("turmaModalButton").href = turma.page || "#";

        document.body.classList.add("modal-open");

        turmaModalClose.focus();

    }


    /* =================================================
       FECHAR MODAL
    ================================================== */

    function closeTurmaModal() {

        if (!turmaModal) {
            return;
        }

        turmaModal.classList.remove("active");

        turmaModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");

        if (lastTurmaTrigger) {
            lastTurmaTrigger.focus();
        }

    }


    /* =================================================
       CLIQUE NOS CARDS
    ================================================== */

    turmaCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const turmaKey =
                this.getAttribute("data-turma");

            openTurmaModal(turmaKey, this);

        });

    });


    /* =================================================
       BOTÕES DE FECHAMENTO
    ================================================== */

    if (turmaModalClose) {

        turmaModalClose.addEventListener(
            "click",
            closeTurmaModal
        );

    }

    if (turmaModalButton) {

        turmaModalButton.addEventListener(
            "click",
            closeTurmaModal
        );

    }


    /* =================================================
       CLIQUE FORA DA MODAL
    ================================================== */

    if (turmaModal) {

        turmaModal.addEventListener(
            "click",
            function (event) {

                if (event.target === turmaModal) {
                    closeTurmaModal();
                }

            }
        );

    }


    /* =================================================
       TECLA ESC
    ================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                turmaModal &&
                turmaModal.classList.contains("active")
            ) {

                closeTurmaModal();

            }

        }
    );

});


/* =========================================
   FINALIZAÇÃO
========================================= */

console.log("Fadelito - Proposta pedagógica completa carregada!");
