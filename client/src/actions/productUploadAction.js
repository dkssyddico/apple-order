export function uploadProductIMGThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
      console.log(data);
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

export function uploadProductThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
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
