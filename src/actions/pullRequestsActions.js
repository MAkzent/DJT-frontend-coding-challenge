import axios from 'axios';

const ROOT_URL = 'https://api.github.com/';

// Pull requests
export const GET_PULL_REQUESTS = 'get_pull_requests';
export const GET_PULL_REQUESTS_PENDING = 'get_pull_requests_pending';
export const GET_PULL_REQUESTS_SUCCESS = 'get_pull_requests_success';
export const GET_PULL_REQUESTS_ERROR = 'get_pull_requests_error';

export function getPullRequests(owner, repo, state = 'all') {
  return async dispatch => {
    dispatch(getPullRequestsPending());

    try {
      const payload = await axios.get(
        `${ROOT_URL}repos/${owner}/${repo}/pulls`,
        {
          params: { state },
        }
      );

      if (!payload) {
        throw Error('Something went wrong');
      }

      dispatch(getPullRequestsSuccess(payload));
      return payload;
    } catch (error) {
      dispatch(getPullRequestsError(error));
    }
  };
}
export function getPullRequestsPending() {
  return {
    type: GET_PULL_REQUESTS_PENDING,
  };
}
export function getPullRequestsSuccess(pullRequests) {
  return {
    type: GET_PULL_REQUESTS_SUCCESS,
    payload: pullRequests,
  };
}
export function getPullRequestsError(error) {
  return {
    type: GET_PULL_REQUESTS_ERROR,
    error,
  };
}
