import React, { FC, useEffect } from 'react';
import { SurveyCreator as SurveyJSCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { ICreatorOptions, settings } from 'survey-creator-core';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.min.css';
import 'survey-core/survey.i18n';
import { surveyLocalization, Serializer } from 'survey-core';

surveyLocalization.supportedLocales = ['en', 'zh-tw', 'id'];
//remove a property to the page object. You can't set it in JSON as well
Serializer.removeProperty('panelbase', 'visibleIf');
//remove a property from the base question class and as result from all questions
Serializer.removeProperty('question', 'visibleIf');

type SurveyCreatorProps = {
  content?: Record<string, unknown>;
  onChangeContent: (content: Record<string, unknown>) => void;
};

const SurveyCreator: FC<SurveyCreatorProps> = ({ content, onChangeContent }) => {
  const options: ICreatorOptions = {
    showJSONEditorTab: true,
    showTranslationTab: true,
    maxLogicItemsInCondition: 1,
    // readOnly: true,
    // showSurveyTitle: false,
    customPanels: {
      myPanel: {
        title: 'My Panel',
        iconName: 'icon-panel',
        templateName: 'my-panel',
        action: () => {
          console.log('My Panel clicked');
        },
        properties: [
          {
            name: 'myProperty',
            title: 'My Property',
            category: 'general',
            valueType: 'string',
            defaultValue: '',
            editor: 'string',
          },
        ],
      },
    },
  };

  const creator = new SurveyJSCreator(options);

  // https://surveyjs.io/survey-creator/examples/remove-properties-from-property-grid/reactjs#content-code
  const blackList = ['visible', 'isRequired'];
  creator.onShowingProperty.add(function (sender, options) {
    if (options.obj.getType() == 'survey') {
      options.canShow = options.property.name == 'title';
    }
    if (options.obj.getType() == 'panel') {
      // Hide properties found in `blackList`
      options.canShow = blackList.indexOf(options.property.name) < 0;
    }
  });
  creator.onDesignerSurveyCreated.add((sender, options) => {
    console.log(new Date(), '________------------>>>>>>>>>>onDesignerSurveyCreated', options?.survey);
    if (options?.survey?.pages?.[0]?.elements?.[0]?.setShowAddQuestionButton !== undefined) {
      console.log(new Date(), '________------------>>>>>>>>>>setShowAddQuestionButton', 222222222222);
      options.survey.pages[0].elements[0].setShowAddQuestionButton(false);
    }
  });
  // settings.designer.showAddQuestionButton = false;
  creator.onElementAllowOperations.add(function (_, options) {
    if (options.obj?.getType() === 'panel') {
      console.log(new Date(), '________------------>>>>>>>>>>options', Object.keys(options));
      options.allowChangeType = false;
    }
  });
  useEffect(() => {
    creator.onUploadFile.add(function (creator, option) {
      option.files.forEach(async function (file: any) {
        option.callback('success', file);
      });
    });
    //  Enable Commercial License
    creator.haveCommercialLicense = true;

    if (content !== undefined) {
      creator.text = JSON.stringify(content);
    }

    creator.saveSurveyFunc = () => {
      console.log(new Date(), '________------------>>>>>>>>>>11111', 11111);
      onChangeContent(creator.JSON);
    };
    // eslint-disable-next-line
  }, []);
  return <SurveyCreatorComponent creator={creator} />;
};

export default SurveyCreator;
