import { SurveyCreatorAngularPage } from './app.po';

describe('survey-creator-angular App', () => {
  let page: SurveyCreatorAngularPage;

  beforeEach(() => {
    page = new SurveyCreatorAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
