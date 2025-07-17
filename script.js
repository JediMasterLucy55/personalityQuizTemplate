// here we will make variables that hold the result of the quiz! don't forget your semicolons!
// const means the variable will never change, result1 is the name of the variable, and Result 1 is the string that the variable stores
const result1 = "Result 1";
const result2 = "Result 2";
const result3 = "Result 3";
const result4 = "Result 4";

// makes an object called questions that stores the template for your questions. add the question itself into where it says Sample Question, the answers go into text, and the result variables go into the brackets. You can have more than one result per answer!
const questions = [
    {
        question: "Sample Question",
        answers: [
            {text: "A", results: [result1]},
            {text: "B", results: [result2]},
            {text: "C", results: [result3]},
            {text: "D", results: [result4]}
        ]
    },

    {
        question: "",
        answers: [
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []}
        ]
    },

    {
        question: "",
        answers: [
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []}
        ]
    },

    {
        question: "",
        answers: [
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []}
        ]
    },

    {
        question: "",
        answers: [
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []},
            {text: "", results: []}
        ]
    }
]

// Most of the stuff down here you will not have to edit, this will just put your questions into the website
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

// and this will make the button go to the results page and give you your answer
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e) => {

    e.preventDefault();

    // CHANGE THE VARIABLE NAMES HERE TO FIT YOUR VARIABLES
    const counts = {
        result1: 0,
        result2: 0,
        result3: 0,
        result4: 0
    };

    questions.forEach((_, qIndex) => {
        const selected = document.querySelector(`input[name="question-${qIndex}"]:checked`);
        if (selected) {
            const results = JSON.parse(selected.value);
            results.forEach(result => {
                // CHANGE THE VARIABLE NAMES HERE TOO
                if (result === result1) counts.result1++;
                if (result === result2) counts.result2++;
                if (result === result3) counts.result3++;
                if (result === result4) counts.result4++;
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
        // AND HERE CHANGE THEM HERE
        const allResults = [result1, result2, result3, result4];
        topResult = allResults[Math.floor(Math.random() * allResults.length)];

    }



    if (!topResult) {
        topResult = randomResult;
        window.location.href = `results.html?result=${topResult}`;
    }

});

// ask me, google, or ChatGPT if you are interested in what this code does specifically