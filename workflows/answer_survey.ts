import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { Connectors } from "deno-slack-connectors/mod.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/automation/forms#add-interactivity
 */
const AnswerSurveyWorkflow = DefineWorkflow({
  callback_id: "answer_survey",
  title: "Respond to a survey",
  description: "Add comments and feedback to a survey",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
    },
    required: [
      "interactivity",
    ],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */

// Step 1: Collect feedback in a form
const response = AnswerSurveyWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Survey your thoughts",
    description: "What do you think about the topic of this message?",
    interactivity: AnswerSurveyWorkflow.inputs.interactivity,
    submit_label: "Share",
    fields: {
      elements: [{
        name: "comments",
        title: "Comments",
        type: Schema.types.string,
        description: "Any additional ideas to share?",
        long: true,
      }],
      required: ["comments"],
    },
  },
);

AnswerSurveyWorkflow.addStep(
  Connectors.GoogleSheets.functions.AddSpreadsheetRow,
  {
    google_access_token: {
      credential_source: "END_USER",
    },
    spreadsheet_id: "google_spreadsheet_id",
    columns: [
      "=NOW()",
      response.outputs.fields.comments,
    ],
    sheet_title: "Responses",
  },
);

export default AnswerSurveyWorkflow;
