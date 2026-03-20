let quizData = [];
let currentQuestion = 0;

function loadQuiz() {
    const quizContainer = document.getElementById('result');

    while (quizContainer.firstChild) {
        quizContainer.removeChild(quizContainer.firstChild);
    }

    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${item.question}`;
        questionDiv.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        Object.keys(item.answers).forEach(key => {
            if (key !== 'correct') {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`;
                radio.value = key;
                radio.id = `q${index + 1}_${key}`;

                const label = document.createElement('label');
                label.htmlFor = radio.id;
                label.textContent = `${key.toUpperCase()}. ${item.answers[key]}`;

                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                optionsDiv.appendChild(optionDiv);
            }
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

fetch('questionAnswerData.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuiz();
    })
    .catch(error => console.log('error', error));