const questionsAndChoices = [
    {
        question: "🌍 What is the largest country in the world by land area?",
        answers: [
            { text: "A. China", correct: false },
            { text: "B. Russia", correct: true },
            { text: "C. USA", correct: false },
            { text: "D. Canada", correct: false }
        ]
    },
    {
        question: "🧮 What is the square root of 144?",
        answers: [
            { text: "A. 10", correct: false },
            { text: "B. 14", correct: false },
            { text: "C. 16", correct: false },
            { text: "D. 12", correct: true }
        ]
    },
    {
        question: "📖 Who wrote the play Romeo and Juliet?",
        answers: [
            { text: "A. Charles Dickens", correct: false },
            { text: "B. Mark Twain", correct: false },
            { text: "C. William Shakespeare", correct: true },
            { text: "D. Jane Austen", correct: false }
        ]
    },
    {
        question: "💻 In web development, what does “CSS” stand for?",
        answers: [
            { text: "A. Cascading Style Sheets", correct: true },
            { text: "B. Computer Style Sheets", correct: false },
            { text: "C. Creative Styling System", correct: false },
            { text: "D. Code Styling Syntax", correct: false }
        ]
    },
    {
        question: "🚀 Which planet in our solar system is known as the “Red Planet”?",
        answers: [
            { text: "A. Earth", correct: false },
            { text: "B. Venus", correct: false },
            { text: "C. Mars", correct: true },
            { text: "D. Saturn", correct: false },
        ]
    }
]

const submitName = document.getElementById("submit-name");
let name = "";

submitName.addEventListener("click", () => {
    name = document.getElementById("name").value.trim();

    document.getElementById("name").value = "";
    showQuizPrompt();
});

function showQuizPrompt() {
    const quizPrompt = document.getElementById("quiz-prompt");
    const namePrompt = document.getElementById("greeting-card");
    quizPrompt.classList.add("visible");
    namePrompt.classList.remove("visible");

    const greet = document.getElementById("greeting");
    greet.innerText = `Hello, ${name}!`;

    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");

    yesBtn.addEventListener("click", () => {
        startQuiz(quizPrompt);
    });

    noBtn.addEventListener("click", () => {
        alert("Wala kang choice hehe");
        startQuiz(quizPrompt);
    });
}
 
const quizNumber = document.getElementById("quiz-number");
const question = document.getElementById("question");
const choiceBox = document.getElementById("choice-box");
const quizCard = document.getElementById("quiz-card");

let score = 0;
let currentQuestionIndex = 0;

function startQuiz(quizPrompt) {
    score = 0;
    currentQuestionIndex = 0;

    quizCard.classList.add("visible");
    quizPrompt.classList.remove("visible");
    
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questionsAndChoices[currentQuestionIndex];
    const questionNumber = document.getElementById("quiz-number");
    const question = document.getElementById("question");
    const choiceBox = document.getElementById("choice-box");

    questionNumber.innerHTML = `Question # ${currentQuestionIndex + 1}`;
    question.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("choice");
        choiceBox.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    while (choiceBox.firstChild) {
        choiceBox.removeChild(choiceBox.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    if (currentQuestionIndex < questionsAndChoices.length) {
        setTimeout(() => {
            handleNextButton();
        }, 500);
    } else {
        endQuiz();
    }
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsAndChoices.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

const endModal = document.getElementById("end-modal");

function endQuiz() {
    quizCard.classList.remove("visible");

    const endName = document.getElementById("endName");
    const points = document.getElementById("points");
    const congrats = document.getElementById("congrats");

    let pambati = "";

    switch (score) {
        case 0:
            pambati = "nubayan bossing ";
            break;
        
        case 1:
            pambati = "oks lang naman ";
            break;

        case 2:
            pambati = "g na yan ";
            break;

        case 3:
            pambati = "uy galing ";
            break;

        case 4:
            pambati = "shet, sheldon?"
            break;

        case 5:
            pambati = "wag ka na mag-aral boi"
            break;
    }

    let percentage = (score / 5) * 100;

    endName.innerHTML = `Congrats, ${name}!`;
    points.innerHTML = `${score} / 5 (${percentage}%)`;
    congrats.innerHTML = pambati;

    endModal.classList.add("visible");
}

document.getElementById("startButton").addEventListener("click", () => {
    setTimeout(() => {
        location.reload();
    }, 1500);
    alert("refreshing page lods wait ka 1.5 seconds");
});

