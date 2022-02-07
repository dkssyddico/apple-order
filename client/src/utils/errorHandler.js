class ErrorHandler {
  alertError(error) {
    console.log(error.response);
    alert(
      error.response.data.message
        ? error.response.data.message
        : error.response.data.error.name
    );
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
