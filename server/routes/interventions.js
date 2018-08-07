import express from 'express';
import updateAttributesFromParams from '../utils/paramsParser';

import Intervention from '../models/intervention.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Intervention.deleteMany();

  res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Id has to be provided!' });

  await Intervention.deleteOne({ id });

  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const interventions = await Intervention.find();

  res.json(interventions);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Id has to be provided!' });

  const intervention = await Intervention.findOne({ id });

  if(!intervention) {
    res.status(403).send({ error: 'Intervention with provided id does not exist!' });
  } else {
    res.json(intervention);
  }
});

router.put('/:id', async (req, res, next) => {
  const {
    accidentArrivalDate,
    accidentLocation,
    additionalVechileInfo,
    chassisNumber,
    checkoutRemark,
    companyID,
    dischargeLocation,
    firstRegistrationDate,
    id,
    insurancePolicyNumber,
    interventionCompletionDate,
    interventionRecievalDate,
    interventionStatus,
    partnerID,
    paymentMethod,
    peopleCount,
    phoneNumber,
    registrationPlate,
    remark,
    vehicleModel,
    vehicleStatus,
    victimName,
  } = req.body;

  if(id === undefined) {
    res.status(400).send({ error: 'Intervention id has to be provided!' });
  }

  const intervention = await Intervention.findOne({ id });

  // intervention doesn't exist
  if(!intervention) {
    res.status(403).send({ error: 'Intervention with provided id does not exist!' });
  } else {
    intervention.accidentArrivalDate = accidentArrivalDate;
    intervention.accidentLocation = accidentLocation;
    intervention.additionalVechileInfo = additionalVechileInfo;
    intervention.chassisNumber = chassisNumber;
    intervention.checkoutRemark = checkoutRemark;
    intervention.companyID = companyID;
    intervention.dischargeLocation = dischargeLocation;
    intervention.firstRegistrationDate = firstRegistrationDate;
    intervention.id = id;
    intervention.insurancePolicyNumber = insurancePolicyNumber;
    intervention.interventionCompletionDate = interventionCompletionDate;
    intervention.interventionRecievalDate = interventionRecievalDate;
    intervention.interventionStatus = interventionStatus;
    intervention.partnerID = partnerID;
    intervention.paymentMethod = paymentMethod;
    intervention.peopleCount = peopleCount;
    intervention.phoneNumber = phoneNumber;
    intervention.registrationPlate = registrationPlate;
    intervention.remark = remark;
    intervention.vehicleModel = vehicleModel;
    intervention.vehicleStatus = vehicleStatus;
    intervention.victimName = victimName;

    await intervention.save();

    res.status(200).send({ message: 'Intervention successfully updated.' });
  }
});

router.post('/', async (req, res, next) => {
  // if(id === undefined) {
  //   res.status(400).send({ error: 'Intervention id has to be provided!' });
  // }

  const intervention = await Intervention.findOne({ id });

  if(intervention) {
    res.status(403).send({ error: 'Intervention with provided email already exists!' });
  } else {
    const newIntervention = new Intervention();

    updateAttributesFromParams(req.body, newIntervention);

    await newIntervention.save();

    res.status(200).send({ message: 'Intervention successfully added to database.' });
  }
});

export default router;
