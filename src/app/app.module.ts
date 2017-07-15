import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuestinarieComponent } from './questinarie/questinarie.component';
import {QuestionnaireService} from './questionnaire.service';
import { DisplayComponent } from './display/display.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestinarieComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
