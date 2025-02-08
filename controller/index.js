const CreateCardUser = require('../Model/create_carduser');
// const CryptoJS = require('crypto-js');
//---------------requser-----------------------------
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
