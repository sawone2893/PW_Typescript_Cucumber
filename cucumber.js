const common = `
--require-module ts-node/register
--require test.setup.ts
--require test/stepDefintions/*.ts
--format json:reports/ExecutionReport.json
--format summary
--format progress-bar
--format @cucumber/pretty-formatter
--format html:report/report.html
--publish-quiet
--exit
`;
module.exports={
    default:`${common}`
};