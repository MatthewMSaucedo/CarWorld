exports.handler =  async (event) => {
  const payload = {
    code: 200,
    message: 'validatorLambda works'
  };
  return JSON.stringify(payload);
};
