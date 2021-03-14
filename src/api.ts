import Axios from "axios";

const baseUrl = "https://www.breakingbadapi.com/api";
const getData = async () => {
    try {
        const request = await Axios.get(`${baseUrl}/characters`);
        if (request.status === 200) {
            return request.data;
        }
        else {
            return false;
        }
    } catch (e) {
        console.error(`Following error occured: ${e}`);
        return false;
    }
};

const getDataById = async(id:string | number) => {
    try {
        const request = await Axios.get(`${baseUrl}/characters/${id}`);
        if (request.status === 200) {
            return request.data;
        }
        else {
            return false;
        }
    } catch(e) {
        console.error(`Following error occured: ${e}`);
        return false;
    }
};

export default ({
    getData,
    getDataById,
});