document.addEventListener("DOMContentLoaded", function() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    let currentQuestionIndex = 0;
    let score = 0;
    let points = 0;
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const pointsLast = params.get('points');
    let timer;
    let timeLeft;
    const maxTime = 30; // seconds
    const minPoints = 50;
    const maxPoints = 100;

    // Questions data
    const questions = [
        {
            question: "QUal é a classificação da oração 'Enquanto Ricardo sonhava'?",
            options: ["Oração coordenada", "Oração subordinada adjetiva", "Oração subordinada adverbial temporal", "Oração subordinada substantiva"],
            correctAnswerIndex: 2
        },{
            question: "Qual é a função sintática de 'Ricardo' na oração 'Enquanto Ricardo sonhava'?",
            options: ["Sujeito", "Objeto direto", "Predicativo do sujeito", "Complemento indireto"],
            correctAnswerIndex: 0
        },
		{
            question: "Qual é o tempo verbal do verbo 'escapava' na frase?",
			options: ["Presente do indicativo","Pretérito perfeito do indicativo","Pretérito imperfeito do indicativo","Futuro do indicativo"],
            correctAnswerIndex: 2
        },
		{
            question: "Qual é a função sintática de 'lhe' na oração 'a realidade escapava-lhe'?",
            options: ["Sujeito","Complemento direto","Predicativo do sujeito","Complemento indireto"],
            correctAnswerIndex: 3
        }
    ];

    // Function to display the quiz
    function displayQuiz() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(index));
            optionsElement.appendChild(button);
        });
		document.getElementById('timer').textContent = `Tempo restante: 30`
        startTimer();
    }

    // Function to start the timer
    function startTimer() {
        timeLeft = maxTime;
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleAnswer(-1); // No answer selected
            }
			document.getElementById('timer').textContent = `Tempo restante: ${timeLeft}`
        }, 1000);
    }

    // Function to handle answer selection
    function handleAnswer(selectedIndex) {
        clearInterval(timer);

        const currentQuestion = questions[currentQuestionIndex];
        let timeTaken = maxTime - timeLeft;
        if (timeTaken < 0) timeTaken = 0;

        let currentPoints = maxPoints - Math.floor(((timeTaken / maxTime) * (maxPoints - minPoints)));
        if (currentPoints < minPoints) currentPoints = minPoints;

        if (selectedIndex === currentQuestion.correctAnswerIndex) {
            score++;
            points += currentPoints;
            alert(`Correto! Ganhou ${currentPoints} pontos.`);
        } else {
            alert(`Incorreto! A resposta certa era: ${currentQuestion.options[currentQuestion.correctAnswerIndex]}`);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuiz();
        } else {
            showResults();
        }
    }

    // Function to show the results
    function showResults() {
        if(score == 0){
            questionElement.textContent = `Que pena! Acertou ${score} de ${questions.length} perguntas.`;
        }
        else{
            questionElement.innerHTML = `Parabéns! Conseguiu acertar ${score} de ${questions.length} perguntas.<br>Obteve ${parseInt(points) + parseInt(pointsLast)} pontos`;
        }
        optionsElement.innerHTML = ''; // Clear options

        const nextLevelButton = document.createElement('button');
        nextLevelButton.textContent = 'Próximo Nível';
        nextLevelButton.className = 'option';
        nextLevelButton.addEventListener('click', () => {
            window.location.href = `/levels/2/play.html?points=${points}`;
        });

    }

    // Load the first quiz
    displayQuiz();
});
