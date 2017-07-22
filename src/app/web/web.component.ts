import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {QuestionnaireService} from '../questionnaire.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css'],
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
export class WebComponent implements OnInit {
  webAsk = [];
  private subscription: Subscription;
  webAskAfterJoin = '';
  isCopied: boolean = false;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.subscription = this.questionnaireService.webAskingChanged.subscribe(
      (question: string[]) => {
        this.webAsk = question;
        this.webAskAfterJoin = this.webAsk.join('');
      }
    );
  }
}
