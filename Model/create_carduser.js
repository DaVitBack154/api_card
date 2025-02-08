const mongoose = require('mongoose');
const CreateCardUserSchema = mongoose.Schema(
  {
    name_img_user: String,
    namefile: String,
    name_user: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('create_Carduser', CreateCardUserSchema);
