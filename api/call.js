import login from "./login.js";

export default {
    /**
     * Makes an API call to the given url with the stored credentials
     * 
     * @param {string} url 
     * @param {string} method 
     * @returns {Promise<Response>}
     */
    async makeCall(url, method = "GET") {
        const credentials = login.getCredentials();

        return await fetch(`https://api.github.com/${url}`, {
            method: method,
            headers: {
                "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.key}`)}`,
                "Content-Type": "application/json"
            }
        });
    },
}