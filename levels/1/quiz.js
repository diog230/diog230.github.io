document.addEventListener("DOMContentLoaded", function() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    let currentQuestionIndex = 0;
    let score = 0;
    let points = 0;
    let timer;
    let timeLeft;
    const maxTime = 30; // seconds
    const minPoints = 50;
    const maxPoints = 100;

    // Questions data
    const questions = [
        {
            question: "Em que ano se passa a narrativa de \"O Ano da Morte de Ricardo Reis\"?",
            options: ["1926", "1936", "1946", "1956"],
            correctAnswerIndex: 1
        },{
            question: "Quem aparece como um fantasma para Ricardo Reis?",
            options: ["Álvaro de Campos", "Alberto Caeiro", "Fernando Pessoa", "Bernardo Soares"],
            correctAnswerIndex: 2
        },
		{
            question: "Qual contexto histórico-político influencia a narrativa?",
			options: ["Primeira Guerra Mundial","Revolução Russa","Guerra Civil Espanhola e ascensão do fascismo","Segunda Guerra Mundial"],
            correctAnswerIndex: 2
        },
		{
            question: "Qual é a cidade principal onde se desenrola a história?",
            options: ["Porto", "Coimbra", "Lisboa", "Faro"],
            correctAnswerIndex: 2
        },
		{
            question: "Qual é o estilo de escrita característico de Saramago nesta obra?",
            options: ["Frases curtas e diretas","Frases longas, sem pontuação tradicional","Uso de rimas e versos","Diálogos em formato de peça teatral"],
            correctAnswerIndex: 1
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
            questionElement.textContent = `Parabéns! Conseguiu acertar ${score} de ${questions.length} perguntas.`;
        }
        optionsElement.innerHTML = ''; // Clear options

        const nextLevelButton = document.createElement('button');
        nextLevelButton.textContent = 'Próximo Nível';
        nextLevelButton.className = 'option';
        nextLevelButton.addEventListener('click', () => {
            window.location.href = `/levels/2/play.html?points=${points}`;
        });

        optionsElement.appendChild(nextLevelButton);
    }

    // Load the first quiz
    displayQuiz();
});
