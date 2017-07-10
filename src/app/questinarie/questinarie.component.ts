import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {AnswerParameters} from './parameters.model';


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
  fix = [];

  // answerParameters: AnswerParameters[] = [
  //   new AnswerParameters ('1', false, false, false),
  //   new AnswerParameters ('2', false, false, false),
  //   new AnswerParameters ('3', false, false, false),
  //   new AnswerParameters ('4', false, false, false),
  //   new AnswerParameters ('5', false, false, false),
  // ];

  answerParameters = [
    {name: 'OptionA', value: '1', checked: false},
    {name: 'OptionB', value: '2', checked: false},
    {name: 'OptionC', value: '3', checked: false}
  ];


  constructor(private questionnaireService: QuestionnaireService) { }


  ngOnInit() {
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
  }

  onSubmit(form: NgForm) {
    this.questionName = +form.value.questionName;
    this.questionName = this.questionName + 10 ;
    const questionName = 'Q' + form.value.questionName;

    console.log(form);
    console.log(this.answerParameters);


    this.questionnaireService.answerFormat(this.answers);
    if (this.typeCode === 1) {
      this.questionnaireService.onSingleQuestionAdded(questionName, this.questionText);
    }
    if (this.typeCode === 2) {
      this.questionnaireService.onMultiQuestionAdded(questionName, this.questionText);
    }
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
