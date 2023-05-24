import { Manifest } from "deno-slack-sdk/mod.ts";

import AnswerSurveyWorkflow from "./workflows/answer_survey.ts";

export default Manifest({
  name: "Simple Survey",
  description: "Gather comments in a spreadsheet",
  icon: "assets/default_new_app_icon.png",
  workflows: [
    AnswerSurveyWorkflow,
  ],
  outgoingDomains: ["sheets.googleapis.com", "raw.githubusercontent.com"],
  botScopes: [
    "channels:join",
    "commands",
    "triggers:read",
  ],
});
