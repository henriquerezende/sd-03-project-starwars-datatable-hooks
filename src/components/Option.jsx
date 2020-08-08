import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ name }) => (<option>{name}</option>);

Option.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Option;
