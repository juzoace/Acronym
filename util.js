// exports.extractErrorsMessages = (val) => {
//     let message = {};
//     for (const error of val.error.details) {
//       message[error.path[0]] = error.message;
//     }
//     return message;
//   }
  
  exports.successMessage = (title) => {
    return { success: true, message: title };
  }
  
  exports.successData = (data) => {
    return { success: true, payload: data };
  }
  
  exports.updateData = (payload = {}) => {
    payload.status = "updated";
    return { success: true, payload };
  }
  
  exports.errorMessage = (title) =>  {
    return { success: false, message: title };
  }
  
  exports.errorData = (data) => {
    return { success: false, data };
  }

//   exports.handleInbuiltError = (err) => {
//     const [ValidationErrorItem] = err.errors;
//     const { message } = ValidationErrorItem;
//     return message;
//   }