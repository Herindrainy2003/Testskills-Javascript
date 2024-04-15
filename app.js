//recuperons notre element html
let question = document.querySelector("#question");
let response = document.querySelector("#response");
let validateBtn = document.querySelector("#validateBtn");
let start = document.querySelector("#start");
let noteDisplay = document.querySelector("#note");
let scorefinale = document.querySelector("#scorefinale");

//L'array de tous les questions et les reponses
const quiz = [
  {
    question: "Quel est le résultat de l'expression typeof null ?",
    reponse: "object",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(1 + '2' + '2') ?",
    reponse: "122",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(1 + +'2' + '2') ?",
    reponse: "32",
  },

  {
    question: "Quelle est la sortie de ce code : console.log(3 + 4 + '5') ?",
    reponse: "75",
  },
  {
    question: "Quelle est la sortie de ce code : console.log('3' + 4 + 5) ?",
    reponse: "345",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(3 + 4 - '5') ?",
    reponse: "24",
  },
  {
    question: "Quelle est la sortie de ce code : console.log('3' - 2) ?",
    reponse: "1",
  },
  {
    question: "Quelle est la sortie de ce code : console.log([] + []) ?",
    reponse: "",
  },
  {
    question:
      "Quelle est la sortie de ce code : console.log((function f(){ return f; })() === window) ?",
    reponse: "true",
  },
  {
    question:
      "Quelle est la sortie de ce code : console.log((function f(){ return f; })() === this) ?",
    reponse: "false",
  },
];


//L'array contient les niveau Moyen

const quizNiveauMoyen = [
  {
    question: "Quelle est la sortie de ce code : console.log([] === []) ?",
    reponse: "false",
  },
  {
    question: "Quelle est la sortie de ce code : console.log([] == ![]) ?",
    reponse: "true",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(NaN === NaN) ?",
    reponse: "false",
  },
  {
    question:
      "Quelle est la sortie de ce code : console.log(undefined == null) ?",
    reponse: "true",
  },
  {
    question:
      "Quelle est la sortie de ce code : console.log(typeof typeof 1) ?",
    reponse: "string",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(1 < 2 < 3) ?",
    reponse: "true",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(3 > 2 > 1) ?",
    reponse: "false",
  },
  {
    question:
      "Quelle est la sortie de ce code : console.log('b' + 'a' + +'a' + 'a') ?",
    reponse: "baNaNa",
  },
  {
    question: "Quelle est la sortie de ce code : console.log([] + 1) ?",
    reponse: "1",
  },
  {
    question: "Quelle est la sortie de ce code : console.log(1 + {}) ?",
    reponse: "1[object Object]",
  },
];

//initialisation de note et du i pour gerer l'affichage du question
let i = 0;
let note = 0;
let niveauMoyen = false; //desactiver le niveau moyen

//lancer le game
start.addEventListener("click", () => {
  displayQuestion(i);
});

validateBtn.addEventListener("click", verifyResponse); //qui declenche l'evenement

//on affiche notre question dans notre pages
function displayQuestion(i) {
  if (i < quiz.length) {
    if (niveauMoyen === false) {
      question.textContent = quiz[i].question; //on affiche le question de niveau faible si le niveau moyen est desactiver
    } else {
      question.textContent = quizNiveauMoyen[i].question; //on affiche le question de niveau moyen est activer
    }
  } else {
    return endQuiz(); 
  }
}

//fonction pour verifier la reponse
function verifyResponse() {
  let responseInput = response.value;
  niveauMoyen
    ? (responseTrue = quizNiveauMoyen[i].reponse) //si le niveau moyen est true donc on recupere les responses depuis l'array niveau moyen
    : (responseTrue = quiz[i].reponse);

  if (responseInput === responseTrue) {
    succes(); //on appelle la fonction Toast pour la notification
    i += 1; //augmenter la valeur de i pour que la question suivant arrive
    note += 2; //augmentation la valeur de notre note a 2
    displayQuestion(i); //on passe a la question suivant
    response.value = "";
    noteDisplay.textContent = "Votre points: " + note;
  }else {
    failed();
    i += 1; //augmenter la valeur de i pour que la question suivant arrive
    displayQuestion(i);
    response.value = "";
  }
}



function endQuiz() {
  scorefinale.textContent = "Votre note finale est" + note;
  if (note >= 16) {
    moyenQuizz();
    alert("Niveau 02  Debloquer! cliquer sur start");
  } else {
    alert(
      "votre note est inferieure a 16 donc niveau 02 pas encore debloquer!!"
    );
    restartNiveau();
  }
}



//notificaiton pour la reussite !!
function succes() {
  Toastify({
    text: "Bonne Réponse! + 02 Points",
    duration: 1000, // Durée d'affichage en millisecondes (3 secondes)
    close: true, // Affiche le bouton de fermeture
    gravity: "top", // Position du toast (top, bottom)
    position: "right", // Position du toast (left, center, right)
    backgroundColor: "green", // Couleur de fond
    className: "custom-toast", // Classe CSS personnalisée
  }).showToast();
}


//notificaiton pour l'echec!!
function failed() {
  Toastify({
    text: "Mauvaise Reponse ! 0 Points",
    duration: 1000, // Durée d'affichage en millisecondes (3 secondes)
    close: true, // Affiche le bouton de fermeture
    gravity: "top", // Position du toast (top, bottom)
    position: "right", // Position du toast (left, center, right)
    backgroundColor: "red", // Couleur de fond
    className: "custom-toast", // Classe CSS personnalisée
  }).showToast();
}

//fonction pour lancer le niveau moyen
function moyenQuizz() {
  niveauMoyen = true;
  i = 0;
  note = 0;
}


//fonction pour restarter les niveau pas encore debloquer
function restartNiveau() {
  i = 0;
  note = 0;
  noteDisplay.textContent = 0;
  scorefinale.textContent = "";
  response.value = "";
  question.textContent = "";
}
