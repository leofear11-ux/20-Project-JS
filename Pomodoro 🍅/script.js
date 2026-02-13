document.addEventListener('DOMContentLoaded', () => {
    //Déclaration des varibales nécessaire
    //Variable d'affichage
    const chrWr = document.querySelector("#chrono_work")
    const chrBr = document.querySelector("#chrono_break")
    const qt = document.querySelector(".quote")

    //Variable pour les boutons
    const btnGo = document.querySelector("#start")
    const btnPause = document.querySelector("#break")
    const btnReset = document.querySelector("#reset")

    //Variable pour récuperer les texte d'origine
    let textWr = chrWr.textContent
    let textBr = chrBr.textContent

    //Les variables à afficher
    //Les temps sont en seconde
    const TInit = 120
    const TBreak = 60

    //On les place dans la variable let pour changer la valeur du temps
    let tempsInit = TInit
    let tempsBr = TBreak


    //Les variable de chronomètre
    let chronoStart = 0
    let pause = 0

    //Commencer par le bouton start
    btnGo.addEventListener('click', () => {
        //Si le chrono marche
        console.log(chronoStart);
             
        if (!chronoStart) {
            chronoStart = 1
            if (tempsInit > 0)
                tempsInit--
            // Math.trunc : arrondit le nombre à moitiè prés
            chrWr.textContent = `${Math.trunc(tempsInit / 60)} : ${tempsInit % 60 < 10 ? '0' + (tempsInit % 60) : (tempsInit % 60)}`

            chrBr.textContent = `${'0' + Math.trunc(tempsBr / 60)} : ${tempsInit % 60 < 10 ? '0' + (tempsbr % 60) : '0' + (tempsBr % 60)}`

            let timer = setInterval(() => {
                if (!pause && tempsInit > 0) {
                    tempsInit--;
                    chrWr.textContent = `${Math.trunc(tempsInit / 60)} : ${tempsInit % 60 < 10 ? '0' + (tempsInit % 60) : (tempsInit % 60)}`
                } else if (!pause && tempsInit == 0 && tempsBr == 0) {
                    tempsInit = TInit
                    tempsBr = TBreak
    
                    chrWr.textContent = `${Math.trunc(tempsInit / 60)} : ${tempsInit % 60 < 10 ? '0' + (tempsInit % 60) : (tempsInit % 60)}`
    
                    chrBr.textContent = `${'0' + Math.trunc(tempsBr / 60)} : ${tempsInit % 60 < 10 ? '0' + (tempsBr % 60) : (tempsBr % 60)}`
                } else if (!pause && tempsInit == 0) {
                    tempsBr--;
                    chrBr.textContent = `${'0' + Math.trunc(tempsBr / 60)} : ${tempsBr % 60 < 10 ? '0' + (tempsBr % 60) : (tempsBr % 60)}`
                }
                let timeQuote = setTimeout(()=>{
                    qt.textContent = "Do your best !"
                }, 50)
            }, 1000)
            

    
            btnReset.addEventListener('click', () => {
                clearInterval(timer)
                chronoStart = 0
                pause = 0
                tempsInit = TInit
                tempsBr = TBreak
                chrWr.textContent = textWr
                chrBr.textContent = textBr
                qt.textContent = ""
            })
        }else{
            return
        }

    })

    btnPause.addEventListener('click', ()=>{
        //Si la pause = 0 alors pause = 1
        if(chronoStart){
            btnPause.innerHTML = pause ? `<i class="fa fa-user"></i>`  : `<i class="fa fa-coffee"></i>`
            pause = !pause
        }
    })

})