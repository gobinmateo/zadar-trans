import express from 'express';

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
  console.log(intervention);
  if(!intervention) {
    res.status(403).send({ error: 'Intervention with provided id does not exist!' });
  } else {
    res.json(intervention);
  }
});

router.put('/', async (req, res, next) => {
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
  console.log(' U POSTU');
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

  // both parameters have to be present
  if(id === undefined) {
    console.log('ID UNDEFINED');
    return res.status(400).send({ error: 'Intervention id has to be provided!' });
  }

  const intervention = await Intervention.findOne({ id });

  if(intervention) {
    console.log('ID ALREADY IN USE');
    res.status(403).send({ error: 'Intervention with provided id already exists!' });
  } else {
    const newIntervention = new Intervention();

    newIntervention.accidentArrivalDate = accidentArrivalDate;
    newIntervention.accidentLocation = accidentLocation;
    newIntervention.additionalVechileInfo = additionalVechileInfo;
    newIntervention.chassisNumber = chassisNumber;
    newIntervention.checkoutRemark = checkoutRemark;
    newIntervention.companyID = companyID;
    newIntervention.dischargeLocation = dischargeLocation;
    newIntervention.firstRegistrationDate = firstRegistrationDate;
    newIntervention.id = id;
    newIntervention.insurancePolicyNumber = insurancePolicyNumber;
    newIntervention.interventionCompletionDate = interventionCompletionDate;
    newIntervention.interventionRecievalDate = interventionRecievalDate;
    newIntervention.interventionStatus = interventionStatus;
    newIntervention.partnerID = partnerID;
    newIntervention.paymentMethod = paymentMethod;
    newIntervention.peopleCount = peopleCount;
    newIntervention.phoneNumber = phoneNumber;
    newIntervention.registrationPlate = registrationPlate;
    newIntervention.remark = remark;
    newIntervention.vehicleModel = vehicleModel;
    newIntervention.vehicleStatus = vehicleStatus;
    newIntervention.victimName = victimName;

    console.log('NEW INTERVENTION ', newIntervention);
    await newIntervention.save();
    res.json({ id: newIntervention.id });
    // res.status(200).send({ message: 'Intervention successfully added to database.' });
  }
});

export default router;
