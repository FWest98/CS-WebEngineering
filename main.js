import repo from "./api/repo.js";
import login from "./api/login.js";

login.login("fwest98", "44c1992fa91ad4b6a389c08c5dbde92b5a27578f");

repo.getRepositories("fwest98").then(x => {
    console.log(x);
});