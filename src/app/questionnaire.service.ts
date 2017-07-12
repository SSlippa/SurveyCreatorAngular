import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AnswerParameters} from "./questinarie/parameters.model";

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

  answerParameters: AnswerParameters[] = [
    new AnswerParameters (' 1', false, false, false),
    new AnswerParameters (' 2', false, false, false),
    new AnswerParameters (' 3', false, false, false),
    new AnswerParameters (' 4', false, false, false),
    new AnswerParameters (' 5', false, false, false),
    new AnswerParameters (' 6', false, false, false),
    new AnswerParameters (' 7', false, false, false),
    new AnswerParameters (' 8', false, false, false),
    new AnswerParameters (' 9', false, false, false),
    new AnswerParameters ('10', false, false, false),
    new AnswerParameters ('11', false, false, false),
    new AnswerParameters ('12', false, false, false)
  ];

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
    let i = 0;


     for (let answer of formattedAnswers) {
      if (qindx < 10) {
        answer = '\n        _0' + qindx + ' ' + '\"' + answer + '\"';
        if (this.answerParameters[i].exclusive) {
          answer += ' exclusive';
        }
        if (this.answerParameters[i].other) {
          answer += ' other';
        }
        if (this.answerParameters[i].fix) {
          answer += ' fix';
        }
        this.newAnswers.push(answer);
      } else if (qindx <= this.answerParameters.length) {
        answer = '\n    _' + qindx + ' ' + '\"' + answer + '\"';
        if (this.answerParameters[i].exclusive) {
          answer += ' exclusive';
        }
        if (this.answerParameters[i].other) {
          answer += ' other';
        }
        if (this.answerParameters[i].fix) {
          answer += ' fix';
        }
        this.newAnswers.push(answer);
      } else {
        answer = '\n    _' + qindx + ' ' + '\"' + answer + '\"';
        this.newAnswers.push(answer);
      }
      qindx++;
        i++;
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

  getAnswerParameters() {
    return this.answerParameters.slice();
  }
}
