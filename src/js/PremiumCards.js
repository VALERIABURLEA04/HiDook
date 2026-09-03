const premiumCompanies = [
    {
        id: "ellis-box",
        name: "Ellis Box",
        category: "Produse alimentare",
        logo: "./imagess/ellis.png",

        slogan: "Fructe și legume proaspete, livrate cu grijă până la ușa ta.",

        description: "Descoperă produse proaspete și livrare convenabilă pentru tine și familia ta.",

        features: [
            "🍎 Produse proaspete",
            "🚚 Livrare la domiciliu",
            "✨ Profil Premium"
        ],

         location: {
    address: null,
    map: null,
    regions: [
        "London",
        "Northampton",
        "Luton",
        "Dunstable"
    ]
    },
       promo: {
    title: "🎁 10% reducere la prima comandă"
},

jobs: [],

   
        url: "./membru/ellis-box/"
    },

    {
    id: "vedance-studio",
    name: "VEDANCE Studio",
    category: "Dance",
    logo: "./imagess/dance.png",

    slogan: "Dans pentru toate vârstele – de la primii pași până la scenă.",

    description: "Programe de dans pentru copii și adulți, cursuri adaptate diferitelor niveluri și experiențe pline de energie.",

    features: [
        "👧 Copii",
        "🕺 Adulți",
        "💃 Cursuri de dans",
        "🎭 Spectacole & evenimente"
    ],
location: {
        address: null,
        map: null,
        regions: [
            "Ipswich",
            "Romford"
        ]
    },
    promo: null,

    jobs: [
        {
            title: "💼 Instructor de dans"
        }
    ],

    url: "./membru/vedance-studio/"
},

    {
        id: "tatiana-beauty-salon",
        name: "Tatiana Beauty Salon",
        category: "Beauty",
        logo: "./imagess/tatianasalon.png",

        slogan: "Frumusețe, îngrijire și răsfăț într-un singur loc.",

        description: "Descoperă servicii de beauty și îngrijire, de la manichiură și coafură până la epilare cu laser și masaj.",

        features: [
            "💅 Manichiură & pedichiură",
            "💇‍♀️ Coafură",
            "✨ Epilare laser",
            "💆‍♀️ Masaj"
        ],

        url: "./membru/tatiana-beauty-salon/"
    },

    {
    id: "gvm-coaching",
    name: "GVM Coaching",
    category: "Educație",
    logo: "./imagess/coaching.png",

    slogan: "Claritate, direcție și dezvoltare personală pentru următorul tău pas.",

    description: "Descoperă sesiuni și experiențe dedicate dezvoltării personale, prin coaching, evenimente live, numerologie și astrologie.",

    features: [
        "🧭 Life Coaching",
        "🎤 Live Events",
        "🔢 Numerologie",
        "✨ Astrologie"
    ],

    promo: {
        title: "🎁 Prima sesiune de coaching -20%"
    },

    jobs: [
        {
            title: "💼 Asistent evenimente"
        }
    ],

    url: "./membru/gvm-coaching/"
},

    {
        id: "natalias-bakery",
        name: "Natalia’s Bakery",
        category: "Produse alimentare",
        logo: "./imagess/bakery.png",

        slogan: "Gust autentic, pregătit cu grijă pentru masa și evenimentele tale.",

        description: "Descoperă colaci pentru evenimente, plăcinte și pâine cu maia, pregătite cu atenție și pasiune.",

        features: [
            "🥨 Colaci pentru evenimente",
            "🥧 Plăcinte",
            "🍞 Pâine cu maia"
        ],

        url: "./membru/natalias-bakery/"
    },

    {
        id: "go-consulting",
        name: "Go Consulting Ltd",
        category: "Finanțe",
        logo: "./imagess/accounting.png",

        slogan: "Contabilitate mai simplă pentru afacerea ta.",

        description: "Servicii de contabilitate pentru antreprenori și afaceri care vor mai multă claritate și organizare financiară.",

        features: [
            "📊 Contabilitate",
            "💼 Pentru afaceri",
            "🤝 Suport profesional"
        ],

        url: "./membru/go-consulting/"
    },

    {
        id: "birou-de-orice-immigration",
        name: "Birou de Orice Immigration",
        category: "Consultanță",
        logo: "./imagess/cetatenie.png",

        slogan: "Mai multă claritate pentru următorul tău pas în UK.",

        description: "Consultanță pentru imigrare, aplicații pentru viză și aplicații pentru cetățenie britanică.",

        features: [
            "🇬🇧 Imigrare",
            "📄 Aplicații pentru viză",
            "🏛️ Cetățenie britanică"
        ],

        url: "./membru/birou-de-orice-immigration/"
    },

    {
    id: "eliza-beauty-academy",
    name: "Eliza Beauty Academy",
    category: "Beauty",
    logo: "./imagess/lash.png",

    slogan: "Frumusețe, precizie și pasiune pentru fiecare detaliu.",

    description: "Extensii de gene și cursuri fizice pentru cei care vor să descopere și să dezvolte tehnici în domeniul lash beauty.",

    features: [
        "✨ Lash extensions",
        "👁️ Extensii de gene",
        "🎓 Cursuri fizice"
    ],

    promo: {
        title: "🎁 -15% la înscrierea la un curs"
    },

    jobs: [],

    url: "./membru/eliza-beauty-academy/"
}
];




