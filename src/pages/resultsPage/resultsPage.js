import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircleLoader } from 'react-spinners';

import styles from './resultsPage.module.scss';
import { indigo } from '../../styles/variables.scss';
import { getIssues, getPullRequests } from '../../actions';
import Icon from '../../components/icon.js';
import Issue from '../../components/issue/issue';
import icons from '../../assets/icons/icons';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';

class ResultsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFilter: 'all' };
  }

  componentDidMount() {
    const { owner, repo } = this.props.match.params;
    this.owner = owner;
    this.repo = repo;

    this.getIssues();
  }

  getIssues(state = 'all') {
    this.setState({ selectedFilter: state });
    this.props.getIssues(this.owner, this.repo, state);
  }

  getPullRequests(state = 'all') {
    this.setState({ selectedFilter: 'pullRequests' });
    this.props.getPullRequests(this.owner, this.repo, state);
  }

  updateFiltersState(state) {
    this.setState({ selectedFilter: state });
  }

  renderItems() {
    const { issues, pullRequests } = this.props;

    // If the requests are pending show the loading element
    if (issues.pending || pullRequests.pending) {
      return (
        <div className={styles.loading}>
          <CircleLoader sizeUnit={'px'} size={150} color={indigo} />
        </div>
      );
    }

    // Distinguish between the issues and the pulls
    const items =
      this.state.selectedFilter === 'pullRequests'
        ? this.props.pullRequests
        : this.props.issues;

    // Empty response
    if (!items.data.length) {
      return (
        <div className={styles['not-found-container']}>
          <span>No issues found</span>
        </div>
      );
    }

    const mappedItems = items.data.map(
      ({ id, title, body, labels, state, pull_request }) => (
        <Issue
          key={id}
          id={id}
          title={title}
          body={body}
          labels={labels}
          state={state}
          pull_request={pull_request}
        />
      )
    );

    return <div className={styles['issues-container']}>{mappedItems}</div>;
  }

  /**
   * It creates the list of filters for the filtering og the issues
   */
  renderFilters() {
    const filters = [
      { state: 'all', label: 'All Issues' },
      { state: 'open', label: 'Open Issues' },
      { state: 'closed', label: 'Closed Issues' },
    ];

    const filtersMapped = filters.map(({ state, label }, index) => {
      return (
        <Filter
          key={index}
          selected={state === this.state.selectedFilter}
          label={label}
          action={() => this.getIssues(state)}
        />
      );
    });

    // The fetching of the pulls is handled by a different API endpoint
    filtersMapped.push(
      <Filter
        selected={'pullRequest' === this.state.selectedFilter}
        label="Pull Requests"
        key={filters.length + 1}
        action={() => this.getPullRequests()}
      />
    );

    return filtersMapped;
  }

  /**
   * It falls back to the main page
   */
  redirectToHomePage() {
    this.props.history.push(`/`);
  }

  /**
   * I renders the entire page
   */
  render() {
    return (
      <div className={styles.container}>
        <Header
          owner={this.owner}
          repo={this.repo}
          onClick={() => this.redirectToHomePage()}
        />

        <div className={styles.subheader}>
          <Icon
            className={styles.icon}
            icon={icons.CLOSE}
            onClick={() => this.redirectToHomePage()}
          />
        </div>

        <div className={styles.content}>
          <div className={styles['filters-container']}>
            {this.renderFilters()}
          </div>

          {this.renderItems()}
        </div>
      </div>
    );
  }
}

/**
 * Map the state values to the props object
 *
 * @param {Object} issues data from reducer
 * @param {Object} pullRequest data from reducer
 */
const mapStateToProps = ({ issues, pullRequests }) => ({
  issues,
  pullRequests,
});

/**
 * Map the state values to the props object
 *
 * @param {Object} issues data from reducer
 * @param {Object} pullRequest data from reducer
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getIssues, getPullRequests }, dispatch);

/**
 * Connect the component to the store
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPageComponent);
