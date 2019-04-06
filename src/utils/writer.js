const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

module.exports = csvWriter;
