/**
 * Handle issues related events
 */
import {
  GET_ISSUES_SUCCESS,
  GET_ISSUES_PENDING,
  GET_ISSUES_ERROR,
} from '../actions';

export default function(
  state = { pending: false, data: [], error: null },
  action
) {
  switch (action.type) {
    case GET_ISSUES_PENDING: // Request started
      return { ...state, pending: true };

    case GET_ISSUES_SUCCESS: // Request succeeded
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

    case GET_ISSUES_ERROR: // Request errored
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
}
