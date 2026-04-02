import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const payload = JSON.stringify({
        email: 'test@test.com',
        password: '123456'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('https://api.example.com/login', payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}