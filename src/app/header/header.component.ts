import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
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
  openLines: boolean;
  numbersCodes: boolean;
  numbersAutoSum: boolean;
  scala: boolean;
  videoPath: string;

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

  OpenLinesChange () {
    this.openLines = !this.openLines;
    this.questionnaireService.openLinesListener.next(this.openLines);
  }

  NumberCodesChange () {
    this.numbersCodes = !this.numbersCodes;
    this.questionnaireService.numberCodesListener.next(this.numbersCodes);
  }

  NumberAutoSumChange () {
    this.numbersAutoSum = !this.numbersAutoSum;
    this.questionnaireService.numberAutoSumListener.next(this.numbersAutoSum);
  }

  SavePath (fileInput: any) {
    // this.path = fileInput.target.files[0].name;
    // console.log(this.path.attributes('name'));

  }

  pathChange () {
    this.questionnaireService.videoPathChanged.next(this.videoPath);
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
    if (type === 'video') {
      this.questionnaireService.noteText.next('');
      this.questionnaireService.typeCode.next(6);
    }
  }

}
