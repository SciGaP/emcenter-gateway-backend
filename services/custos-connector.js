const axios = require('axios')
require('dotenv').config();
const baseURL = "https://" + process.env.CUSTOS_HOST + ":" + process.env.CUSTOS_PORT + "/"
const base64Encoded = Buffer.from(process.env.CUSTOS_CLIENT_ID + ":" + process.env.CUSTOS_CLIENT_SEC).toString('base64')

const isAuthenticated = async (auth_token) => {
    try {
        const url = baseURL + "identity-management/v1.0.0/authenticate/status"
        payload = {
            "access_token": auth_token
        }
        conf = {
            headers: {
                Authorization: 'Bearer ' + base64Encoded
            }
        }
        let response = await axios.post(url, payload, conf)
        console.log(response.data)
        return response.data.authenticated
    }catch (exception) {
        console.debug("Error occurred while authenticating user",exception)
        return false
    }
}

module.exports = {
    isAuthenticated
}