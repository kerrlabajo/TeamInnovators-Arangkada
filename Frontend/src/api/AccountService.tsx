import axios from "axios";
import { Account } from "./dataTypes";

const ACCOUNT_BASE_URL = "http://localhost:8080/account";

class AccountService {

    getAccountByUsername(username: string) {
        return axios.get(ACCOUNT_BASE_URL + "/getByUsername?username=" + username);
    }

    getAccountById(id: string) {
        return axios.get(ACCOUNT_BASE_URL + "/getAccountById/" + id);
    }

    postAccount(data: Account){
        return axios.post(ACCOUNT_BASE_URL + "/postAccount",data);
    }

    putAccount = (id: string, data: Account) => {
        return axios.put(ACCOUNT_BASE_URL + "/putAccount?accountId" + id, data);
    };

}

export default new AccountService();