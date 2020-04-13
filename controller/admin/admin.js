const AdminModel = require('../../models/admin/admin')
const crypto = require('crypto') //加密功能
//formidable是一个用于处理文件、图片、视频等数据上传的模块，支持GB级上传数据处理，支持多种客户端数据提交
const formidable = require('formidable')
const baseCommon = require('../../common/baseCommon')

class Admin extends baseCommon {
    constructor() {
        super() //子类没有this对象,从而继承父类的this对象,从而进行加工,super就是父类的构造函数
        this.encryption = this.encryption.bind(this)
    }
    async login(req, res, next) {
        const form = new formidable.IncomingForm(); //创建一个form表单
        //parse方法解析node.js中request请求中包含的form表单提交的数据。
        form.parse(req, async (err, fields, files) => {
            //执行到这里时,表单已经全部接收完毕
            if(err) {
                res.send({ //发送http响应，参数类型:对象、Buffer对象、数组、字符串
                    status: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                })
            }
            const { user_name, password, status = 1 } = fields;
            try {
                if(!user_name) {
                    throw new Error('用户名错误, 请重新输入');
                } else if(!password) {
                    throw new Error('密码错误,请重新输入');
                }
            } catch(err) {
                res.send({
                    status: 0,
                    type: 'GET_ERROR_PARAM',
                    message: err.message
                })
                return;
            }
            const newpassword = this.encryption(password);
            try {
                const admin = await AdminModel.findOne({ user_name });
                if(!admin) {
                    const adminTip = status === 1 ? '管理员' : '超级管理员'; 
                    const admin_id = await this.getId('admin_id');
                    const newAdmin = {
                        user_name,
                        password: newpassword,
                        id: admin_id,
                        create_time: new Date().format('YYYY-MM-DD'),
                        admin: adminTip,
                        status,
                    }
                    await AdminModel.create(newAdmin);
                    res.send({
                        status: 1,
                        maeesge: 'register user is successful',
                        success: true
                    })
                } else if(newpassword.toString() !== admin.password.toString()) {
                    res.send({
                        status: 0,
                        type: 'ERROR_PASSWORD',
                        message: 'the password is wrong, please correct it'
                    })
                } else {
                    res.send({
                        status: 1,
                        scuuess: true,
                        message: '登录成功'
                    })
                }
            } catch(err) {
                res.send({
                    status: 0,
                    type: 'LOGIN_ADMIN_FAILED',
                    message: 'the login is failed, please try again'
                })
            }
        })
    }

    encryption(password) { //加密密码
        const md5 = crypto.createHash('md5');
		const newpassword = this.Md5(md5.update(password).digest('base64').substr(2, 7) + md5.update(password).digest('base64'));
		return newpassword
    }
}

module.exports = new Admin()