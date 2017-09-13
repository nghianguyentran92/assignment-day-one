const fetch = require('node-fetch');
const createAuthenticationHeader = (username, password) => {
    return "Basic " + new Buffer(username + ":" + password).toString("base64");
}
module.exports = program => {
    program.command('pushdata')
        .description('Get orgunit from local and push to www.play.dhis2.org/demo')
        .option('--source [source-link]', 'url source of dhis2')
        .option('--source_username [source-username]', 'username of source')
        .option('--source_password [source-password]', 'password of source')
        .option('--target [target-link]', 'url target of dhis2')
        .option('--target_username [target-username]', 'username of target')
        .option('--target_password [target-password]', 'password of target')
        .action(args => {
          
            (async() => {
                const get = await fetch(args.source, {
                    method: "GET",
                    headers: {
                        Authorization: createAuthenticationHeader(args.source_username, args.source_password)
                    }
                });
                const json = await get.json();
                let orgUnit = {};
                orgUnit["organisationUnits"] = [];
                json.data.map(temp => {
                    orgUnit["organisationUnits"].push({
                        "id": temp.id,
                        "code": temp.code,
                        "name": temp.name,
                        "shortName": temp.shortname,
                        "openingDate": temp.date,
                        "parent": {"id":temp.org_parent}
                    });
                });
                console.log(JSON.stringify(orgUnit));
                const push = await fetch(args.target, {
                    method: "POST",
                    body: JSON.stringify(orgUnit),
                    headers: {
                        Authorization: createAuthenticationHeader(args.target_username, args.target_password),
                        "Content-Type" : "application/json",                
                    }
                });
                //const json_push = await push.json();
                console.log("done");
            })();

//dhis2-command pushdata --source http://localhost:8600 --source_username admin --source_password admin --target https://play.dhis2.org/demo/api/metadata --target_username admin --target_password district
// curl -d @test.json "https://play.dhis2.org/demo/api/metadata" -X POST -H "Content-Type: application/json" -u admin:district -v
        });
}