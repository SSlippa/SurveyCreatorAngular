import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {AnswerParameters} from './parameters.model';
import {Subject} from 'rxjs/Subject';



@Component({
  selector: 'app-questinarie',
  templateUrl: './questinarie.component.html',
  styleUrls: ['./questinarie.component.css']
})
export class QuestinarieComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  questionText: string;
  questionName: number;
  private subscription: Subscription;
  noteText: string;
  typeCode: number;
  answers: string;
  properties: string;
  randomAns: boolean = false;
  randomProp: boolean = false;
  loopProperties: boolean;
  qNameList;
  answerParameters: AnswerParameters[];

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

    if (this.typeCode === 1 || this.typeCode === 2) {
      this.questionnaireService.onSingle_MultiQuestionAdded(questionName, this.questionText, ranAns, ranProp);
    }
    // if (this.typeCode === 2) {
    //   this.questionnaireService.onMultiQuestionAdded(questionName, this.questionText, ranAns, ranProp);
    // }
    if (this.typeCode === 3) {
    this.questionnaireService.onOpenQuestionAdded(questionName, this.questionText);
    }
    if (this.typeCode === 4) {
      this.questionnaireService.onNumbersQuestionAdded(questionName, this.questionText);
    }
    if (this.typeCode === 5) {
      this.questionnaireService.onInfoQuestionAdded(questionName, this.questionText);
    }
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
