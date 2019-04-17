'use strict';

{
  const topPage = document.getElementById('toppage');
  const btnStart = document.getElementById('btn-start');
  const question = document.getElementById('question');
  const btn = document.getElementById('btn');
  const btnWrong = document.getElementById('btn-wrong');
  const choices = document.getElementById('choices');
  const result = document.getElementById('result');
  const resultWrong = document.getElementById('result-wrong');
  const scoreLabel = document.querySelector('#result > p');
  const scoreLabelWrong = document.querySelector('#result-wrong > p');
  const commentPos = document.querySelector('#comment-pos > p');
  const commentNeg = document.querySelector('#comment-neg > p');

  const quizSet1 = [
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
  ];

  const quizSet2 = [
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
    {q: 'What is D?', c: ['D0', 'D1', 'D2']},
  ];

  let currentNum = 0;
  let isAnswered;
  let score = 0;
  let currentQuizSet = quizSet1;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === currentQuizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = currentQuizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...currentQuizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === currentQuizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  btn.style.display = 'none';
  btnStart.addEventListener('click', () => {
    topPage.style.display = 'none';
    btn.style.display = 'block';
    setQuiz();
  });

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === currentQuizSet.length - 1) {
      if (currentQuizSet === quizSet2) {
        if (score < currentQuizSet.length) {
          commentPos.textContent = 'もうちょっと頑張って';
        } else {
          commentPos.textContent = 'やるやん';
        }
        scoreLabel.textContent = `Score: ${score} / ${currentQuizSet.length}`;
        result.classList.add('show');
      } else {
        if (score < currentQuizSet.length) {
          commentNeg.textContent = '○○についての理解が不十分なようです。復習しましょう！';
          scoreLabelWrong.textContent = `Score: ${score} / ${currentQuizSet.length}`;
          resultWrong.classList.add('show');
        } else {
          commentPos.textContent = '完璧やん';
          scoreLabel.textContent = `Score: ${score} / ${currentQuizSet.length}`;
          result.classList.add('show');
        }
      }
    } else {
      currentNum++;
      setQuiz();
    }
  });

  btnWrong.addEventListener('click', () => {
    currentNum = 0;
    score = 0;
    currentQuizSet = quizSet2;
    resultWrong.classList.remove('show');
    btn.textContent = 'Next';
    setQuiz();
  });
}
