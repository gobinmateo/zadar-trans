import Intervention from '../models/intervention.model';

const getOpenInterventions = async (req, res, next) => {
  const openInterventions = await Intervention.getOpenInterventions();

  res.status(200).json(openInterventions);
};

export { getOpenInterventions };
