import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, className, onClick = () => {} }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 48 48"
    onClick={() => onClick()}
  >
    <path d={icon} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
