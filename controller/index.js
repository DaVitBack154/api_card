const CreateCardUser = require('../Model/create_carduser');
const LogloginUser = require('../Model/log_login');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่าได้ส่ง email และ password มาหรือไม่
    if (!email || !password) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    // ค้นหาผู้ใช้จากฐานข้อมูล
    const user = await CreateCardUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง payload สำหรับ JWT
    const payload = {
      user: {
        _id: user._id,
        fname: user.fname,
        tname: user.tname,
        position: user.position,
        phone: user.phone,
        phone_off: user.phone_off,
        email: user.email,
        role: user.role,
      },
    };

    // สร้าง JWT Token
    jwt.sign(
      payload,
      process.env.SecretKey,
      { expiresIn: '1d' }, // Token มีอายุ 1 วัน
      (err, token) => {
        if (err) throw err;

        // เข้ารหัส token ด้วย CryptoJS
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          process.env.SecretKey
        ).toString();

        return res
          .status(200)
          .json({ user: payload.user, token: encryptedToken });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};

module.exports.getprofile = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized: Token Invalid' });
    }

    let email = req.user.email;

    // ค้นหาข้อมูลผู้ใช้จากฐานข้อมูล
    let dataProfile = await CreateCardUser.findOne({ email });

    if (!dataProfile) {
      return res.status(404).json({
        status: 404,
        message: 'ไม่พบข้อมูลโปรไฟล์',
      });
    }

    return res.status(200).json({
      status: 200,
      data: dataProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};

module.exports.CreateCardUser = async (req, res) => {
  try {
    // code
    console.log(req.body);
    const datacard = await CreateCardUser(req.body).save();
    return res.json({ status: true, data: datacard });
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports.GetCardUser = async (req, res) => {
  try {
    const dataUserReq = await CreateCardUser.find({})
      .sort({ createdAt: -1 })
      .exec();
    return res.json({ status: true, data: dataUserReq });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

module.exports.LogloginUser = async (req, res) => {
  try {
    // code
    console.log(req.body);
    const logdata = await LogloginUser(req.body).save();
    return res.json({ status: true, data: logdata });
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send('Server Error');
  }
};
