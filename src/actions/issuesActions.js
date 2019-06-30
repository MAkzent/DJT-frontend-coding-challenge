import axios from 'axios';

const ROOT_URL = 'https://api.github.com/';

// Issues
export const GET_ISSUES = 'get_issues';
export const GET_ISSUES_PENDING = 'get_issues_pending';
export const GET_ISSUES_SUCCESS = 'get_issues_success';
export const GET_ISSUES_ERROR = 'get_issues_error';

export function getIssues(owner, repo, state = 'all') {
  return async dispatch => {
    dispatch(getIssuesPending());

    try {
      const payload = await axios.get(
        `${ROOT_URL}repos/${owner}/${repo}/issues`,
        {
          params: { state },
        }
      );

      if (!payload) {
        throw Error('Something went wrong');
      }

      dispatch(getIssuesSuccess(payload));
      return payload;
    } catch (error) {
      dispatch(getIssuesError(error));
    }
  };
}
export function getIssuesPending() {
  return {
    type: GET_ISSUES_PENDING,
  };
}
export function getIssuesSuccess(issues) {
  return {
    type: GET_ISSUES_SUCCESS,
    payload: issues,
  };
}
export function getIssuesError(error) {
  return {
    type: GET_ISSUES_ERROR,
    error,
  };
}