function createPremiumCard(company) {

    return `
        <div class="relative overflow-hidden
                    rounded-3xl
                    border border-[#E8E5DE]
                    bg-white
                    shadow-sm
                    p-4 sm:p-4">

            <!-- PREMIUM -->
            <div class="absolute top-0 right-0
                        bg-[#FFD338]
                        text-[#064FC4]
                        text-xs
                        font-bold
                        px-3.5 py-1.5
                        rounded-bl-2xl">
                PREMIUM
            </div>


            <div class="grid gap-4
                        md:grid-cols-[95px_1fr]
                        md:items-center">

                <!-- LOGO -->
                <div class="flex justify-center md:justify-start">

                    <div class="w-20 h-20
                                sm:w-24 sm:h-24
                                rounded-full
                                overflow-hidden
                                border border-[#E4E7EC]
                                bg-[#F8F5ED]
                                shadow-sm">

                        <img
                            src="${company.logo}"
                            alt="${company.name}"
                            class="w-full h-full object-cover"
                        >

                    </div>

                </div>


                <!-- CONTENT -->
                <div class="text-center md:text-left">

                    <!-- CATEGORY -->
                    <span class="inline-block
                                 rounded-lg
                                 bg-[#064FC4]/10
                                 px-2.5 py-1
                                 text-xs
                                 font-semibold
                                 text-[#064FC4]">

                        ${company.category}

                    </span>


                    <!-- NAME -->
                    <h2 class="mt-2
                               text-xl sm:text-2xl
                               font-semibold
                               tracking-tight
                               text-[#064FC4]">

                        ${company.name}

                    </h2>


                    <!-- SLOGAN -->
                    <p class="mt-1.5
                              text-sm sm:text-base
                              font-medium
                              leading-5
                              text-[#334E68]">

                        ${company.slogan}

                    </p>


                    <!-- DESCRIPTION -->
                    <p class="mt-1.5
                              text-sm
                              leading-5
                              text-[#667085]">

                        ${company.description}

                    </p>


                    <!-- FEATURES -->
                    <div class="mt-3
                                flex flex-wrap
                                justify-center md:justify-start
                                gap-1.5">

                        ${company.features.map(feature => `
                            <span class="rounded-full
                                         bg-[#F8F5ED]
                                         px-2.5 py-1
                                         text-xs
                                         font-medium
                                         text-[#46546A]">

                                ${feature}

                            </span>
                        `).join("")}

                    </div>

                    <!-- PROMO / JOBS -->
<div class="mt-3 flex flex-wrap justify-center md:justify-start gap-2">

    ${company.promo ? `
        <span class="rounded-lg
                     bg-[#FFF4CC]
                     px-3 py-1.5
                     text-xs
                     font-semibold
                     text-[#8A5A00]">
            🎁 ${company.promo.title}
        </span>
    ` : ""}

    ${company.jobs && company.jobs.length > 0 ? `
        <span class="rounded-lg
                     bg-[#EAF2FF]
                     px-3 py-1.5
                     text-xs
                     font-semibold
                     text-[#064FC4]">
            💼 ${company.jobs[0].title}
        </span>
    ` : ""}

</div>

                    <!-- BUTTON -->
                    <div class="mt-3">

                        <a href="${company.url}"
                           class="inline-flex items-center justify-center
                                  rounded-xl
                                  bg-[#064FC4]
                                  px-4 py-2
                                  text-sm
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-[#124BFF]
                                  hover:-translate-y-0.5">

                            Descoperă ${company.name}

                            <span class="ml-2">→</span>

                        </a>

                    </div>

                </div>

            </div>

        </div>
    `;
}
// function renderPremiumCards() {

//     const container = document.getElementById("premium-companies");

//     if (!container) return;

//     container.innerHTML = premiumCompanies
//         .map(company => createPremiumCard(company))
//         .join("");
// }


function renderPremiumCards(companies = premiumCompanies) {

    const container = document.getElementById("premium-companies");

    if (!container) return;

    if (companies.length === 0) {
        container.innerHTML = `
            <div class="py-10 text-center">
                <p class="text-lg font-semibold text-[#334E68]">
                    Nu am găsit nicio companie.
                </p>

                <p class="mt-2 text-sm text-[#667085]">
                    Încearcă un alt nume sau o altă categorie.
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = companies
        .map(company => createPremiumCard(company))
        .join("");
}

renderPremiumCards();

const searchInput = document.getElementById("premium-search");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchValue = this.value
            .toLowerCase()
            .trim();

        const filteredCompanies = premiumCompanies.filter(company => {
            return (
                company.name.toLowerCase().includes(searchValue) ||
                company.category.toLowerCase().includes(searchValue)
            );
        });

        renderPremiumCards(filteredCompanies);
    });
}

   if (company.location?.map) {

        container.innerHTML = `
            <section class="bg-white py-10 sm:py-12">

                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <h2 class="text-2xl sm:text-3xl font-semibold text-[#334E68]">
                        Locație
                    </h2>

                    <p class="mt-2 text-[#667085]">
                        ${company.location.address}
                    </p>

                    <div class="mt-6 overflow-hidden rounded-2xl
                                border border-[#E4E7EC]">

                        <iframe
                            src="${company.location.map}"
                            class="w-full h-[280px] sm:h-[350px]"
                            style="border:0;"
                            loading="lazy"
                            allowfullscreen>
                        </iframe>

                    </div>

                </div>

            </section>
        `;

        return;
    }


    // DACĂ EXISTĂ DOAR REGIUNI
    if (company.location?.regions?.length) {

        container.innerHTML = `
            <section class="bg-white py-8 sm:py-10">

                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <h2 class="text-2xl sm:text-3xl font-semibold text-[#334E68]">
                        Zone deservite
                    </h2>

                    <div class="mt-4 flex flex-wrap gap-2">

                        ${company.location.regions.map(region => `
                            <span class="rounded-full
                                         bg-[#F8F5ED]
                                         px-4 py-2
                                         text-sm
                                         text-[#46546A]">
                                📍 ${region}
                            </span>
                        `).join("")}

                    </div>

                </div>

            </section>
        `;
    }


renderLocation(company);