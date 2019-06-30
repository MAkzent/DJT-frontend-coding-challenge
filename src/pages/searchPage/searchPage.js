import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APP_NAME } from '../../constants';
import styles from './searchPage.module.scss';
import Searchbar from '../../components/searchbar/searchbar';

class SearchPageComponent extends Component {
  onEnterKeyDown(event) {
    if (event.key === 'Enter') {
      const [owner, repo] = event.target.value
        .trim()
        .replace('https://github.com/', '')
        .split('/');

      if (!owner || !repo) {
        toast.warning(
          'Invalid GitHub Repo. Please insert a valid repo URL or a repo in the form repoOwner/repoName'
        );
        return;
      }

      this.props.history.push(`/results/${owner}/${repo}`);
    }
  }

  render() {
    return (
      <section className={styles.container}>
        <h1 className={styles.title}>{APP_NAME}</h1>

        <Searchbar onKeyDown={event => this.onEnterKeyDown(event)} />
        <ToastContainer />
      </section>
    );
  }
}

export default connect(
  null,
  null
)(SearchPageComponent);
