import { getAccounts } from "./js/accounts.js";
import { addAccount } from "./js/add-account.js";
import { darkmode } from "./js/darkmode.js";
import { interactive } from "./js/interactive.js";

getAccounts().finally(() => {
    darkmode();
    addAccount();
    interactive();
});