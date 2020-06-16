const optionsElement = document.querySelector('.options').children;
const optionsAlone = document.querySelector('.options-alone');
const questionNumber = document.querySelector('.question-num-value');
const totalNumber = document.querySelector('.total-num-value');
const scoreGrade = document.querySelector('.score-grade');
const scoreGrades = document.querySelector('.score-grades');
const questionElement = document.querySelector('.question');
const headerContainer = document.querySelector('.header-container');
const quizOverElement = document.querySelector('.quiz-class');
const startButton = document.querySelector('.start-button');
const startPage = document.querySelector('.start-page');
const buttonElement = document.querySelector('.button');
// const tryAgainButton = document.querySelector('.try-again');

const optionOne = document.querySelector('.option1');
const optionTwo = document.querySelector('.option2');
const optionThree = document.querySelector('.option3');
const optionFour = document.querySelector('.option4');

// i just declared without inputing value because we need random number
let questionIndex;
let index = 0;
let score = 0;
scoreGrade.innerHTML = score;
let myArray = [];
let myArr = [];

// creating an Array that will contain our questions and options
const questions = [
{
	question: 'Who invented the BALLPOINT PEN?',
	options: ['A. Biro Brothers', 'B. Waterman Brothers', 'C. Bicc Brothers', 'D. Write Brothers'],
	answer: 1
},
{
	question: 'Pointing to a photograph of a boy Sam said, "He is the son of the son of my mother." How is sam related to that boy?',
	options: ['A. Brother', 'B. Uncle', 'C. Cousin', 'D. Father'],
	answer: 4
},
{
	question: 'In which decade was the first solid state integrated circuit demonstrated?',
	options: ['A. 1950s', 'B. 1960s', 'C. 1970s', 'D. 1980s'],
	answer: 1
},
{
	question: 'What J. B. Dunlop invented?',
	options: ['A. Automobile wheel rim', 'B. Pneumatic rubber tire', 'C. Rubber boot', 'D. Model Airplanes'],
	answer: 2
},
{
	question: 'Which scientist discovered the radioactive element radium?',
	options: ['A. Issac Newton', 'B. Albert Einstein', 'C. Marie Curie', 'D. Benjamin Franklin'],
	answer: 3
}]

// set questions and options and question number
totalNumber.innerHTML = questions.length;

const load = () =>
{
	questionNumber.innerHTML = index + 1;
	questionElement.innerHTML = questions[questionIndex].question;
	optionOne.innerHTML = questions[questionIndex].options[0];
	optionTwo.innerHTML = questions[questionIndex].options[1];
	optionThree.innerHTML = questions[questionIndex].options[2];
	optionFour.innerHTML = questions[questionIndex].options[3];
	index++;
}

// For selection of the right answer when one option is been clicked and calling a function to disable other keys from functioning when the right button has been click
const check = (element) =>
{
	if (element.id == questions[questionIndex].answer)
	{
		element.classList.add('correct');
		scoreUpdate();
	}
	else
	{
		element.classList.add('wrong');
	}
	disAbledOptions();
}

// updating the Score board when right answer is choosen
const scoreUpdate = () =>
{
	scoreGrade.innerHTML = score += 10;
}

// disableing other option tabs whenever the right or wrong button has been click
const disAbledOptions = () =>
{
	for (let i = 0; i < optionsElement.length; i++)
	{
		optionsElement[i].classList.add('disabled');
		if (optionsElement[i].id == questions[questionIndex].answer)
		{
			optionsElement[i].classList.add('correct');
		}
	}
}
// whenever a next button is clicked, validate function calls, then enable function reset all button to default
const enableOptions = () =>
{
	for (let i = 0; i < optionsElement.length; i++)
	{
		optionsElement[i].classList.remove('disabled', 'correct', 'wrong');
	}
}

// check certain condition before going to next question
const validate = () =>
{
	if (!optionsElement[0].classList.contains("disabled"))
	{
		alert("Please select one option");
	}
	else
	{
		enableOptions();
		randomQuestion();
	}
}

const next = () => validate();

// random function, shuffles the questions, makes sure no repetation and break when last question is selected
const randomQuestion = () =>
{
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = 0;
	if (index == questions.length)
	{
		quizOver();
	}
	else
	{
		if (myArray.length > 0)
		{
			for (let i = 0; i < myArray.length; i++)
			{
				if (myArray[i] == randomNumber)
				{
					hitDuplicate = 1;
					break;
				}
			}
			if (hitDuplicate == 1)
			{
				randomQuestion();
			}
			else
			{
				questionIndex = randomNumber;
				load();
				myArr.push(questionIndex);
			}
		}
		if (myArray.length == 0)
		{
			questionIndex = randomNumber;
			load();
			myArr.push(questionIndex);
		}

		myArray.push(randomNumber);
	}
}

// when the question reaches the end ie the fifth question
const quizOver = () =>
{
	quizOverElement.classList.remove('hide');
	scoreGrades.innerHTML = score;

	headerContainer.classList.add('hide');
	questionElement.classList.add('hide');
	optionsAlone.classList.add('hide');
	buttonElement.classList.add('hide');
}

// when the start function is been clicked
const startFunction = () =>
{
	startPage.classList.add('hide');
	headerContainer.classList.remove('hide');
	questionElement.classList.remove('hide');
	optionsAlone.classList.remove('hide');
	buttonElement.classList.remove('hide');

	randomQuestion();
}

startButton.addEventListener('click', startFunction);

// tryAgainButton.addEventListener('click', () => {
//     quizOverElement.classList.add('hide');

//     startPage.classList.remove('hide');
//     headerContainer.classList.add('hide');
//     questionElement.classList.add('hide');
//     optionsAlone.classList.add('hide');
//     buttonElement.classList.add('hide');

//     // startFunction();
// })