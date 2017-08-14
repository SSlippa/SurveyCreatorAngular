import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {AnswerParameters} from './parameters.model';



@Component({
  selector: 'app-questinarie',
  templateUrl: './questinarie.component.html',
  styleUrls: ['./questinarie.component.css']
})
export class QuestinarieComponent implements OnInit, OnDestroy {
  @ViewChild('f') signupForm: NgForm;
  questionText: string;
  questionName: number;
  private subscription: Subscription;
  noteText: string;
  typeCode: number;
  answers: string;
  properties: string;
  randomAns = false;
  randomProp = false;
  loopProperties: boolean;
  qNameList;
  answersList: Object[] = [];
  answerListAfterJoin = [];
  answerParameters: AnswerParameters[];
  QIndex;
  seletedAnswers;
  fltOptions = [];

  isCopied: boolean = false;
  pic = '<mrRef RefType=\'img\' src=\'imgNdocs/pics/qashqaiNew.png\' border=\'0\' height=\'350\'/><hr/>';

  constructor(private questionnaireService: QuestionnaireService) { }


  ngOnInit() {
    this.answerParameters = this.questionnaireService.getAnswerParameters();
    this.qNameList = this.questionnaireService.getQNameList();

    this.questionName = 10;
    this.subscription = this.questionnaireService.noteText.subscribe(
    (note: string) => {
      this.noteText = note;
    }
    );
    this.subscription = this.questionnaireService.typeCode.subscribe(
      (typeCode: number) => {
        this.typeCode = typeCode;
      }
    );
    this.subscription = this.questionnaireService.loopListener.subscribe(
      (data: boolean) => {
        this.loopProperties = data;
      }
    );
  }

  changedIndex(index: number) {
    this.QIndex = index;
  }

  FilterFunc() {
    let text = '';
    let test;
    let test2;
    for (let i = 0; i < this.seletedAnswers.length; i++) {
      text = this.seletedAnswers[i];
      this.fltOptions.push(text[0] + text[1] + text[2] + text[3]);
    }
    test = this.signupForm.value.filterFrom;
    test2 = this.signupForm.value.filterThis.selectedIndex;
    this.questionnaireService.onFilterQuestion(test, test2, this.fltOptions);
  }

  onSubmit(form: NgForm) {
    let ranAns: string;
    let ranProp: string;
    if (this.randomAns) {
      ranAns = 'ran';
    } else {
      ranAns = '';
    }
    if (this.randomProp) {
      ranProp = 'ran';
    } else {
      ranProp = '';
    }
    this.questionName = +form.value.questionName;
    this.questionName = this.questionName + 10 ;
    const questionName = 'Q' + form.value.questionName;


    this.questionnaireService.answerFormat(this.answers, this.properties);
    this.answersList.push(this.questionnaireService.getAnswersList());

    if (this.typeCode === 1 || this.typeCode === 2) {
      this.questionnaireService.onSingle_MultiQuestionAdded(questionName, this.questionText, ranAns, ranProp);
    }
    // if (this.typeCode === 2) {
    //   this.questionnaireService.onMultiQuestionAdded(questionName, this.questionText, ranAns, ranProp);
    // }
    // Open
    if (this.typeCode === 3) {
    this.questionnaireService.onOpenQuestionAdded(questionName, this.questionText);
    }
    // Numbers
    if (this.typeCode === 4) {
      this.questionnaireService.onNumbersQuestionAdded(questionName, this.questionText, ranAns);
    }
    // Info
    if (this.typeCode === 5) {
      this.questionnaireService.onInfoQuestionAdded(questionName, this.questionText);
    }
    // Video
    if (this.typeCode === 6) {
      this.questionnaireService.onVideoQuestionAdded(questionName, this.questionText);
    }
  }


  ngOnDestroy () {
    this.subscription.unsubscribe();
  }


  onTags(tagOpen, tagClose) {
   // const el = document.getElementById('question');
   // el.focus();
  // if (el.selectionStart==null){
  //   var rng=document.selection.createRange();
  //   rng.text=tagOpen+rng.text+tagClose
  // }
  // else{
  //   el.value=el.value.substring(0,el.selectionStart)+
  //     tagOpen+
  //     el.value.substring(el.selectionStart,el.selectionEnd)+
  //     tagClose+
  //     el.value.substring(el.selectionEnd);
  // }
}



}
