/* eslint-disable */
import React from 'react';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';
import { Serializer } from 'survey-core';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import './index.css';

// Add a property to the Survey class
Serializer.addProperty('survey', {
  name: 'customSurveyProperty',
  category: 'general',
  visibleIndex: 0,
});
// Add a property to the Page class
Serializer.addProperty('page', {
  name: 'customPageProperty',
  category: 'general',
  visibleIndex: 0,
});
// Add a property to the base Question class and to all questions as a result
Serializer.addProperty('question', {
  name: 'customNumericProperty',
  type: 'number',
  category: 'general',
  default: 1,
  visibleIndex: 0,
  /* eslint-disable-next-line */
  onSetValue: (survey: { setPropertyValue: (arg0: string, arg1: any) => void }, value: any) => {
    // ...
    // You can perform required checks or modify the `value` here
    // ...
    // Set the `value`
    survey.setPropertyValue('customNumericProperty', value);
    // You can perform required actions after the `value` is set
    // ...
  },
});
function SurveyCreatorRenderComponent() {
  const options = {
    showLogicTab: true,
  };
  const creator = new SurveyCreator(options);
  creator.JSON = {
    logoPosition: 'right',
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'text',
            name: 'question1',
          },
        ],
      },
    ],
  };
  creator.showSidebar = true;
  return <SurveyCreatorComponent creator={creator} />;
}

export default SurveyCreatorRenderComponent;
