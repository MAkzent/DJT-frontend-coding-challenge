import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import Icon from '../icon.js';
import icons from '../../assets/icons/icons';
import styles from './issue.module.scss';

function renderLabels(labels) {
  if (!labels || !labels.length) {
    return null;
  }

  const listOfLabels = labels.map(({ name, id }) => (
    <div key={id} className={styles.label}>
      • {name}
    </div>
  ));
  return <div className={styles['labels-container']}>{listOfLabels}</div>;
}

function renderDescription(description) {
  return description && description.length ? (
    <LinesEllipsis
      text={description}
      maxLine="3"
      ellipsis="..."
      trimRight
      basedOn="letters"
      component="p"
    />
  ) : (
    <span className={styles['description-not-found']}>
      No description provided
    </span>
  );
}

function renderTypeIcon(state, pullRequest) {
  if ((!state || state !== 'closed') && !pullRequest) {
    return null;
  }
  let icon;

  if (state === 'closed') {
    icon = icons.ISSUE_CLOSED;
  } else if (pullRequest) {
    icon = icons.PULL_REQUEST;
  }

  return (
    <div className={styles.subheader}>
      <Icon className={styles.icon} icon={icon} />
    </div>
  );
}

const Issue = ({
  id,
  title,
  body: description,
  labels,
  state,
  pull_request: pullRequest,
}) => (
  <div className={styles.issue} key={id}>
    <div className={styles.header}>
      {renderTypeIcon(state, pullRequest)}
      <h3 className={styles.title}>{title}</h3>
    </div>
    <div className={styles.content}>
      <div className={styles['not-provided']}>
        {renderDescription(description)}
      </div>

      {renderLabels(labels)}
    </div>
  </div>
);

export default Issue;
