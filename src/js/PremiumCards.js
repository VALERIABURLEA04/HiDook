const premiumCompanies = [
    {
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
        url: "./ellis-box.html"
    },

    // mai târziu adăugăm pur și simplu altă companie
    {
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
        url: "./vedance.html"
    },

    {
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

    url: "./tatiana-beauty-salon.html"
},
{
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

    url: "./gvm-coaching.html"
},
{
    name: "Natalia’s Bakery",
    category: "Business",
    logo: "./imagess/bakery.png",

    slogan: "Gust autentic, pregătit cu grijă pentru masa și evenimentele tale.",

    description: "Descoperă colaci pentru evenimente, plăcinte și pâine cu maia, pregătite cu atenție și pasiune.",

    features: [
        "🥨 Colaci pentru evenimente",
        "🥧 Plăcinte",
        "🍞 Pâine cu maia"
    ],

    url: "./natalias-bakery.html"
}, 

{
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

    url: "./go-consulting.html"
}, 

{
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

    url: "./birou-de-orice.html"
}, 
{
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

    url: "./eliza-beauty-academy.html"
}, 
];




function createPremiumCard(company) {

    return `
        <div class="relative overflow-hidden
                    rounded-3xl
                    border border-[#E8E5DE]
                    bg-white
                    shadow-sm
                    p-5 sm:p-6 lg:p-7">

            <!-- PREMIUM -->
            <div class="absolute top-0 right-0
                        bg-[#FFD338]
                        text-[#064FC4]
                        text-xs sm:text-sm
                        font-bold
                        px-4 sm:px-5 py-2
                        rounded-bl-2xl">
                PREMIUM
            </div>


            <div class="grid gap-6
                        md:grid-cols-[130px_1fr]
                        md:items-center">

                <!-- LOGO -->
                <div class="flex justify-center md:justify-start">

                    <div class="w-28 h-28
                                sm:w-32 sm:h-32
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

                    <span class="inline-block
                                 rounded-lg
                                 bg-[#064FC4]/10
                                 px-3 py-1
                                 text-xs sm:text-sm
                                 font-semibold
                                 text-[#064FC4]">

                        ${company.category}

                    </span>


                    <h2 class="mt-3
                               text-2xl sm:text-3xl
                               font-semibold
                               tracking-tight
                               text-[#064FC4]">

                        ${company.name}

                    </h2>


                    <p class="mt-3
                              text-base sm:text-lg
                              font-medium
                              leading-6 sm:leading-7
                              text-[#334E68]">

                        ${company.slogan}

                    </p>


                    <p class="mt-2
                              text-sm sm:text-base
                              leading-6
                              text-[#667085]">

                        ${company.description}

                    </p>


                    <!-- FEATURES -->
                    <div class="mt-5
                                flex flex-wrap
                                justify-center md:justify-start
                                gap-2">

                        ${company.features.map(feature => `
                            <span class="rounded-full
                                         bg-[#F8F5ED]
                                         px-3 py-1.5
                                         text-xs sm:text-sm
                                         font-medium
                                         text-[#46546A]">
                                ${feature}
                            </span>
                        `).join("")}

                    </div>


                    <!-- BUTTON -->
                    <div class="mt-5">

                        <a href="${company.url}"
                           class="inline-flex items-center justify-center
                                  rounded-xl
                                  bg-[#064FC4]
                                  px-5 py-2.5
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


function renderPremiumCards() {

    const container = document.getElementById("premium-companies");

    if (!container) return;

    container.innerHTML = premiumCompanies
        .map(company => createPremiumCard(company))
        .join("");
}


renderPremiumCards();