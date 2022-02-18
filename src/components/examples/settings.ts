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
    { name: 'status', key: 'status', label: 'status', type: 'radio', data: {values:[{value:'Presumed dead', label: 'Presumed dead'}, {value: 'Alive', label: 'Alive'}, {value: "Deceased", label: "Deceased"}]} },
    { name: 'age', key: 'age', label: 'Ålder', type: 'range', data: {values: [1, 100]}},
    { name: "appearance", key: "appearance", label: "Appearance", type: 'range', data: {values: [0, 10000]}},
    { name: 'birthday', key: 'birthday', label: 'birthday', type: 'dateRange', data: {values: {start:'1900-01-21', end: '2021-01-20'}}},
    {name: 'category', key: 'category', label: 'Category', type: 'chip', data: {values:[
       "Breaking bad",
        "Better Call Saul",
    ]
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