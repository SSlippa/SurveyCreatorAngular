import { Component, OnInit } from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  savedSurveys = [];
  projectName;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.savedSurveys = [];
    this.questionnaireService.getListOfProjects();
    this.questionnaireService.savedSurveysChanged.subscribe(
      (data) => {
        this.savedSurveys = data;
      }
    );
    // this.questionnaireService.getListOfProjects();
    // this.savedSurveys = this.questionnaireService.getProjectList();
    //   this.savedSurveys = this.questionnaireService.getListOfProjects();
  }

  onLoad(survey) {
    this.questionnaireService.getQuestions(survey);
    this.questionnaireService.getWeb(survey);
  }

  onSubmit() {
    // this.questionnaireService.savedSurveysChanged.next(this.projectName);
    this.questionnaireService.storeQuestions(this.projectName).subscribe(
      (response: Response) => {
        console.log(response);
        // this.message = 'Save successful';
      },
      (error) => {
        console.log(error);
      }
    );
    this.questionnaireService.storeWeb(this.projectName).subscribe(
      (response) => {
        console.log(response);
        // this.message = 'Save successful';
      },
      (error) => {
        console.log(error);
      }
    );
    this.questionnaireService.storeProjectsNames(this.projectName).subscribe(
      (response) => {
        console.log('SAVED TRUE' + this.savedSurveys);
        console.log(response);
        // this.message = 'Save successful';
      },
      (error) => {
        console.log('SAVED False' + this.savedSurveys);
        console.log(error);
      }
    );
  }

  onLoadList() {
    this.questionnaireService.getListOfProjects();
    this.questionnaireService.savedSurveysChanged.subscribe(
      (data) => {
        this.savedSurveys = data;
      }
    );
  }

  onDelete(project) {
    const ifConfirm = confirm('Are you sure?');
    if (ifConfirm) {
      this.questionnaireService.deleteProject(project).subscribe(
        (response) => {
          console.log(response);
          // this.message = 'Save successful';
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
