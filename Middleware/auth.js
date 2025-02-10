// const jwt = require('jsonwebtoken');
// const CryptoJS = require('crypto-js');

// module.exports.auth = async (req, res, next) => {
//   try {
//     const token = req.headers['tokencard'];
//     // console.log(token);
//     if (!token) {
//       return res.status(401).send('No token');
//     }
//     // console.log(token, 'tokotkadfdf');
//     // Decrypt
//     var bytes = CryptoJS.AES.decrypt(token, process.env.SecretKey);
//     var originalText = bytes.toString(CryptoJS.enc.Utf8);
//     const decode = jwt.verify(originalText, process.env.SecretKey);
//     // console.log('decoded=>', decode);
//     req.user = decode.user;
//     // console.log(req.user, 'ggggg');
//     next();
//   } catch (error) {
//     console.log(error);
//     res.send('Server Filed');
//   }
// };
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

module.exports.auth = async (req, res, next) => {
  try {
    // รับ token จาก Header (ลองรับทั้ง 'tokencard' และ 'Authorization: Bearer <token>')
    let token = req.headers['tokencard'] || req.headers['authorization'];

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    // ถ้าเป็นแบบ Bearer Token → ดึงเฉพาะ token ออกมา
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    // Decrypt Token
    const bytes = CryptoJS.AES.decrypt(token, process.env.SecretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify JWT
    const decoded = jwt.verify(decryptedToken, process.env.SecretKey);

    // แนบข้อมูลผู้ใช้ไปกับ `req.user`
    req.user = decoded.user;

    next(); // ไปยัง Middleware หรือ Controller ตัวถัดไป
  } catch (error) {
    console.error(error);

    // ตรวจจับข้อผิดพลาดจาก JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};
