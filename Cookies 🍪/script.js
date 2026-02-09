// 1 - Variables and constantes :
const today = new Date();                               // Date d'aujourd'hui
const nextWeek = new Date(today.getTime() +
    7 * 24 * 60 * 60 * 1000);                               // Nombre exacte de la semaine en ms

let day = ('0' + nextWeek).slice(9, 11);                // Capturer le jour
let month = (('0' + (today.getMonth() + 1))).slice(-2)   // Capturer le mois
let year = today.getFullYear()                          // Capturer l'année

// A-1 Les DOM nécessaires :
const display = document.querySelector('.display')
const btns = document.querySelectorAll('button')
const inputs = document.querySelectorAll('input')
const infoTxt = document.querySelector('.info')
let done = false
let a

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`
// 2 - Fonctions
const creerCookie = (name, value, exp) => {
    // Et vider le contenu de l'info
    infoTxt.innerHTML = "";

    // Vider le contenu texte dans l'affichage
    display.textContent = "";


    // On stocke tous les cookies et on le découpe
    let cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
        cookie = cookie.trim()

        // On crée un tableau pour séparer l'attribut et la valeur dans formatCookie
        let formatCookie = cookie.split('=');

        if(formatCookie[0] === encodeURIComponent(name)){
            done = true
        }

    })
    // Vérifier si le nom de cookie existe déjà
    if (done) {
        infoTxt.textContent = 'Le nom est déjà utilsé !'
        done = false
        return
    }

    // Vérifier si le nom de cookie est bien été créé
    if (name.length == 0) {
        infoTxt.textContent = 'Impossible de créer un cookie sans nom !'
        return
    }
    // Insérer le cookie créer dans document.cookie 
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expire=${exp.toUTCString()}`;

    // Créer un élément li pour le display pour afficher le cookie
    let info = document.createElement('li');

    info.innerText = `cookie ${name} créé.`

    display.appendChild(info)

    setTimeout(()=>{
        info.remove()
    }, 1500)
}

// 2 - Afficher tous les cookies
const listeCookie = () => {
    let cookies = document.cookie.split(';')

    // Si on a une cookie vide
    if (cookies.join() == '') {
        infoTxt.textContent = 'La liste de cookie est vide !'
        return
    }

    display.innerHTML = '';

    cookies.forEach(cookie => {
        cookie = cookie.trim()
        let formatCookie = cookie.split('=')

        infoTxt.textContent = 'Cliquer sur le nom pour supprimer'

        let item = document.createElement('li')
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, valeur : ${decodeURIComponent(formatCookie[1])}`

        display.appendChild(item)

        item.addEventListener('click', () => {
            //On créer un nouveau cookie ou mettre à le cookie si il est déjà créé
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`

            item.innerText = `cookie : ${formatCookie[0]} supprimé !`

            setTimeout(()=>{
                item.remove()
            }, 1000)
            
        })
    })
}


// 2 - L'action qu'on on clique sur le bouton


// Application :
btns.forEach(btn => {
    btn.addEventListener('click', btnAction)

})

function btnAction(e) {
    let navObj = {};

    inputs.forEach((input) => {
        let attrName = input.getAttribute('name')

        // On attribue à attrValue la valeur de chaque champs si la valeur de l'attribut name
        // est différent de cookie_expire sinon la valeur est considéré comme date 
        let attrValue = attrName !== 'cookie_expire' ? input.value : input.valueAsDate;

        // - Ajouter dans l'objet comme propriéte l'attribut name et valeur de l'attribut name
        navObj[attrName] = attrValue
    })

    let description = e.target.getAttribute('data-cookie')

    if (description == 'create') {
        creerCookie(navObj.cookie_name, navObj.cookie_value, navObj.cookie_expire);
    } else if (description == 'all_display') {
        listeCookie();
    }
}
// - Explication :
/*
    input.valueAsDate : est une propriété de l'élément HTML, time ou datetime-local.
    Elle permet de lire ou définer leur valeur directement sous forme d'objet Date.
    Elle simplifie la manipulation des dates en évitant la formatage manuel YYYY-MM-DD.

    split() : c'est une méthode de string qui prend 2 parmaètres l'un le séparateur qui permet
    de définir où couper le string et l'autre limite.

    Elle permet de découper une string en sou-châine, elle ne modifie pas la chaîne d'origine
    Elle retourne une nouvelle array.

    encodeURIComponent() : C'est une fonction native de JS qui encode des caractère spèciaux dans
    une string en remplacant le carctères par son équivalent en UTF-8.

    join() : c'est une méthode de string pour retourner un nouveau tableau sans modifier
    le tableau d'origine.

    Elle permet de transformer tous les éléments de array en une string en concatenant les
    élément en utilisant un séparateur qui est un en paramètre, virgule par défaut entre
    chaque élément.
*/

// console.log(document.cookie);
