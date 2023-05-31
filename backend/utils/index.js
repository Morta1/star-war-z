export const extractIdFromUrl = (url) => {
  const id = url?.split('/')?.at(-2);
  return isNaN(id) ? null : id
}

export const responseObject = (data, message) => {
  return {
    message,
    data
  }
}

export const errorObject = (status) => {
  const errors = {
    500: { message: 'Internal Server Error', status: 500 },
    405: { message: 'Method Not Allowed', status: 405 },
    400: { message: 'Bad Request', status: 400 },
    404: { message: '404 Not Found', status: 404 },

  }
  return errors[status] || errors[500];
}