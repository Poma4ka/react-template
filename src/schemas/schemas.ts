import {object} from "yup";
import Fields from "./fields";

class Schemas {

    login() {
        return object().shape({
            login: Fields.login(true),
            password: Fields.password(true)
        })
    }

}

export default new Schemas()