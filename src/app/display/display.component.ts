import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {QuestionnaireService} from '../questionnaire.service';
import {style, state, trigger, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  animations: [
    trigger('animatedInOut', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(-100px)',
          opacity: 0,
        }))
      ]),
    ])
  ]
})
export class DisplayComponent implements OnInit {
  questions = [];
  private subscription: Subscription;
  questionAfterJoin = '';
  isCopied: boolean = false;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.subscription = this.questionnaireService.questionsChanged.subscribe(
      (question: string[]) => {
        this.questions = question;
        this.questionAfterJoin = this.questions.join('');
      }
    );
  }

  onDelete(id: number) {
    this.questionnaireService.deleteQuestion(id);
  }

}
