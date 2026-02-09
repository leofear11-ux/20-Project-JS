//1- Mes variables et constantes
const search = document.querySelector(".search_pok input")

//1-1 tableau pour stocker les pokémons
const allPokemon = []

//1-2 tableau pour stocker les pokémons après le tri
let arrFin = []

//1-3 tableau pour stocker les promesses de chaque pokémon
const promises = []

//1-4 nombre de pokémons à afficher
let limit = 95

//1-5 nombre de pokémons à afficher par ajout 
let displayPoke = 21

//1-6 url de l'api pokeai
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`

//1-7 Les DOM nécessaire à l'application
const inputSearch = document.querySelector('.search_pok input');

// =====================
//2- FUNCTION DE L'APPLI
// =====================

//2-1 fonction pour récupérer les données de l'api
async function getData(url) {
    //fetch renvoie une promesse
    const res = await fetch(url)
    const data = await res.json()

    return data
}

// 3-1 fonction pour récupérer les données complètes de chaque pokémon
//nombre de pokemon obtenu
let counter = 0
const fetchFullPok = (pokemon) => {
    //Récupérer les données complets du pokèmon à chaque itération 
    let objPokemonFull = {}
    //nom de chaque pokemon
    let nameP = pokemon.name
    //url de chaque pokemon
    let urlPoke = pokemon.url
    return getData(urlPoke)
        .then((pokeData) => {
            // Compter le nombre de pokémons obtenus
            counter++
            // Récupérer les données nécessaires
            objPokemonFull.pic = pokeData.sprites.front_default
            objPokemonFull.type = pokeData.types[0].type.name
            objPokemonFull.id = pokeData.id
            return getData(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then((pokeData) => {
                    objPokemonFull.name = pokeData.names[4].name
                    allPokemon.push(objPokemonFull)
                })
        })

}

// 2-2 fonction pour créer les cards des pokémons
const createCard = (arr) => {
    for (let i = 0; i < arr.length; i++) {

        // Créer l'élément liste
        const card = document.createElement('li')

        // Ajouter une style via class pour la card
        card.classList.add('card_pok')

        //Créer un élément titre pour ajouter le nom de pokemon
        const titre = document.createElement('h5')
        titre.textContent = arr[i].name

        //Créér un élément para pour ajouter l'id de pokemon
        const p = document.createElement('p')
        p.textContent = arr[i].id

        //Créer un élément image pour ajouter l'image de pokemon
        const img = document.createElement('img')
        img.src = arr[i].pic

        card.appendChild(titre)
        card.appendChild(p)
        card.appendChild(img)

        document.querySelector('.list_pok').appendChild(card)
    }
}

// 2-2 Fonction recherche et ajouter un pokemon
const searchPok = document.querySelector('.search_pok')
let index = displayPoke

// 2-3 Fonction pour trouver un pokemon
const find = () => {
    //on vide la liste avant d'afficher le résultat de la recherche
    // document.querySelector('.list_pok').innerHTML = ""

    //ajouter les pokémons si le nombre de pokémons affichés est inférieur au nombre total de pokémons  
    if (index < counter) {
        addPoke(counter - index)
    }

    let fillter, allLi, titleValue, allTitles;
    fillter = search.value.toUpperCase()
    allLi = document.querySelectorAll('li')
    allTitles = document.querySelectorAll('li > h5')

    for (let i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText
        // Comparer le texte de recherche avec le nom de chaque pokemon
        if (titleValue.toUpperCase().indexOf(fillter) > -1) {
            allLi[i].style.display = "flex"
            allLi[i].style.justifyContent = "center"
            allLi[i].style.alignItems = "center"
            allLi[i].style.width = "300px"
        } else {
            allLi[i].style.display = "none"
        }
    }
}

// 2-4 Fonction pour ajouter des pokémons au fur et à mesure du scroll
function addPoke(num) {
    if(index >= counter) return

    let nextIndex = index + num
    arrFin = allPokemon.sort((a, b) => a.id - b.id).slice(index, nextIndex)
    createCard(arrFin)
    index += num
}


//4 - Ecouteur d'événement et appels de fonctions
// 4-1 Récupérer les données de l'api
getData(url)
    .then((allPoke) => {
        allPoke.results.forEach(pokemon => {
            promises.push(fetchFullPok(pokemon).catch(e => console.error("erreurApi :", e)))
            // throw new Error("erreurApi : impossible de récupérer les données de l'api")
        })
    })
    .then(() => {
        //Mettre les données dans allPokemon
        Promise.all(promises)
            .then(() => {
                arrFin = allPokemon.sort((a, b) => a.id - b.id).slice(0, displayPoke)
                createCard(arrFin)
                document.querySelector('.loader').style.display = "none"
            })
    })
    .catch(console.error)

// 4-2 Recherche de pokemon et changement d'état
searchPok.addEventListener('submit', (e) => {
    e.preventDefault()
    find()
})

// Changer l'état de label quand on clique sur input
inputSearch.addEventListener('click', (e) => {
    document.querySelector('section .search_pok label').classList.add('active')
})

// Effacer le label si l'input est vide quand on quitte l'input
inputSearch.addEventListener('blur', (e) => {
    if (inputSearch.value === "") {
        document.querySelector('section .search_pok label').classList.remove('active')
    }
})

// Afficher le reste des cartes au fur et au mèsure que l'on défile la page.
window.addEventListener('scroll', () => {
    // console.log(document.documentElement);
    
    // Afficher la distance entre le haut de la page et le haut de la fenêtre
    console.log(document.documentElement.scrollTop);
    // Afficher la hauteur de la fenêtre
    console.log(document.documentElement.clientHeight);
    // Afficher la hauteur totale de la page
    console.log(document.documentElement.scrollHeight);
    

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        addPoke(6)
}})

