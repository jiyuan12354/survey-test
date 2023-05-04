import React from 'react';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';
import { Serializer } from 'survey-core';
import { PropertyGridEditorCollection } from 'survey-creator-core';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import './index.css';

Serializer.addProperty('question', {
  name: 'shortname',
  displayName: 'Short name',
  type: 'shorttext',
  isRequired: true,
  category: 'general',
  visibleIndex: 3,
});

PropertyGridEditorCollection.register({
  fit: function (prop) {
    return prop.type === 'shorttext';
  },
  getJSON: function (obj, prop, options) {
    return { type: 'text', maxLength: 5 };
  },
});

// 然后在调查问卷编辑器中可以使用这个新的属性
function SurveyCreatorRenderComponent() {
  const options = {
    showLogicTab: true,
  };
  const creator = new SurveyCreator(options);
  return <SurveyCreatorComponent creator={creator} />;
}

export default SurveyCreatorRenderComponent;
