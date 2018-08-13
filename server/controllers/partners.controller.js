import Partner from '../models/partner.model';

const createPartner = async (req, res, next) => {
  const newPartner = new Partner();

  newPartner.fillFromFormData(req.body);

  await newPartner.save();

  res.status(200).json({ error: false, message: 'Partner created successfuly' });
};

const deleteAll = async (req, res, next) => {
  await Partner.deleteMany();

  res.sendStatus(204);
};

const deleteByName = async (req, res, next) => {
  const resp = await Partner.deleteOneByName(req.params.name);

  if(resp.n === 0) {
    res.status(404).json({ error: true, message: 'Partner not found' });
  } else {
    res.sendStatus(204);
  }
};

const getAllPartners = async (req, res, next) => {
  const partners = await Partner.find();

  res.status(200).json(partners);
};

const getByName = async (req, res, next) => {
  const partner = await Partner.findOneByName(req.params.name)

  if(!partner) {
    res.status(404).json({ error: true, message: 'Partner not found' });
  } else {
    res.status(200).json(partner);
  }
};

const updateByName = async (req, res, next) => {
  const partner = await Partner.findOneByName(req.params.name);

  if(!partner) {
    res.sendStatus(404).json({ error: true, message: 'Partner not found' });
  } else {
    partner.fillFromFormData(req.body);

    await partner.save();

    res.status(200).json({ error: false, message: 'Partner updated successfuly' });
  }
};

export { createPartner, deleteAll, deleteByName, getAllPartners, getByName, updateByName };
