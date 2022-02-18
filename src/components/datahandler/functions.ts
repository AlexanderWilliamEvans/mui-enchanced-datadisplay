/* eslint-disable import/no-anonymous-default-export */

// For Reading CSV File
const readCSV = (event:any) => {
const reader = new FileReader();
reader.readAsText(event.files[0]);
reader.onload = () => {
    const text = reader.result;
    const csvToJson = csvToJSON(text);
    return csvToJSON;
};
}


const csvToJSON = (csvText:any) => {
    let lines:any = [];
const linesArray = csvText.split('\n');
// for trimming and deleting extra space 
linesArray.forEach((e: any) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
    lines.push(row);
});
// for removing empty record
lines.splice(lines.length - 1, 1);
const result = [];
const headers = lines[0].split(",");

for (let i = 1; i < lines.length; i++) {

    const obj:any = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = currentline[j];
    }
    result.push(obj);
}
//return result; //JavaScript object
// return JSON.stringify(result); //JSON
return result;
  };

  export default ({
    readCSV,
    csvToJSON,
  });