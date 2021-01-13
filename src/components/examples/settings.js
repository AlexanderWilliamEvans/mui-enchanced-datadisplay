const data = [
    { name: 'John Doe', age: '23', year: '2010' },
    { name: 'Zach Johnson', age: '24', year: '2011' },
    { name: 'Coby Durant', age: '20', year: '2019' },
    { name: 'James Dean', age: '33', year: '2022' },
    {name: 'Peter Jackson', age: '58', year: '2001'},
    {name: 'Larry Bird', age: '65', year: '1991'},
    {name: 'Dick Cheney', age: '78', year: '2001'}
];

const sort = [
    { name: 'Namn (Stigande)', order: 'Asc', type: 'string' },
    { name: 'Namn (Fallande)', order: 'Desc', type: 'string' },
    { name: 'Ålder (Stigande)', order: 'Asc', type: 'int' },
    { name: 'Ålder (Fallande)', order: 'Desc', type: 'int' },
];
const filter = [
    { name: 'Gender', label: 'Kön', type: 'radio', values: ['Man, Female, Other'] },
  //  { name: 'Age', label: 'Ålder', type: 'range', values: [1, 4] },
  //  { name: 'Created', label: 'Skapad', type: 'dateRange', values: [1, 2] },
  //  { name: 'Categories', label: 'Kategorier', type: 'select', values: [] }
];


export default({
    data,
    sort,
    filter
});