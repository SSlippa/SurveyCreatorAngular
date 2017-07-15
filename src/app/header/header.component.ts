import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionnaireService} from '../questionnaire.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  questionType: string;
  loop: boolean;
  clickableImages: boolean;
  dynamicGrid: boolean;
  openCodes: boolean;
  numbersCodes: boolean;
  scala: boolean;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {

  }

  LoopChange () {
    this.loop = !this.loop;
    this.questionnaireService.loopListener.next(this.loop);
  }

  ClickImgChange () {
    this.clickableImages = !this.clickableImages;
    this.questionnaireService.clickableImagesListener.next(this.clickableImages);
  }

  DynamicGrigChange () {
    this.dynamicGrid = !this.dynamicGrid;
    this.questionnaireService.dynamicGridListener.next(this.dynamicGrid);
  }

  ScalaChange () {
    this.scala = !this.scala;
    this.questionnaireService.scalaListener.next(this.scala);
  }

  OpenCodesChange () {
    this.openCodes = !this.openCodes;
    this.questionnaireService.openCodesListener.next(this.openCodes);
  }

  NumberCodesChange () {
    this.numbersCodes = !this.numbersCodes;
    this.questionnaireService.numberCodesListener.next(this.numbersCodes);
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
      this.questionnaireService.noteText.next('הכנס תשובה מספרית');
      this.questionnaireService.typeCode.next(4);
    }
    if (type === 'info') {
      this.questionnaireService.noteText.next('');
      this.questionnaireService.typeCode.next(5);
    }
  }

}
