import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AnswerParameters} from './questinarie/parameters.model';
import {Subscription} from 'rxjs/Subscription';
import {Http, Response} from '@angular/http';

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
  numberAutoSumListener = new Subject<boolean>();
  numberAutoSum: boolean;
  openCodesListener = new Subject<boolean>();
  openCodes: boolean;
  openLinesListener = new Subject<boolean>();
  openLines: boolean;
  questionsChanged = new Subject<string[]>();
  questions = [];
  webAskingChanged = new Subject<string[]>();
  webAsking = [];
  videoPathChanged = new Subject<string>();
  videoPath: string;
  answers = [];
  properties = [];
  qNameList = [];
  breakline = '=============================';
  savedSurveysChanged = new Subject<string[]>();
  savedProjectNames = [];

  newAnswers = [];
  newProperties = [];
  clickImageText = '    [\n    flametatype = \"clickableimages\",\n    rowContainWidth = 800,\n    rowBtnHeight = 190,\n    rowBtnWidth = 190,\n    \'rowContainHgap = 20,\n    rowBtnBorderRadius = 30,\n    rowContainOptHalign = \"right\"\n    ]\n    ';

  dynamicGridText = '    [\n        flametatype = \"dynamicgrid\",\n        colBtnHeight = 190,\n        colBtnWidth = 170,\n        rowBtnWidth = 300,\n        rowContainHgap = -315,\n        colContainHoffset = 120,\n        rowContainHoffset = 40,\n        showDGprev = false,\n        colContainOptHalign = \"right\"\n    ]\n';

  dynamicGridScala = '    [\n        flametatype = \"dynamicgrid\",\n        colBtnWidth = 70,\n        rowBtnWidth = 150,\n        showDGprev = false\n        \'uncomment to 1 question scala\n        \'rowContainVoffset = -100,\n        \'rowBtnShowBckgrnd = false\n    ]\n';

  twotab = '        ';

  OpenLinesAnsList = '    qOpenLinesAnsList "qOpenLinesAnsList" define\n    {\n' + this.twotab + '_1 "",\n' + this.twotab + '_2 "",\n' + this.twotab + '_3 "",\n' + this.twotab + '_4 "",\n' + this.twotab + '_5 "",\n' + this.twotab + '_6 "",\n' + this.twotab + '_7 "",\n' + this.twotab + '_8 "",\n' + this.twotab + '_9 ""\n    };';
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

  constructor(private http: Http) {
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
    this.numberAutoSumListener.subscribe(
      (codes: boolean) => {
        this.numberAutoSum = codes;
      }
    );
    this.openCodesListener.subscribe(
      (codes: boolean) => {
        this.openCodes = codes;
      }
    );
    this.openLinesListener.subscribe(
      (lines: boolean) => {
        this.openLines = lines;
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
    this.scalaListener.subscribe(
      (data: boolean) => {
        this.scala = data;
      }
    );
    this.videoPathChanged.subscribe(
      (data: string) => {
        this.videoPath = data;
      }
    );
    // this.savedSurveysChanged.subscribe(
    //   (data) => {
    //     this.savedProjectNames.push(data);
    //   }
    // );

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
        const ans = answer;
        if (qindx < 10) {
          answer = '\n        _0' + qindx + ' ' + '\"' + ans + '\"';
          if (this.answerParameters[i].exclusive) {
            answer = '\n        _0' + qindx + '@' + ' ' + '\"' + ans + '\"' + ' exclusive';
          }
          if (this.answerParameters[i].other) {
            answer += ' other';
          }
          if (this.answerParameters[i].fix) {
            answer += ' fix';
          }
          this.newAnswers.push(answer);
        } else if (qindx <= this.answerParameters.length) {
          answer = '\n        _' + qindx + ' ' + '\"' + ans + '\"';
          if (this.answerParameters[i].exclusive) {
            answer = '\n        _' + qindx + '@' + ' ' + '\"' + ans + '\"' + ' exclusive';
          }
          if (this.answerParameters[i].other) {
            answer += ' other';
          }
          if (this.answerParameters[i].fix) {
            answer += ' fix';
          }
          this.newAnswers.push(answer);
        } else {
          answer = '\n        _' + qindx + ' ' + '\"' + ans + '\"';
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
    } else {
      this.newProperties.push('\n        _01 ""');
    }
  }

  getAnswersList() {
    return this.newAnswers.slice();
  };


  onSingle_MultiQuestionAdded(qName: string, questionsData: string, ran: string, ranProp: string) {
    let question;
    let webask;
    // Clickable Images
    if (this.clickableImages) {
      question = '    \'' + this.breakline  + qName + '\n\n    ' +  qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.clickImageText + this.categorical + '\n' + '    {'  + '  ' + this.newAnswers + '\n' + '    }' + ran + ';\n\n';
      // Dynamic Grid
    } else if (this.dynamicGrid ) {
      question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.dynamicGridText + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"\"\n    ' + this.categorical + '\n' + '    {' + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
    // Loop Question
    } else if (this.loop ) {
      question =  '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + '\"' + '\n' + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"' + questionsData + '\n'  + '    <small><i>' + this.note + '</i></small>'  + '\"\n    ' + this.categorical + '\n' + '    {'  + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
      // Dynamic Grid Scala
    } else if (this.scala) {
      question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + this.dynamicGridScala + '    loop\n    {' + this.newProperties + '\n    }' + ranProp + ' fields\n    (\n    slice \"\"\n    ' + this.categorical + '\n' + '    {' + this.newAnswers + '\n' + '    }' + ran + ';\n    )expand;\n';
      // Regular Question
    } else {
      question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"\n    ' + this.categorical + '\n' + '    {' + this.newAnswers + '\n    }' + ran + ';\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    // WEB
    webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + '.Ask() \n\n';
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
    let webask;
    const openLinesParam = '    [\n        flametatype = "abfallinglines",\n        toolPath = "[%ImageCacheBase%]/imgNdocs/js"\n    ]\n';
    if (this.openCodes) {
      question = '    \''  + this.breakline  + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    text[1..500]\n    codes(\n    {' + this.newAnswers + '\n' + '    });\n\n';
    } else if (this.openLines) {
      question = this.OpenLinesAnsList + '\n\n    \''  + this.breakline + qName + '\n\n    '  + qName + 'FallingLines' + ' "' + questionsData + '\n' + '    <small><i>כתוב תשובה אחת בכל שורה</i></small>\"\n' + openLinesParam + '    loop\n    {\n' + this.twotab + 'use qOpenLinesAnsList\n    } fields\n    (\n' + this.twotab + 'qOpenAns \"\"\n          style(\n           Control(\n                Type = "SingleLineEdit"\n          )\n        )\n        text[0..60];\n    )expand grid;\n\n';
      question += '\n\n    ' + qName + 'FallingLinesFirstMentioned "התשובה הראשונה בשאלה ' + qName + '"\n    text[0..];';
      question += '\n\n    ' + qName + 'FallingLinesRestMentioned "תשובות 2-10 בשאלה ' + qName + '"\n    text[0..];';
      question += '\n\n    ' + qName + 'FallingLinesAll "כל התשובות שענה בשאלה ' + qName + '"\n    text[0..];';
    } else {
      question = '    \''  + this.breakline  + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    text[1..500];\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
    // WEB
    if (this.openLines) {
      webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + 'FallingLines[..].qOpenAns.Response.Value = null';
      webask += '\n    ' + qName + 'FallingLines[..].MustAnswer = false';
      webask += '\n    ' + qName + 'FallingLines.Validation.Function = "validateOpenLines"';
      webask += '\n    ' + qName + 'FallingLines.ask()';
      webask += '\n\n    devideOpenLinesToFirstMentionedAndRest(' + qName + 'FallingLines, ' + qName + 'FallingLinesFirstMentioned, ' + qName + 'FallingLinesRestMentioned )';
      webask += '\n\n    ' + qName + 'FallingLinesAll.Response.Value = ' + qName + 'FallingLinesFirstMentioned.Response.Value + " | " + ' + qName + 'FallingLinesRestMentioned.Response.Value\n\n';
    } else {
      webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + '.Ask() \n\n';
    }
    this.webAsking.push(webask);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.push(qName);
  }

  onNumbersQuestionAdded(qName: string, questionsData: string, ran: string) {
    let question;
    let webask;
    const autoSumProp = '    [\n        flametatype = "abautosum",\n        toolPath = "[%ImageCacheBase%]/imgNdocs/js",\n        textLabel = "סך-הכל: ",\n        runningTotalPosition = "bottom",\n        totalSum = 10\n    ]\n';
    if (this.numberCodes) {
       question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    long[1..10]\n    codes(\n    {' + this.newAnswers  + '\n' + '    });\n\n';
    } else if (this.numberAutoSum) {
      question =  '    \'' + this.breakline + qName + '\n\n    ' + qName + 'AutosumLoop \"' + questionsData + '\n    <small><i>רשום תשובה מספרית בכל שורה. אם אינך משתמש בפריט, רשום 0.\n סך התשובות צריך להסתכם ל<u>10</u></i></small>' + '\"' + '\n' + autoSumProp + '    loop\n    {' + this.newAnswers + '\n    }' + ran + ' fields\n    (\n    slice \"\"\n        style(\n            Width = "4em"\n        )\n    long[0..10];\n' + '    )expand;\n';
    } else {
       question = '    \'' + this.breakline + qName + '\n\n    '  + qName + ' \"' + questionsData + '\n' + '    <small><i>' + this.note + '</i></small>' + '\"' + '\n' + '    long[1..10];\n\n';
    }
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
    // WEB
    if (this.numberAutoSum) {
      webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + 'AutosumLoop.Categories[..].label.Style.Cell.Width = "auto"';
      webask += '\n\n    \'set labels column width\n    ' + qName + 'AutosumLoop.Categories[..].label.Style.Align = Alignments.alRight';
      webask += '\n\n    \'align labels to the right\n    ' + qName + 'AutosumLoop[..].slice.Style.Cell.Padding = 10';
      webask += '\n\n    \'add padding to the numeric fields\n    ' + qName + 'AutosumLoop.Validation.Function = "validateMyDynamicAutoSum"';
      webask += '\n\n    ' + qName + 'AutosumLoop[..].slice.Response.Value = null';
      webask += '\n    ' + qName + 'AutosumLoop.ask()';
    } else {
      webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + '.Ask() \n\n';
    }
    this.webAsking.push(webask);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.push(qName);
  }

  onInfoQuestionAdded(qName: string, questionsData: string) {
    let webask;
    const question = '    \'' + this.breakline + qName + '\n\n    ' + qName + ' \"' + questionsData + '\"' + '\n' + '    info;\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
    // WEB
    webask = '    \'' + this.breakline + qName + '\n\n    ' + qName + '.Show() \n\n';
    this.webAsking.push(webask);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.push(qName);
  }

  onVideoQuestionAdded(qName: string, questionsData: string) {
    let webask;
    const vidParam = '\n    [\n        flametatype = "jplayer7",\n        source = "multimedia/IS/' + this.videoPath + '.mp4",\n        hidenext = true,\n        skipdetection = true,\n        skipdetectionmessage = "הקובץ לא נוגן במלואו, אנא נגן אותו שוב",\n        autoplay = false,\n        autosubmit = true\n    ]\n';
    const question = '    \'' + this.breakline + qName + '\n\n    ' + qName + 'vidplayer' + ' \"' + questionsData + '\"' + vidParam + '    text[0..4000];\n\n';
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
    this.qNameList.push(qName);
    // WEB
    webask = '    \'' + this.breakline + qName + 'vidplayer' + '\n\n    ' + qName + '.Ask() \n\n';
    this.webAsking.push(webask);
    this.webAskingChanged.next(this.webAsking.slice());
    this.qNameList.push(qName);
  }

  onFilterQuestion(filterFrom, filterThis, filter) {
    this.webAsking.splice(filterThis , 1 , this.breakline + this.qNameList[filterThis] + '\n\n  IF ' + filterFrom + '.Response.Value.ContainsAny({' + filter + '}) Then \n\n' + '     ' + this.qNameList[filterThis] + '.Ask() \n\n  End IF\n\n');
    this.webAskingChanged.next(this.webAsking.slice());
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

  storeQuestions(projectName: string) {
    return this.http.put('https://surveycreator-ccad7.firebaseio.com/' + projectName + 'questions.json' , this.questions); //  {headers: headers}
  }
  storeWeb(projectName: string) {
    return this.http.put('https://surveycreator-ccad7.firebaseio.com/' + projectName + 'webs.json' , this.webAsking); //  {headers: headers}
  }
  storeProjectsNames(project) {
    if (this.savedProjectNames === null) {
      this.savedProjectNames = [];
    }
    this.savedProjectNames.push(project);
    this.savedSurveysChanged.next(this.savedProjectNames.slice());
    console.log('this.savedProjectNames: ' + this.savedProjectNames);
    return this.http.put('https://surveycreator-ccad7.firebaseio.com/listOfProjects.json' , this.savedProjectNames); //  {headers: headers}
  }


  getQuestions(projectName: string) {
     this.http.get('https://surveycreator-ccad7.firebaseio.com/' + projectName + 'questions.json').subscribe(
       (response: Response) => {
         const questions = response.json();
         this.questions = questions;
         this.questionsChanged.next(this.questions.slice());
       }
    );
  }
  getWeb(projectName: string) {
    this.http.get('https://surveycreator-ccad7.firebaseio.com/' + projectName + 'webs.json').subscribe(
      (response: Response) => {
        const webs = response.json();
        this.webAsking = webs;
        this.webAskingChanged.next(this.webAsking.slice());
      }
    );
  }
  getListOfProjects() {
    this.http.get('https://surveycreator-ccad7.firebaseio.com/listOfProjects.json').subscribe(
      (response: any) => {
        this.savedProjectNames = response.json();
        console.log('getListOfProjects()' + this.savedProjectNames);
        if (this.savedProjectNames) {
          this.savedSurveysChanged.next(this.savedProjectNames.slice());
        }
      }
    );
  }

  deleteProject(project) {
    this.savedProjectNames.splice(project, 1);
    this.savedSurveysChanged.next(this.savedProjectNames);
    return this.http.put('https://surveycreator-ccad7.firebaseio.com/listOfProjects.json' , this.savedProjectNames); //  {headers: headers}
  }
}
