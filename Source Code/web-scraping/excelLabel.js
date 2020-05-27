const XLSX = require('xlsx');
const prompt = require('prompt-sync')();

function excelLabel(indexRow) {
    var workbook = XLSX.readFile('../../Document/khao sat cau hoi chatbot.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var worksheet = workbook.Sheets["Yes No"];
    var resultLabel = [];

    jsonData = XLSX.utils.sheet_to_json(worksheet);

    for (var i = 0; i < 5; i++) {
        result = jsonData[i];

        if (result.PhoneName) {

            indexSearchPhoneName = result.Question.search(result.PhoneName);
            indexSearchPhoneProperty = result.Question.search(result.PhoneProperty);
            indexSearchPhoneCondition = result.Question.search(result.PhoneCondition);
            if (indexSearchPhoneName != -1) {
                var replacePhoneName = "[" + result.PhoneName.trim() + "](phone_name)";
                result.Question = result.Question.replace(result.PhoneName.trim(), replacePhoneName);
            }

            if (result.PhoneProperty) {
                if (indexSearchPhoneProperty != -1) {
                    var replacePhoneProperty = "[" + result.PhoneProperty.trim() + "](phone_property)";
                    result.Question = result.Question.replace(result.PhoneProperty.trim(), replacePhoneProperty);
                }
            }

            if (result.PhoneCondition) {
                if (indexSearchPhoneCondition != -1) {
                    var replacePhoneCondition = "[" + result.PhoneCondition.trim() + "](phone_condition)";
                    result.Question = result.Question.replace(result.PhoneCondition.trim(), replacePhoneCondition);
                }
            }
            resultLabel.push(result.Question);
        }
    }
    return resultLabel;
}

console.log(JSON.stringify(excelLabel(1)));

// var temp = 'A250';
// console.log('B' + temp.slice(1, 4))