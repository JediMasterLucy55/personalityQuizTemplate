// here we will make variables that hold the result of the quiz! don't forget your semicolons!
// const means the variable will never change, result1 is the name of the variable, and Result 1 is the string that the variable stores
const result1 = "Result 1"; // stores one possible quiz outcome
const result2 = "Result 2"; // stores another possible quiz outcome
const result3 = "Result 3"; // stores another possible quiz outcome
const result4 = "Result 4"; // stores another possible quiz outcome

// makes an object called questions that stores the template for your questions. add the question itself into where it says Sample Question, the answers go into text, and the result variables go into the brackets. You can have more than one result per answer!
const questions = [
    {
        question: "Sample Question", // the question text
        answers: [ // possible answers for this question
            {text: "A", results: [result1]}, // choosing A gives points to result1
            {text: "B", results: [result2]}, // choosing B gives points to result2
            {text: "C", results: [result3]}, // choosing C gives points to result3
            {text: "D", results: [result4]}  // choosing D gives points to result4
        ]
    },

    {
        question: "", // placeholder for another question
        answers: [
            {text: "", results: []}, // fill in text and results later
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
const form = document.getElementById("quiz"); // grabs the quiz form from HTML

questions.forEach((q, qIndex) => { // goes through each question in the list
    const quizBox = document.createElement("div"); // makes a box for each question
    quizBox.classList.add("quiz-box"); // gives it a class name for styling

    const questionText = document.createElement("h2"); // makes a header for the question
    questionText.textContent = q.question; // puts the actual question text inside
    quizBox.appendChild(questionText); // adds the question to the quiz box

    q.answers.forEach((a, aIndex) => { // goes through each answer for that question
        const input = document.createElement("input"); // makes a radio button
        input.type = "radio"; // sets type so only one answer can be picked
        input.name = `question-${qIndex}`; // groups answers by question number
        input.id = `q-${qIndex}-a-${aIndex}`; // unique id for each answer
        input.value = JSON.stringify(a.results); // stores which results this answer affects

        const label = document.createElement("label"); // makes label for the answer
        label.htmlFor = input.id; // connects label to the button
        label.textContent = a.text; // shows answer text

        quizBox.appendChild(input); // adds button
        quizBox.appendChild(label); // adds label
        quizBox.appendChild(document.createElement("br")); // line break
    })

    form.appendChild(quizBox); // adds the finished question to the quiz form

})

// and this will make the button go to the results page and give you your answer
const submitButton = document.getElementById("submit"); // grabs the submit button

submitButton.addEventListener("click", (e) => { // runs when button is clicked

    e.preventDefault(); // stops page from reloading

    // CHANGE THE VARIABLE NAMES HERE TO FIT YOUR VARIABLES
    const counts = { // keeps track of how many times each result is chosen
        result1: 0,
        result2: 0,
        result3: 0,
        result4: 0
    };

    questions.forEach((_, qIndex) => { // checks what answers were picked
        const selected = document.querySelector(`input[name="question-${qIndex}"]:checked`);
        if (selected) { // if an answer was selected
            const results = JSON.parse(selected.value); // turns stored string back into data
            results.forEach(result => {
                // CHANGE THE VARIABLE NAMES HERE TOO
                if (result === result1) counts.result1++; // adds a point to result1
                if (result === result2) counts.result2++; // adds a point to result2
                if (result === result3) counts.result3++; // adds a point to result3
                if (result === result4) counts.result4++; // adds a point to result4
            });
        }
    })

    let topResult = null; // stores which result wins
    let maxCount = 0; // stores the highest number of votes

    for (let answer in counts) { // goes through each result
        if (counts[answer] > maxCount) { // finds the one with the most votes
            maxCount = counts[answer];
            topResult = answer;
        }
    }

    if (topResult) { // if a clear winner exists
        window.location.href = `results.html?result=${topResult}`; // go to results page
    } else {
        // AND HERE CHANGE THEM HERE
        const allResults = [result1, result2, result3, result4]; // list of all results
        topResult = allResults[Math.floor(Math.random() * allResults.length)]; // picks random if none chosen
    }

    if (!topResult) { // backup if something went wrong
        topResult = randomResult;
        window.location.href = `results.html?result=${topResult}`; // go to results page
    }

});

// ask me, google, or ChatGPT if you are interested in what this code does specifically
