import {string} from "yup";

class Fields {

    login(required?: boolean) {
        const field = string();
        return required ? field.required("Введите Email или имя пользователя") : field;
    }

    password(required?: boolean) {
        const field = string()
            .min(8,"Минимальная длина пароля - 8 символов");
        return required ? field.required("Введите пароль") : field;
    }

}

export default new Fields()