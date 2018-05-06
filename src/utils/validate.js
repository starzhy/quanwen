export default {
    trim (str) {
        if (!str) {
            return '';
        }
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    isName (str) {
        if (!str) {
            return false;
        }
        let trimStr = this.trim(str);
        let regName = /^[\u4E00-\u9FA5a-zA-Z]+$/;
        if (!regName.test(trimStr)) {
            return false;
        }

        return true;
    },
    isAddress (str) {
        if (!str) {
            return false;
        }

        let trimStr = this.trim(str);
        if (trimStr.length < 5 || trimStr.length > 60) {
            return false;
        }

        return true;
    },
    isContact (str) {
        if (!str) {
            return false;
        }
        let trimStr = this.trim(str);
        if (trimStr.length < 5 || trimStr.length > 20) {
            return false;
        }

        let regContact = /^[0-9]+$/;
        if (!regContact.test(trimStr)) {
            return false;
        }

        return true;
    },
    isPhone (phone, oldPhone) {
        if (!phone) {
            return false;
        }

        if (this.trim(phone) === this.trim(oldPhone)) {
            return true;
        }

        let regPhone = /^1(33|53|73|77|80|81|89|34|35|36|37|38|39|50|51|52|57|58|59|78|82|83|84|87|88|30|31|32|55|56|75|76|85|86|70|71|44|46|47)[0-9]{8}$/;
        if (!regPhone.test(this.trim(phone))) {
            return false;
        }

        return true;
    },
    isExpress (expressNo) {
        let expressValue = expressNo.trim();
        let regExpress = /^[0-9]{12}$/;
        if (!regExpress.test(this.trim(expressValue))) {
            return false;
        }

        return true;
    }
};
