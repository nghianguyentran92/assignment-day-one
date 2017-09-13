let XLSX = require('xlsx');


const readData = () => {
    let workbook = XLSX.readFile(`./template_importOrgUnit_longitude_latitude.xlsx`);
    const charts = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    return charts;
}


module.exports = {
    readData
};