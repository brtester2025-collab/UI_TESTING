import http from 'k6/http'
import { check, sleep } from 'k6'


export const option = {

    vus: 10,
    duration: '30s'

}

export default function () {
    const res = http.get('http://test.k6.io/')


    check(res, {
        'verify homepage text': (r) =>
            r.body.includes('Looking to break out of your pizza routine?')

    })
}