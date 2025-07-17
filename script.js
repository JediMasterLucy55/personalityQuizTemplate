// Define possible results
const result1 = "You’re a Visionary!";
const result2 = "You’re a Strategist!";
const result3 = "You’re a Creator!";
const result4 = "You’re a Leader!";

// Define questions and which results they contribute to
const questions = [
  {
    question: "What do you enjoy most?",
    answers: [
      { text: "Inventing things", results: [result1] },
      { text: "Making plans", results: [result2] },
      { text: "Designing or drawing", results: [result3] },
      { text: "Organizing people", results: [result4] }
    ]
  },
  {
    question: "Pick a color:",
    answers: [
      { text: "Blue", results: [result1] },
      { text: "Green", results: [result2] },
      { text: "Pink", results: [result3] },
      { text: "Red", results: [result4] }
    ]
  }
];

// Load quiz questions into the form
const form = document.getElementById("quiz");

questions.forEach((q, qIndex) => {
  const box = document.createElement("div");
  const questionEl = document.createElement("h2");
  questionEl.textContent = q.question;
  box.appendChild(questionEl);

  q.answers.forEach((a, aIndex) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${qIndex}`;
    input.id = `q-${qIndex}-a-${aIndex}`;
    input.value = JSON.stringify(a.results);

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = a.text;

    box.appendChild(input);
    box.appendChild(label);
    box.appendChild(document.createElement("br"));
  });

  form.appendChild(box);
});

// When the user clicks Submit
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault(); // Don't reload the page

  const counts = {
    [result1]: 0,
    [result2]: 0,
    [result3]: 0,
    [result4]: 0
  };

  // Tally results
  questions.forEach((_, qIndex) => {
    const selected = document.querySelector(`input[name="question-${qIndex}"]:checked`);
    if (selected) {
      const results = JSON.parse(selected.value);
      results.forEach(res => {
        counts[res]++;
      });
    }
  });

  // Pick top result
  let topResult = null;
  let max = 0;

  for (let res in counts) {
    if (counts[res] > max) {
      max = counts[res];
      topResult = res;
    }
  }

  // Fallback if no answers selected
  if (!topResult) {
    const allResults = [result1, result2, result3, result4];
    topResult = allResults[Math.floor(Math.random() * allResults.length)];
  }

  // Redirect to results page with result in URL
  window.location.href = `results.html?result=${encodeURIComponent(topResult)}`;
});
