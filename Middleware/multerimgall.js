// const multer = require('multer');
// const crypto = require('crypto-js');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/img_all/');
//   },
//   filename: function (req, file, cb) {
//     const randomString = crypto.lib.WordArray.random(3).toString(
//       crypto.enc.Hex
//     ); // Generates a 6-character random string
//     const originalFileExtension = file.originalname.split('.').pop();
//     cb(null, randomString + '-' + Date.now() + '.' + originalFileExtension);
//   },
// });

// const uploadAll = multer({ storage: storage });

// module.exports = uploadAll;
