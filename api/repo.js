import call from "./call.js";
import login from "./login.js";

async function getPrivateRepositories() {
    return await call.makeCall("user/repos");
}

async function getUserRepositories(username) {
    return await call.makeCall(`users/${username}/repos`);
}

export default {
    /**
     * Returns the repositories of the given user, or for the logged in user if no
     * username is given.
     * 
     * @param {string} username
     * @returns {Promise<Array.<Repository>>}
     */
    async getRepositories(username = "") {
        if(!login.isLoggedIn()) return;

        /** @type {Response} */
        let apiResponse;
        if(!username) apiResponse = await getPrivateRepositories();
        else apiResponse = await getUserRepositories(username);

        if(apiResponse.ok)
            return await apiResponse.json();

        // We should implement better error propagation when expanding this library
        else
            return;
    }
}

/**
 * @typedef {Object} Repository
 * @property {int} id
 * @property {string} name
 * @property {string} full_name
 * @property {string} description
 * @property {int} stargazers_count
 */