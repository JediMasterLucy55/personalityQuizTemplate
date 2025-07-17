const summer = "summer";
const spring = "spring";
const winter = "winter";
const fall = "fall";

const questions = [
    {
        question: "What is your favorite food?",
        answers: [
            {text: "S'mores", results: [summer]},
            {text: "Pizza", results: [fall]},
            {text: "Soup", results: [winter]},
            {text: "Salad", results: [spring]}
        ]
    },

    {
        question: "What is your favorite color?",
        answers: [
            {text: "Red", results: [fall]},
            {text: "Yellow", results: [summer]},
            {text: "Blue", results: [winter]},
            {text: "Rainbow", results: [spring]}
        ]
    },

    {
        question: "What is your favorite vacation spot?",
        answers: [
            {text: "beach", results: [summer]},
            {text: "mountains", results: [winter]},
            {text: "city", results: [fall]},
            {text: "forest", results: [spring]}
        ]
    },

    {
        question: "If you had elemental abilities, which element would you want to control?",
        answers: [
            {text: "fire", results: [winter]},
            {text: "water", results: [summer]},
            {text: "wind", results: [spring]},
            {text: "earth", results: [fall]}
        ]
    },

    {
        question: "How many letters does your first name have?",
        answers: [
            {text: "four", results: [fall]},
            {text: "six", results: [summer]},
            {text: "eight", results: [winter]},
            {text: "other", results: [spring]}
        ]
    }
]

const form = document.getElementById("quiz");

questions.forEach((q, qIndex) => {
    const quizBox = document.createElement("div");
    quizBox.classList.add("quiz-box");

    const questionText = document.createElement("h2");
    questionText.textContent = q.question;
    quizBox.appendChild(questionText);

    q.answers.forEach((a, aIndex) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${qIndex}`;
        input.id = `q-${qIndex}-a-${aIndex}`;
        input.value = JSON.stringify(a.results);

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = a.text;

        quizBox.appendChild(input);
        quizBox.appendChild(label);
        quizBox.appendChild(document.createElement("br"));
    })

    form.appendChild(quizBox);

})

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e) => {

    e.preventDefault();

    const counts = {
        summer: 0,
        spring: 0,
        winter: 0,
        fall: 0
    };

    questions.forEach((_, qIndex) => {
        const selected = document.querySelector(`input[name="question-${qIndex}"]:checked`);
        if (selected) {
            const results = JSON.parse(selected.value);
            results.forEach(result => {
                if (result === summer) counts.summer++;
                if (result === spring) counts.spring++;
                if (result === winter) counts.winter++;
                if (result === fall) counts.fall++;
            });
        }
    })

    let topResult = null;
    let maxCount = 0;

    for (let answer in counts) {
        if (counts[answer] > maxCount) {
            maxCount = counts[answer];
            topResult = answer;
        }
    }

    if (topResult) {
        window.location.href = `results.html?result=${topResult}`;

    } else {
        const allResults = [result1, result2, result3, result4];
        topResult = allResults[Math.floor(Math.random() * allResults.length)];

    }



    if (!topResult) {
        topResult = randomResult;
        window.location.href = `results.html?result=${topResult}`;
    }

});