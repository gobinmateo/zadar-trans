import Company from '../models/company.model';

const createNew = async (req, res, next) => {
  const newCompany = new Company();

  await newCompany.fillFromFormData(req.body);

  await newCompany.save();

  res.status(200).json({ error: false, message: 'Company created successfuly' });
};

const deleteAll = async (req, res, next) => {
  await Company.deleteMany();

  res.sendStatus(204);
};

const deleteByName = async (req, res, next) => {
  const resp = await Company.deleteOneByName(req.params.name);

  if(resp.n === 0) {
    res.status(404).json({ error: true, message: 'Company not found' });
  } else {
    res.sendStatus(204);
  }
};

const getAll = async (req, res, next) => {
  const companies = await Company.find().populate('users');

  res.status(200).json(companies);
};

const getByName = async (req, res, next) => {
  const company = await Company.findOneByName(req.params.name).populate('users');

  if(!company) {
    res.status(404).json({ error: true, message: 'Company not found' });
  } else {
    res.status(200).json(company);
  }
};

export { createNew, deleteAll, deleteByName, getAll, getByName };
