import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {QuestionnaireService} from '../questionnaire.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  questions = [];
  private subscription: Subscription;
  questionAfterJoin = '';

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.subscription = this.questionnaireService.questionsChanged.subscribe(
      (question: string[]) => {
        this.questions = question;
        this.questionAfterJoin = this.questions.join('');
      }
    );
  }

}
