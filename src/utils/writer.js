// System packages
const fs = require('fs');

// Installed packages
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const jsonfile = require('jsonfile');
const XLSX = require('xlsx');

const csvWriter = createCsvWriter({
  path: 'storage/out.csv',
  encoding: 'utf-8',
  append: true,
  header: [
    {
      id: 'name',
      title: 'Name',
    },
    {
      id: 'address',
      title: 'Address',
    },
    {
      id: 'city',
      title: 'City',
    },
    {
      id: 'state',
      title: 'State',
    },
    {
      id: 'zip',
      title: 'Zip',
    },
    {
      id: 'phone',
      title: 'Phone',
    },
    {
      id: 'phoneState',
      title: 'PhoneState',
    },
    {
      id: 'email',
      title: 'Email',
    },
  ],
});

const writer = {
  csv: csvWriter,
  json: async (datum, filename = 'tempData') => {
    const FILENAME = `storage/${filename}.json`;
    let data = [];
    if (fs.existsSync(FILENAME)) {
      data = await jsonfile.readFileSync(FILENAME);
    }
    data = [...data, ...datum];
    await jsonfile.writeFileSync(FILENAME, data);
  },
  xlsx: async (jsonData, sheetName = 'Sheet 1', filename = 'out') => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData, {
      dateNF: 'dd/mm/yyyy',
      cellDates: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `storage/${filename}.xlsx`);
  },
};

module.exports = writer;
