# simple-connector

simple connector example

## usage

### Dependencies

1. Clone the connector POC in a local folder
2. Reference the path to the connector project in `import_map.json` field
   `"deno-slack-connectors/"`

### Run

IMPORTANT: replace the `"google_spreadsheet_id"` value with a google spreadsheet
you created, it must have a sheet named "Responses"

Run the following command, when prompted;

1. Install your app to a workspace
2. create the `triggers/answer_survey.ts` shortcut trigger when prompted
3. Paste the shortcut like in a channel

```zsh
slack run
```

### Make an error

change the `sheet_name` to a random value
