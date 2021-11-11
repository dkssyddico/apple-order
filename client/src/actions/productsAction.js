export function getProductsThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return () => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request();
      dispatch({
        type: SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}
