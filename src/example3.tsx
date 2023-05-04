import React, { useState } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import { Serializer } from "survey-core";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import "./index.css";

// Remove a property to the page object. You can't set it in JSON as well
Serializer.removeProperty("panelbase", "visibleIf");
// Remove a property from the base question class and as result from all questions
Serializer.removeProperty("question", "visibleIf");

function SurveyCreatorRenderComponent() {
  const [surveyJSON, setSurveyJSON] = useState({});

  const options = {
    showLogicTab: true,
  };
  const creator = new SurveyCreator(options);

  creator.onShowingProperty.add(function(sender, options) {
    if (options.obj.getType() === "survey") {
      // 'title'
      // 'description'
      // 'showTitle'
      // 'locale'
      // 'mode'
      // 'cookieName'
      // 'widthMode'
      // 'width'
      // 'logo'
      // 'logoWidth'
      // 'logoHeight'
      // 'logoFit'
      // 'showPreviewBeforeComplete'
      // 'pagePrevText'
      // 'pageNextText'
      // 'completeText'
      // 'previewText'
      // 'editText'
      // 'startSurveyText'
      // 'showNavigationButtons'
      // 'showPrevButton'
      // 'firstPageIsStarted'
      // 'goNextPageAutomatic'
      // 'showProgressBar'
      // 'progressBarType'
      // 'questionsOnPageMode'
      // 'showTOC'
      // 'tocLocation'
      // 'questionTitleLocation'
      // 'questionDescriptionLocation'
      // 'showQuestionNumbers'
      // 'questionTitlePattern'
      // 'requiredText'
      // 'questionStartIndex'
      // 'questionErrorLocation'
      // 'focusFirstQuestionAutomatic'
      // 'questionsOrder'
      // 'maxTextLength'
      // 'maxOthersLength'
      // 'autoGrowComment'
      // 'pages'
      // 'showPageTitles'
      // 'showPageNumbers'
      // 'calculatedValues'
      // 'triggers'
      // 'clearInvisibleValues'
      // 'textUpdateMode'
      // 'sendResultOnPageNext'
      // 'storeOthersAsComment'
      // 'focusOnFirstError'
      // 'checkErrorsMode'
      // 'navigateToUrl'
      // 'showCompletedPage'
      // 'completedHtml'
      // 'navigateToUrlOnCondition'
      // 'completedHtmlOnCondition'
      // 'loadingHtml'
      // 'completedBeforeHtml'
      // 'maxTimeToFinish'
      // 'maxTimeToFinishPage'
      // 'showTimerPanel'
      // 'showTimerPanelMode'
      options.canShow = options.property.name === "title" || options.property.name === "description";
    }
  });

  // Update survey JSON using creator.text property
  function handleUpdateJSON(newJSON: any) {
    creator.text = JSON.stringify({...creator.getSurveyJSON(), ...newJSON});
    
    creator.JSON = creator.text;
    setSurveyJSON(creator.text);
  }

  return (
    <>
      <button onClick={() => handleUpdateJSON({ title: "My Survey" })}>
        Update Survey JSON
      </button>
      <SurveyCreatorComponent creator={creator} />
    </>
  );
}

export default SurveyCreatorRenderComponent;