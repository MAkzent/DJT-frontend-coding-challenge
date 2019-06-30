/**
 * Handle pulls related events
 */
import {
  GET_PULL_REQUESTS_SUCCESS,
  GET_PULL_REQUESTS_PENDING,
  GET_PULL_REQUESTS_ERROR,
} from '../actions';

export default function(
  state = { pending: false, data: [], error: null },
  action
) {
  switch (action.type) {
    case GET_PULL_REQUESTS_PENDING: // Request started
      return { ...state, pending: true };

    case GET_PULL_REQUESTS_SUCCESS: // Request succeeded
      return {
        ...state,
        pending: false,
        data: action.payload.data.map(
          ({ title, body, labels, id, pull_request, state }) => ({
            title,
            body,
            labels,
            id,
            pull_request,
            state,
          })
        ),
      };

    case GET_PULL_REQUESTS_ERROR: // Request errored
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
}
