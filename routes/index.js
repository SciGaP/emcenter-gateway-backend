var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/curl-script', function (req, res, next) {
    res.set({"content-disposition": "attachment; filename=\"emc-curl-script.sh\""});

    res.send(
        `
usage="
    -h  show this help text
    -b  base path (default: /images/airavata/1400plus)
    -r  relative path (default: /)"

base_path="/images/airavata/1400plus"
relative_path=""

while getopts ':hbr:' option; do
    case "$option" in
        h) echo "$usage"
            exit;;
        b) base_path=\${OPTARG};;
        r) relative_path=\${OPTARG};;
    esac
done
echo "path: $base_path$relative_path";

curl -X POST http://149.165.156.22:8082/topics/data-orchestrator-file-events \\
-H "Content-Type: application/vnd.kafka.json.v2+json" \\
-H "Accept: application/vnd.kafka.v2+json" \\
--data "{\\"records\\":[{\\"value\\":{\\"resourcePath\\": \\"$base_path$relative_path\\",\\"resourceType\\": \\"FOLDER\\", \\"occuredTime\\": 1630521784509, \\"tenantId\\": \\"${process.env.CUSTOS_CLIENT_ID}\\" , \\"hostName\\" : \\"emc1.carbonate.uits.iu.edu\\", \\"basePath\\": \\"$base_path\\" , \\"eventType\\" : \\"MODIFY\\" , \\"authToken\\" : \\"ZmlsZS1saXN0ZW5lci1zZXJ2aWNlLWFjY291bnQ6dGNrUjRFWjlsNnZiaTdqOUdJN0h6eFNxNzB5NHBpWE9VUVVGM0lRSg==\\"}}]}"
        `
    );
});

module.exports = router;
