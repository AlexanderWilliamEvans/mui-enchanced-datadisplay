const data = [
    { name: 'John Doe', gender: 'male', age: '23', year: '2010' },
    { name: 'Zach Johnson', gender: 'male', age: '24', year: '2011' },
    { name: 'Coby Durant', gender: 'other', age: '20', year: '2019' },
    { name: 'James Dean', gender: 'male', age: '33', year: '2022' },
    {name: 'Peter Jackson', gender: 'male', age: '58', year: '2001'},
    {name: 'Larry Bird', gender: 'male', age: '65', year: '1991'},
    {name: 'Dick Cheney', gender: 'male', age: '78', year: '2001'},
    {name: 'Kamala Harris', gender: 'female', age: '58', year: '2020'},
    {name: 'Mike Pence', gender: 'male', age: '62', year: '2016'}
];

const sort = [
    { name: 'Name (Asc)', key: 'name', order: 'asc', type: 'string' },
    { name: 'Name (Desc)', key: 'name', order: 'desc', type: 'string' },
    { name: 'Age (Asc)', key: 'age', order: 'asc', type: 'int' },
    { name: 'Age (Desc)', key: 'age', order: 'desc', type: 'int' },
];
const filters = [
    { name: 'gender', key: 'gender', label: 'Kön', type: 'radio', data: {type: 'list', values:[{value:'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]} },
  //  { name: 'Age', label: 'Ålder', type: 'range', values: [1, 4] },
  //  { name: 'Created', label: 'Skapad', type: 'dateRange', values: [1, 2] },
  //  { name: 'Categories', label: 'Kategorier', type: 'select', values: [] }
];


export default({
    data,
    sort,
    filters
});