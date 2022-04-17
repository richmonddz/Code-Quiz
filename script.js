var questions = [
  {
    numb: 1,
    question: "What type of Pokemon is Pikachu?",
    answer: "D",
    optA: "Water Type",
    optB: "Ground Type",
    optC: "Fire Type",
    optD: "Electric Type",
  },
  {
    numb: 2,
    question:
      "What item is used to log a trainers Pokemon encounters along their journey?",
    answer: "A",
    optA: "A Pokedex",
    optB: "A Pokelist",
    optC: "A Pokepad",
    optD: "A Pokebowl",
  },
  {
    numb: 3,
    question: "What item do you aquire after defeating a gym leader?",
    answer: "C",
    optA: "A keycard",
    optB: "A pat on the back",
    optC: "A badge",
    optD: "A Pokenet",
  },
  {
    numb: 4,
    question:
      "What are the 3 starter pokemon a trainer is presented with at the start of their journey?",
    answer: "C",
    optA: "Digglet, Geodude, Onyx",
    optB: "Weedle, Gastly, Mew",
    optC: "Charmander, Bulbasaur, Squirtle",
    optD: "Gyarados, Dragonite, Eevee",
  },
  {
    numb: 5,
    question: "What is the item used to capture a Pokemon?",
    answer: "D",
    optA: "A Pokebowl",
    optB: "A Pokecage",
    optC: "A Poketrap",
    optD: "A Pokeball",
  },
  {
    numb: 6,
    question: "What type is most effective towards a fire type Pokemon?",
    answer: "A",
    optA: "A water type",
    optB: "A grass type",
    optC: "A flying type",
    optD: "A bug type",
  },
  {
    numb: 7,
    question: "Where do you go to heal and revive your Pokemon after a battle?",
    answer: "B",
    optA: "A Pokemart",
    optB: "A Pokecenter",
    optC: "A Pokemall",
    optD: "A Pokehospital",
  },
  {
    numb: 8,
    question:
      "Who is the main character/trainer in the Pokemon series? (1990s)",
    answer: "A",
    optA: "Ash",
    optB: "Asher",
    optC: "Ashley",
    optD: "Ashy Knees",
  },
];

var thequiz = document.getElementById("quiz");
var theresult = document.getElementById("result");
var thefinalscore = document.getElementById("finalScore");
var itsgameover = document.getElementById("gameover");
var thequestions = document.getElementById("questions");
var quiztimer = document.getElementById("timer");
var startbtn = document.getElementById("letsgo");
var startquiz = document.getElementById("start");
var highscorebox = document.getElementById("highscorebox");
var highscorediv = document.getElementById("highscorepage");
var hsinitials = document.getElementById("initials");
var highscoredisplayname = document.getElementById("highscore-initials");
var highscoredisplayscore = document.getElementById("highscore-user");
var submitscorebtn = document.getElementById("submitscore");
var endGameBtns = document.getElementById("endGameBtns");
var btnA = document.getElementById("A");
var btnB = document.getElementById("B");
var btnC = document.getElementById("C");
var btnD = document.getElementById("D");
var lastquestion = questions.length;
var statusquestion_i = 0;
var timeremain = 30;
var timetick;
var score = 0;
var correct;

function pullQuestions() {
  itsgameover.style.display = "none";
  if (statusquestion_i === lastquestion) {
    return revealhighscore();
  }
  var mainquestion = questions[statusquestion_i];
  thequestions.innerHTML = "<p>" + mainquestion.question + "<p>";
  btnA.innerHTML = mainquestion.optA;
  btnB.innerHTML = mainquestion.optB;
  btnC.innerHTML = mainquestion.optC;
  btnD.innerHTML = mainquestion.optD;
}
function starttheQuiz() {
  pullQuestions();
  timetick = setInterval(function () {
    timeremain--;
    quiztimer.textContent = "Time Remaining: " + timeremain;
    if (timeremain === 0) {
      clearInterval(timeremain);
      showsthescore();
    }
  }, 1000);
  thequiz.style.display = "block";
}
function showsthescore() {
  thequiz.style.display = "none";
  itsgameover.style.display = "flex";
  clearInterval(timetick);
  hsinitials.value = "";
  finalscore.innerHTML = "Your Score: " + questions.length;
}
submitscorebtn.addEventListener("click", function highscore() {
  if (hsinitials.value === "") {
    alert("Please enter a valid input");
    return false;
  } else {
    var quicksave = JSON.parse(localStorage.getItem("quicksave")) || [];
    var theplayer = hsinitials.value.trim();
    var mainhs = {
      name: theplayer,
      score: score,
    };
    itsgameover.style.display = "none";
    highscorebox.style.display = "flex";
    highscorediv.style.display = "block";
    endGameBtns.style.display = "flex";

    quicksave.push(mainhs);
    localStorage.setItem("mainhs", JSON.stringify(mainhs));
    generateHighscores();
  }
});
function generateHighscores() {
  highscoredisplayname.innerHTML = "";
  highscoredisplayscore.innerHTML = "";
  var highscore1 = JSON.parse(localStorage.getItem("quicksave")) || [];
  for (i = 0; i < highscore1.length; i++) {
    var newplayer = document.createElement("li");
    var newscore = document.createElement("li");
    newplayer.textContent = highscore1[i].name;
    newscore.textContent = highscore1[i].score;
    highscoredisplayname.appendChild(newplayer);
    highscoredisplayscore.appendChild(newscore);
  }
}
function revealhighscore() {
  startquiz.style.display = "none";
  gameoverdiv.style.display = "none";
  highscorebox.style.display = "none";
  highscorediv.style.display = "block";
  endGameBtns.style.display = "block";

  generateHighscores();
}
function clearhs() {
  window.localStorage.clear();
  highscoredisplayname.textContent = "";
  highscoredisplayscore.textContent = "";
}
function tryagain() {
  highscorebox.style.display = "none";
  gameoverdiv.style.display = "none";
  startquiz.style.display = "flex";
  timeremain = 30;
  score = 0;
  statusquestion_i = 0;
}
function checkAnswer(answer) {
  correct = questions[statusquestion_i].answer;
  if (answer === correct && statusquestion_i !== lastquestion) {
    alert("Correct!! Its Super Effective");
    statusquestion_i++;
    pullQuestions();
  } else if (answer !== correct && statusquestion_i !== lastquestion) {
    alert("Wrong!! Not Very Effective");
    statusquestion_i++;
    timeremain -= 5;
    pullQuestions();
  } else {
    showsthescore();
  }
}

startbtn.addEventListener("click", starttheQuiz);
