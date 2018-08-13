import mongoose from 'mongoose';

import User from '../models/user.model';

const CompanySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  users: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'User'
  }],
});

CompanySchema.methods.fillFromFormData = async function fillFromFormData(data) {
  const { id, name, users } = data;

  if(id) this.id = id;
  if(name) this.name = name;

  if(users) {
    for(const email of users) {
      const user = await User.findOneByEmail(email);

      if(user) this.users.push(user._id);
    }
  }
};

CompanySchema.statics.checkNameInUse = (name) => {
  return Company.find({ name }).limit(1).then(companies => {
    if (companies[0]) {
      return Promise.reject('Name already in use');
    }
  });
};

CompanySchema.statics.checkIdInUse = (id) => {
  return Company.find({ id }).limit(1).then(companies => {
    if (companies[0]) {
      return Promise.reject('Id already in use');
    }
  });
};

CompanySchema.statics.deleteOneByName = (name) => {
  return Company.deleteOne({ name });
};

CompanySchema.statics.findOneByName = (name) => {
  return Company.findOne({ name });
};

const Company = mongoose.model('Company', CompanySchema);

export default Company;
