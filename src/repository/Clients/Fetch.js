const baseDomain = 'http://127.0.0.1:5500';
const baseURL = `${baseDomain}`;

export default {
    get(resource) {
        return fetch(`${baseURL}/${resource}`)
                .then(res => res.json())
                .then(data => data)
                .catch(err => {
                    console.log(err)
                })
    }
}