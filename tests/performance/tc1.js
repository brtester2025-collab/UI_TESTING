import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '20s'
}

export default function () {
    http.get('http://test.k6.io/') // function to get the API from the result
    sleep(1)
}

