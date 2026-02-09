//1- Mes Variables :

//1-1 La liste de notre prochaine question
const questions = [
  "Quelle balise HTML permet de créer un paragraphe ?",
  "Comment changer la couleur du texte en CSS ?",
  "Quelle propriété CSS est utilisée pour définir l'espacement intérieur d'un élément ?",
  "Comment déclarer une variable en JavaScript avec let ?",
  "Quelle méthode JavaScript permet d'afficher un message dans la console ?"
];

//1-2 L'option à répondre dans notre porchaine quesiton
const options = [
  ["p", "paragraph", "pg", "text"],
  ["text-color", "font-color", "color", "text-style"],
  ["margin", "padding", "border", "spacing"],
  ["let variable = value", "var variable = value", "const variable = value", "variable let = value"],
  ["console.log()", "console.info()", "console.warn()", "console.error()"]
];

// Index des bonnes réponses dans les options
const answers = ["a", "c", "b", "a", "a"];

let nextQst = 1;
let nextAns = 1;
//Calculer on incrémentant le socre si c'est true
let score = 0;
let tabRes = []

//2 - Mes Fonctions :

//Une fonction qui vérifie les réponses et calcule le score
function calculateScore(tabRes) {
  if (Array.isArray(tabRes)) {
    for (let i = 0; i < tabRes.length; i++) {
      if (tabRes[i] === answers[i]) {
        score++;
      }
    }
  } else {
    return
  }
}

//fonction  propre de notre input
function setInput() {
  //Remettre les inputs à false et ajouter un écouteur d'évènement à chaque input
  //et quand on change un input, le bouton redevient cliquable
  document.querySelectorAll("input").forEach(x => {
    // x.style.display= "none"
    x.checked = false
    x.addEventListener("input", (e) => {
      document.querySelector(`button[type="submit"]`).disabled = false
    })
  }
)
}

// Afficher le résultat
function result() {
  document.querySelector(".box_quiz").style.display = "none"
  document.querySelector(".box_result").style.display = "block"
  document.querySelector(".score_result").innerText = score
  document.querySelector(".total_result").innerText = answers.length
}


document.addEventListener("DOMContentLoaded", () => {
  //Le code à l'intérieur de cette fonction sera exécuté une fois que le DOM est complètement chargé
  const form = document.querySelector("form")
  const question = document.getElementById("question_text");
  const option = document.querySelectorAll(".option_text")
  const start = document.querySelectorAll(".start")

  start.forEach(x => {
    x.addEventListener('click', (e) => {
      console.log(x);
      document.querySelector(".card_quiz").style.display = "none"
      document.querySelector(".box_quiz").style.display = "block"

      if(document.querySelector('.box_quiz').style.display == "block" ){
        document.querySelector(".box_result").style.display = "none"
      }
      nextQst = 1
      score = 0
      tabRes = []
    })
  })
  
  setInput();
  
  form.addEventListener('submit', (e) => {
    
    //Empêcher le formulaire d'exécuter l'action par défaut quand on appuyie sur submit
    //Permet aussi de rester sur la même page
    e.preventDefault()
    
    //Mettre à jour la question et les options
    console.log(nextQst);
    document.querySelector(`button[type="submit"]`).disabled = true
    
    question.innerText = questions[nextQst]
    option.forEach(element => {
      element.innerText = options[nextQst][nextAns]
      nextAns++
    })
    //Récupérer la valeur de l'input sélectionné et la pousser dans le tableau tabRes
    //utiliser queryselector pour séléction l'input avec l'attribut name = "qlc" et checked
    tabRes.push(document.querySelector('input[name="option"]:checked').value)
    
    setInput();
    
    if (tabRes.length == answers.length) {
      calculateScore(tabRes)
      result()
    }

    nextQst++
    nextQst = nextQst % questions.length
    nextAns = 0
  })

})
