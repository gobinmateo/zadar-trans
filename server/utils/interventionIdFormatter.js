const formatId = (id) => {
  return ('000000000000000' + id).substr(-process.env.INTERVENTION_ID_MAX_DIGITS);
};

export default formatId;
