/* eslint-disable import/no-anonymous-default-export */


const isValidUrl = (url:string) => {
    const result = String(url).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return result !== null;
};

const splitObjectByKey = (obj: any, splitKey: string) => {
    const before = {};
    const after = {};
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const breakIndex = keys.indexOf(splitKey);
    const beforeValues = values.splice(0, breakIndex);
    const afterValues = values
    for (let key in obj) {
        if (splitKey) {
            after[key] = obj[key]; 
        }
        else {
            before[]
        }
    }
    return { before, after };
};


export default {
    isValidUrl,
    splitObjectByKey,
}