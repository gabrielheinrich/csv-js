const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const axios = require("axios");
const request = require("request");
const unzipper = require("unzipper");
const koa = require("koa");
const cors = require("@koa/cors");

const app = new koa();

async function main() {
  const directory = await unzipper.Open.url(
    request,
    "https://storage.googleapis.com/kaggle-data-sets/596958/1073629/bundle/archive.zip?GoogleAccessId=web-data@kaggle-161607.iam.gserviceaccount.com&Expires=1590231962&Signature=L3coodByP3OpwT55ykZY2qHN4LC22PI9QqTNseTWQvA5O%2FMYt35CEmex0hD%2BrioNxifYe0X50zQXLwRB0N%2Fu6FFEkgTmZuGRWGHR%2BLnlPE2XgPcgazystbjEUzZPeYa557U68ZKCQjMrw2O6L%2BWNIB693MTE%2B1YJ%2BCgtaodUqFzqYXKrOhShqGR%2FgPDGgr81QyIemdaPnlvGf0aFnWnt6WcE00O6gHX%2FfwJGZ5uSEMjsOa5F836D0DVRcy22PLxWf3MV3vTZrDsN%2Bg7soo28Jqmhx3yPElV1bJ31mrD3PfUMod%2Br8U3DBQm23YEepC7f7lThfSS1JzhRuINWR0WDbQ%3D%3D&response-content-disposition=attachment%3B+filename%3Dfactors-affecting-campus-placement.zip"
  );

  const file = directory.files[0];
  const content = await file.buffer();
  const data = parse(content.toString(), { columns: true });

  app.use((ctx, next) => {
    ctx.body = data;
    next();
  });
  app.use(cors());

  app.listen(3000, () => {
    console.log("started");
  });
}

main();
