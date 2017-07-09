import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class QuestionnaireService {
  noteText = new Subject<string>();
  typeCode = new Subject<number>();
  questionsChanged = new Subject<string[]>();
  questions = [];
  answers = [];
  breakline = ' =============================';
  categoricalSingle  = 'categorical[1..1]';
  categoricalMulti  = 'categorical[1..]';
  newAnswers = [];
  constructor() { }

  answerFormat(answers: string) {
    const formattedAnswers = [];
    this.answers = answers.split('\n');
    for (const answer of this.answers) {
      if (answer !== '') {
        formattedAnswers.push(answer);
      }
    }
     let qindx = 1;
     for (let answer of formattedAnswers) {
      if (qindx < 10) {
        answer = '\n        _0' + qindx + ' ' + '\"' + answer + '\"';
        this.newAnswers.push(answer);
      } else {
        answer = '\n    _' + qindx + ' ' + '\"' + answer + '\"';
        this.newAnswers.push(answer);
      }
      qindx++;
    }
  }

  onSingleQuestionAdded(qName: string, questionsData: string) {

    const note = 'סמן את התשובה המתאימה ביותר';
    const question = '    ' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + note + '</i></small>' + '\"\n    ' + this.categoricalSingle + '\n' + '   {\n    ' + this.newAnswers + '\n    }'   + ';\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.answers = [];
    this.newAnswers = [];
  }

  onMultiQuestionAdded(qName: string, questionsData: string) {

    const note = 'סמן את כל התשובות המתאימות';
    const question = '    ' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + note + '</i></small>' + '\"\n    ' + this.categoricalMulti + '\n' + '   {\n    ' + this.newAnswers + '\n    }'  + ';\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.answers = [];
    this.newAnswers = [];
  }

  onOpenQuestionAdded(qName: string, questionsData: string) {
    const note = 'פרט ככל הניתן';
    const question = '    \''  + this.breakline  + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + note + '</i></small>' + '\"' + '\n' + '    text[1..500];\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }

  onNumbersQuestionAdded(qName: string, questionsData: string) {
    const note = 'הכנס תשובה מספרית';
    const question = '    \'' + this.breakline + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + note + '</i></small>' + '\"' + '\n' + '    long[1..10];\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }

  onInfoQuestionAdded(qName: string, questionsData: string) {
    const question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\"' + '\n' + '    info;\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }
}
