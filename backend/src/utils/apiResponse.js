export const sendResponse = (
  res,
  code,
  message,
  success = false,
  data = null
) => {
  const response = {
    message,
    success,
  };

  if (data) {
    response.data = data;
  }

  return res.status(code).json(response);
};
