import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AnswerParameters} from './questinarie/parameters.model';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class QuestionnaireService {
  noteText = new Subject<string>();
  note: string;
  categorical: string;
  typeCode = new Subject<number>();
  typeCodeNum: number;
  loopListener = new Subject<boolean>();
  loop: boolean;
  clickableImagesListener = new Subject<boolean>();
  clickableImages: boolean;
  dynamicGridListener = new Subject<boolean>();
  dynamicGrid: boolean;
  scalaListener = new Subject<boolean>();
  scala: boolean;
  numberCodesListener = new Subject<boolean>();
  numberCodes: boolean;
  openCodesListener = new Subject<boolean>();
  openCodes: boolean;
  questionsChanged = new Subject<string[]>();
  questions = [];
  webAskingChanged = new Subject<string[]>();
  webAsking = [];
  answers = [];
  properties = [];
  qNameList = [];
  breakline = ' =============================';

  newAnswers = [];
  newProperties = [];
  clickImageText = '    [\n    flametatype = \"clickableimages\",\n    rowContainWidth = 800,\n    rowBtnHeight = 190,\n    rowBtnWidth = 190,\n    \'rowContainHgap = 20,\n    rowBtnBorderRadius = 30,\n    rowContainOptHalign = \"right\"\n    ]\n    ';

  dynamicGridText = '    [\n        flametatype = \"dynamicgrid\",\n    colBtnHeight = 190,\n    colBtnWidth = 170,\n    rowBtnWidth = 300,\n    rowContainHgap = -315,\n    colContainHoffset = 120,\n    rowContainHoffset = 40,\n    showDGprev = false,\n    colContainOptHalign = \"right\"\n    ]\n';

  dynamicGridScala = '    [\n        flametatype = \"dynamicgrid\",\n    colBtnWidth = 70,\n    rowBtnWidth = 150,\n    showDGprev = false\n    ]\n';
  private subscription: Subscription;


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

  constructor() {
    this.subscription = this.noteText.subscribe(
      (note: string) => {
        this.note = note;
      }
    );
    this.subscription = this.typeCode.subscribe(
      (number: number) => {
        this.typeCodeNum = number;
        if (this.typeCodeNum === 1) {
          this.categorical  = 'categorical[1..1]';
        } else {
          this.categorical  = 'categorical[1..]';
        }
      }
    );
    this.numberCodesListener.subscribe(
      (codes: boolean) => {
        this.numberCodes = codes;
      }
    );
    this.openCodesListener.subscribe(
      (codes: boolean) => {
        this.openCodes = codes;
      }
    );
    this.loopListener.subscribe(
      (data: boolean) => {
        this.loop = data;
      }
    );
    this.clickableImagesListener.subscribe(
      (data: boolean) => {
        this.clickableImages = data;
      }
    );
    this.dynamicGridListener.subscribe(
      (data: boolean) => {
        this.dynamicGrid = data;
      }
    );
  }

  answerFormat(answers: string, properties: string) {
    this.answers = [];
    this.newAnswers = [];
    this.newProperties = [];
    if (answers) {
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
    if (properties) {
      const formattedProperties = [];
      this.properties = properties.split('\n');
      for (const property of this.properties) {
        if (property !== '') {
          formattedProperties.push(property);
        }
      }
      let qindx = 1;
      let i = 0;

      for (let property of formattedProperties) {
        if (qindx < 10) {
          property = '\n        _0' + qindx + ' ' + '\"' + property + '\"';
          this.newProperties.push(property);
        } else {
          property = '\n    _' + qindx + ' ' + '\"' + property + '\"';
          this.newProperties.push(property);
        }
        qindx++;
        i++;
      }
    }
  }

  onSingle_MultiQuestionAdded(qName: string, questionsData: string, ran: string, ranProp: string) {
    let question;
    let webask;
    // Clickable Images
    if (this.clickableImages) {
      question = '    \`' + this.breakline  + qName + '\n\n    ' +  qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.clickImageText + this.categorical + '\n' + '    {'  + '  ' + this.newAnswers + '\n' + '    }' + ran + ';\n\n';
      // Dynamic Grid
    } else if (this.dynamicGrid && this.loop) {
      question = '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.dynamicGridText + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"\"\n    ' + this.categorical + '\n' + '    {' + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
    // Loop Question
    } else if (this.loop) {
      question =  '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + '\"' + '\n' + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"' + questionsData + '\n'  + '    <small><i>' + this.note + '</i></small>'  + '\"\n    ' + this.categorical + '\n' + '    {'  + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
      // Dynamic Grid Scala
    } else if (this.scala) {
      question = '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.dynamicGridScala + 'loop\n{' + this.newProperties + '\n}' + ranProp + ' fields\n (\n   slice \"\"\n' + this.categorical + '\n' + '    {' + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
      // Regular Question
    } else {
      question = '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"\n    ' + this.categorical + '\n' + '    {' + this.newAnswers + '\n    }' + ran + ';\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    // WEB
    webask = '    \`' + this.breakline + qName + '\n\n    ' + qName + '.Ask() \n\n';
    this.webAsking.push(webask);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.push(qName);
  }

  getQNameList() {
    return this.qNameList;
  };

  // onMultiQuestionAdded(qName: string, questionsData: string, ran: string, ranProp: string) {
  //   let question;
  //   if (this.loop) {
  //     question =  '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + '\"' + '\n' + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"' + questionsData + '\n'  + '    <small><i>' + this.note + '</i></small>'  + '\"\n    ' + this.categoricalMulti + '\n' + '    {'  + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
  //   } else {
  //      question = '    \`' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"\n    ' + this.categoricalMulti + '\n' + '    {' + this.newAnswers + '\n    }' + ran  + ';\n\n';
  //   }
  //   this.questions.push(question);
  //   this.questionsChanged.next(this.questions.slice());
  // }

  onOpenQuestionAdded(qName: string, questionsData: string) {
    let question;
    if (this.openCodes) {
      question = '    \''  + this.breakline  + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    text[1..500]\n    codes(\n    {' + this.newAnswers + '\n' +    '});\n\n';
    } else {
      question = '    \''  + this.breakline  + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    text[1..500];\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
  }

  onNumbersQuestionAdded(qName: string, questionsData: string) {
    let question;
    if (this.numberCodes) {
       question = '    ' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '   long[1..10]\n   codes(\n   {' + this.newAnswers  + '\n' + '   });\n\n';
    } else {
       question = '    \'' + this.breakline + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    long[1..10];\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
  }

  onInfoQuestionAdded(qName: string, questionsData: string) {
    const question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\"' + '\n' + '    info;\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
  }

  getAnswerParameters() {
    return this.answerParameters.slice();
  }

  deleteQuestion(id: number) {
    this.questions.splice(id, 1);
    this.questionsChanged.next(this.questions.slice());
    this.webAsking.splice(id, 1);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.splice(id, 1);
  }
}
