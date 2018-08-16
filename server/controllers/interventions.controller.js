import Intervention from '../models/intervention.model';

const createNew = async (req, res, next) => {
  const newIntervention = new Intervention();
console.log(req.session.role)
  await newIntervention.fillFromFormData(req.body);

  await newIntervention.save();

  res.status(200).json(newIntervention);
};

const deleteAll = async (req, res, next) => {
  await Intervention.deleteMany();

  res.sendStatus(204);
};

const deleteById = async (req, res, next) => {
  const resp = await Intervention.deleteOneById(req.params.id);

  if(resp.n === 0) {
    res.status(404).json({ error: true, message: 'Intervention not found' });
  } else {
    res.sendStatus(204);
  }
};

const getAll = async (req, res, next) => {
  const interventions = await Intervention.find().populate('partner').populate('company');

  res.status(200).json(interventions);
};

const getById = async (req, res, next) => {
  const intervention = await Intervention.findOneById(req.params.id).populate('partner').populate('company');

  if(!intervention) {
    res.status(404).json({ error: true, message: 'Intervention not found' });
  } else {
    res.status(200).json(intervention);
  }
};

const updateById = async (req, res, next) => {
  const intervention = await Intervention.findOneById(req.params.id);

  if(!intervention) {
    res.status(404).json({ error: true, message: 'Intervention not found' });
  } else {
    intervention.fillFromFormData(req.body);

    await intervention.save();

    res.status(200).json({ error: false, message: 'Intervention updated successfuly' });
  }
};

export { createNew, deleteAll, deleteById, getAll, getById, updateById };
