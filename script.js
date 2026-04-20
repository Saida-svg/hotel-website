const fullDiningData = {
    regime: [
        { id: 'halal', label: 'Halal', title: 'Héritage Halal', img: '9.jfif', desc: "Une cuisine d'exception respectant rigoureusement les préceptes Halal. Viandes certifiées et saveurs authentiques." },
        { id: 'kosher', label: 'kosher', title: 'Respect kosher', img: '10.jfif', desc: "Une gastronomie pure, préparée sous haute surveillance pour garantir la conformité aux lois alimentaires juives." },
        { id: 'vegan', label: 'Vegan', title: 'Paradis Végétal', img: '12.jfif', desc: "L'art du végétal poussé à son paroxysme. Des créations sans aucun produit animal, riches en couleurs et en nutriments." },
        { id: 'vegetarien', label: 'Végétarien', title: 'Le Jardin Gourmand', img: '13.jfif', desc: "Une harmonie de fromages affinés, d'œufs bio et de légumes croquants pour les amoureux de la nature." }
    ],
    type: [
        { id: 'viande', label: 'Viandes', title: 'Sélection Carnée', img: '11.jfif', desc: "Bœuf Wagyu, agneau de lait et volailles fermières grillés avec précision au charbon de bois." },
        { id: 'seafood', label: 'Fruits de Mer', title: "Miroir de l'Océan", img: '14.jfif', desc: "Pêche locale du jour : langoustes grillées, tartares de thon rouge et plateaux royaux." },
        { id: 'volaille', label: 'Volaille', title: 'Plumes de Luxe', img: '15.jfif', desc: "Canards laqués, poulets de Bresse et volailles fines aux herbes de notre jardin secret." }
    ],
    cuisine: [
        { id: 'tunisienne', label: 'Tunisienne', title: 'Soleil de Tunis', img: '16.jfif', desc: "Couscous royal, Brik à l'œuf et Tajines parfumés. Le cœur battant de la Tunisie dans votre assiette." },
        { id: 'italienne', label: 'Italienne', title: 'Bella Italia', img: '17.jfif', desc: "Pâtes al dente, risottos crémeux et pizzas au feu de bois. L'Italie authentique sous le ciel de Hammamet." },
        { id: 'chinoise', label: 'Chinoise', title: 'Empire des Sens', img: '18.jfif', desc: "Dim sums vapeur, canard laqué et wok enflammés. Une immersion totale dans les saveurs de l'Orient." },
        { id: 'indienne', label: 'Indienne', title: 'Route des Épices', img: '19.jfif', desc: "Currys onctueux, Naans au fromage et épices Tandoori pour une explosion de saveurs." },
        { id: 'francaise', label: 'Française', title: 'Haute Gastronomie', img: '20.jfif', desc: "Foie gras, confits et sauces veloutées. L'élégance et le savoir-faire des grands chefs français." }
    ],
    sante: [
        { id: 'gluten', label: 'Sans Gluten', title: 'Sérénité Gluten-Free', img: '21.jfif', desc: "Tout le plaisir gourmand sans aucune trace de gluten. Pains et pâtisseries artisanales dédiés." },
        { id: 'lactose', label: 'Sans Lactose', title: 'Douceur Lactée', img: '22.jfif', desc: "Des alternatives crémeuses et digestes pour savourer vos plats préférés sans lactose." },
        { id: 'lowcarb', label: 'Faible en Glucides', title: 'Vitalité Low-Carb', img: '23.jfif', desc: "Équilibre parfait pour votre silhouette. Des plats riches en protéines et légumes, pauvres en sucres." },
        { id: 'healthy', label: 'Menu Healthy', title: "L'Atelier Équilibre", img: '24.jfif', desc: "Une sélection de super-aliments, graines et produits frais pour booster votre énergie." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initBookingForm();
    initWheelGame();
    initExperienceTabs();
    initDiningGallery();
});

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ici, vous pourriez ajouter un fetch() pour envoyer les données
            alert("✨ Demande de réservation envoyée ! Préparez-vous pour le luxe.");
            document.getElementById('gameModal').style.display = 'flex'; // Utilise flex pour centrer
        });
    }

    // Fermeture du modal
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('gameModal');
        if (e.target === modal) modal.style.display = 'none';
    });
}

function initExperienceTabs() {
    const featureButtons = document.querySelectorAll('.feature-btn');
    const detailContents = document.querySelectorAll('.detail-content');

    featureButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            featureButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            detailContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    setTimeout(() => content.classList.add('active'), 10);
                }
            });
        });
    });
}

function initDiningGallery() {
    const defaultBtn = document.querySelector('.nav-btn[onclick*="regime"]');
    if(defaultBtn) changeCategory('regime', defaultBtn);
}
function changeCategory(cat, element) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    const subNav = document.getElementById('sub-navigation');
    if (!subNav) return;
    subNav.innerHTML = '';
    fullDiningData[cat].forEach((item, index) => {
        const btn = document.createElement('button');
        btn.classList.add('sub-btn');
        btn.innerText = item.label;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-btn').forEach(sb => sb.classList.remove('active'));
            btn.classList.add('active');
            updateViewer(item);
        });

        subNav.appendChild(btn);
        if (index === 0) {
            btn.classList.add('active');
            updateViewer(item);
        }
    });
}

function updateViewer(item) {
    const viewer = document.getElementById('dining-display');
    const imgElement = document.getElementById('viewer-img');
    const titleElement = document.getElementById('viewer-title');
    const descElement = document.getElementById('viewer-desc');

    if (!viewer) return;
    viewer.classList.remove('show');
    setTimeout(() => {
        if (imgElement) imgElement.style.backgroundImage = `url('${item.img}')`;
        if (titleElement) titleElement.innerText = item.title;
        if (descElement) descElement.innerText = item.desc;
        viewer.classList.add('show');
    }, 400);
}

function initWheelGame() {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultText = document.getElementById('gameResult');
    let currentRotation = 0;

    if (spinBtn) {
        spinBtn.addEventListener('click', () => {
            spinBtn.disabled = true;
            spinBtn.style.opacity = "0.5";
            spinBtn.innerText = "LANCEMENT...";
            const extraDegrees = Math.floor(Math.random() * 360) + 1800; 
            currentRotation += extraDegrees; 
            wheel.style.transform = `rotate(${currentRotation}deg)`;
            setTimeout(() => {
                const actualDeg = currentRotation % 360;
                determinePrize(actualDeg, resultText);
                spinBtn.innerText = "TERMINÉ";
            }, 4000);
        });
    }
}

function determinePrize(deg, displayElement) {
    const normalizedDeg = (360 - (deg % 360)) % 360;
    const prizeIndex = Math.floor(normalizedDeg / 60);
    
    const prizes = [
        "Dîner de luxe offert !",
        "Petit-déjeuner VIP offert",
        "5% de promotion immédiate",
        "Accès SPA gratuit",
        "+1 Jour gratuit !",
        "Un coupon de réduction de 10%"
    ];

    const prize = prizes[prizeIndex];

    displayElement.innerHTML = `
        <div style="animation: fadeIn 0.5s ease forwards;">
            <h3 style="color: #c5a059; margin-bottom: 10px;">✨ FÉLICITATIONS ! ✨</h3>
            <p>Vous avez gagné : <strong>${prize}</strong></p>
            <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">
                Un code de confirmation a été envoyé à votre adresse e-mail.
            </p>
        </div>
    `;
}

const heroImages = [
    "8.jfif",
    "9.jfif",
    "10.jfif",
    "11.jfif"
];