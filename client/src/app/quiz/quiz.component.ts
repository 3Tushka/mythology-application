import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  currentQuestionIndex = 0;
  showPopup = false;
  score = 0;

  questions = [
    {
      question:
        "Яке божество вважається головним у пантеоні слов'янських богів?",
      options: ['Перун', 'Сварог', 'Велес', 'Ярило'],
      answer: 'Сварог',
      userAnswer: '',
    },
    {
      question:
        "Яка істота у слов'янській міфології є символом весни та плодючості?",
      options: ['Русалка', 'Мавка', 'Кікімора', 'Лада'],
      answer: 'Лада',
      userAnswer: '',
    },
    {
      question: "Кому з богів належала зброя, звана 'перуніца'?",
      options: ['Перуну', 'Даждьбогу', 'Сварожичу', 'Хорсу'],
      answer: 'Перуну',
      userAnswer: '',
    },
    {
      question:
        "Яка істота за слов'янськими віруваннями живе в домашніх вогнищах та охороняє дім?",
      options: ['Домовик', 'Берегиня', 'Лісовик', 'Водяник'],
      answer: 'Домовик',
      userAnswer: '',
    },
    {
      question:
        "Як називається свято, що відзначається у слов'ян в честь весняного рівнодення?",
      options: ['Купала', 'Масляна', 'Велесове Вечори', 'Івана Купала'],
      answer: 'Івана Купала',
      userAnswer: '',
    },
  ];

  constructor() {}

  ngOnInit() {}

  submit() {
    this.questions.forEach((question) => {
      if (question.answer === question.userAnswer) {
        this.score++;
      }
    });
    this.showPopup = true;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submit();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    } else {
      this.currentQuestionIndex = 0;
    }
  }

  closePopup() {
    this.showPopup = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.questions.forEach((question) => {
      question.userAnswer = '';
    });
  }
}
