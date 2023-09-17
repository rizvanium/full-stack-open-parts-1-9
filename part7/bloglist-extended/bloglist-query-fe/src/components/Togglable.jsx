import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

const Togglable = (props) => {
  const [isVisible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: isVisible ? 'none' : '' };
  const VisibleWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={VisibleWhenVisible}>
        {React.cloneElement(props.children, { toggleVisibility })}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
