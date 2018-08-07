// updates attributes of given model instance by iterating over parameters represented by the first argument
const updateAttributesFromParams = (params, model) => {
  Object.keys(params).forEach((key) => {
    if(!Array.isArray(params[key])) model[key] = params[key];
  });
};

export default updateAttributesFromParams;
