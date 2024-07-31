import axios from "axios";

async function httpRequest(method='GET', url='/', data={}, config={}) {
    let response = null;
    let requestURL = process.env.REACT_APP_API_URL + url;

    const instance = axios.create({
        headers: {
            'Authorization': `Token ${sessionStorage.getItem('aivle19_token')}`,
            'Content-Type': 'application/json',
        }
    });

    switch (method) {
        case 'GET':
            response = await instance.get(requestURL);
            break;
        case 'POST':
            response = await instance.post(requestURL, data, config);
            break;
        case 'PATCH':
            response = await instance.patch(requestURL, data);
            break;
        default:
            break;
    }

    return response;
}

export default httpRequest;