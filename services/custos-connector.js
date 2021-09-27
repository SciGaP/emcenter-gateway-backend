const axios = require('axios')
const yaml_config = require('node-yaml-config');
const config = yaml_config.load('./services/config/config.dev.yml');
const baseURL = "https://" + config.custos.host + ":" + config.custos.port + "/"
const base64Encoded = Buffer.from(config.custos.clientId + ":" + config.custos.clientSec).toString('base64')

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