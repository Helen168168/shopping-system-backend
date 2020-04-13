//你可以用它来发起对远程资源的请求。 该方法返回的是一个Promise对象，让你能够对请求的返回结果进行检索
const fetch = require('node-fetch')

module.exports = class BaseCommon {
    constructor() {
        this.idList = ['user_id'];
    }

    async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {

    }

    async getId(type) {
        if(this.iidList.includes(type)) {
            throw new Error('id type is wrong!')
            return
        }

        try {
            const idData = await Ids.findOne();
            idData[type] ++;
            await idData.save();
            return idData[type];
        } catch(err) {
            throw new Error(err);
        }
    }

}