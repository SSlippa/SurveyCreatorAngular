import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionnaireService} from '../questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  questionType: string;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
  }

  onType(type: string) {
    this.questionType = type;
    if (type === 'single') {
      this.questionnaireService.noteText.next('סמן את התשובה המתאימה ביותר');
      this.questionnaireService.typeCode.next(1);
    }
    if (type === 'multi') {
      this.questionnaireService.noteText.next('סמן את כל התשובות המתאימות');
      this.questionnaireService.typeCode.next(2);
    }
    if (type === 'open') {
      this.questionnaireService.noteText.next('פרט ככל הניתן');
      this.questionnaireService.typeCode.next(3);
    }
    if (type === 'numbers') {
      this.questionnaireService.noteText.next('');
      this.questionnaireService.typeCode.next(4);
    }
    if (type === 'info') {
      this.questionnaireService.noteText.next('');
      this.questionnaireService.typeCode.next(5);
    }
  }

}
