const data = [
    { name: 'John Doe', gender: 'male', state: 'Delaware', age: '23', born: '2012-01-03', year: '2010' },
    { name: 'Zach Johnson', state: 'Arkansas', gender: 'male', age: '24', born: '2000-01-03',year: '2011' },
    { name: 'Coby Durant', state: ['Arkansas', 'Maine'], gender: 'other', age: '20', born: '1980-01-03', year: '2019' },
    { name: 'James Dean', state: 'Nebraska', gender: 'male', age: '33',  born: '1980-01-03', year: '2022' },
    {name: 'Peter Jackson', state: 'Arkansas', gender: 'male', age: '58',  born: '1971-01-03', year: '2001'},
    {name: 'Larry Bird', state: 'Arkansas', gender: 'male', age: '65',  born: '1958-01-03', year: '1991'},
    {name: 'Dick Cheney',state: 'Kentucky', gender: 'male', age: '78',  born: '1942-03-03', year: '2001'},
    {name: 'Kamala Harris', state: 'Louisiana', gender: 'female', age: '58',  born: '1962-07-03', year: '2020'},
    {name: 'Mike Pence', state: 'Arkansas', gender: 'male', age: '62',  born: '1958-10-13', year: '2016'}
];

const showSearchResultText = true;

const useSort = true;

const sort = ([
        { name: 'Name (ASC)', key: 'name', order: 'asc', type: 'string' },
        { name: 'Name (Desc)', key: 'name', order: 'desc', type: 'string' },
        { name: 'Age (Asc)', key: 'age', order: 'asc', type: 'string' },
        { name: 'Age (Desc)', key: 'age', order: 'desc', type: 'string' },
      ]);
      
const headers = [
    { field: "name", headerName: "Namn" },
    { field: "age", headerName: "Ålder" },
    { field: "gender", headerName: "Kön" },
    { field: "state", headerName: "Stat" },
    { field: "born", headerName: "Födelsedatum" },
    { field: "year", headerName: "År" }
];
const filters = [
    { name: 'gender', key: 'gender', label: 'Kön', type: 'radio', data: {values:[{value:'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]} },
    { name: 'age', key: 'age', label: 'Ålder', type: 'range', data: {values: [1, 100]}},
    { name: 'year', key: 'year', label: 'År', type: 'range', data: {values: [1950, 2030]}},
    { name: 'born', key: 'born', label: 'Födelsedatum', type: 'dateRange', data: {values: {start:'1940-01-21', end: '2021-01-20'}}},
    {name: 'state', key: 'state', label: 'Stat', type: 'chip', data: {values:[
        'Delaware', 
        'Nebraska', 
        'Nevada', 
        'New Hampshire', 
        'New Jersey', 
        'Maryland',
        'Oregon', 
        'Pennsylvania', 
        'Rhode Island',
        'Arkansas', 
        'Louisiana', 
        'Maine', 
        'Maryland', 
        'Kentucky']
    } }
   // {name: 'Active', key:'active', label: 'Aktiv', type: 'switch', data:{}}
  //  { name: 'Categories', label: 'Kategorier', type: 'select', values: [] }
];


export default({
    data,
    useSort,
    showSearchResultText,
    sort,
    filters,
    headers,
});