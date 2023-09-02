import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: isVisible ? 'none' : '' };
  const VisibleWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={VisibleWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
