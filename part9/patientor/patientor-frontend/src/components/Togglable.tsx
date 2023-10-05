import { Button } from '@mui/material';
import { useState, forwardRef, useImperativeHandle } from 'react';

interface Props {
  children: React.ReactNode;
  buttonLabel: string;
}

const Togglable = forwardRef((props: Props, ref) => {
  const [isVisible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: isVisible ? 'none' : '' };
  const VisibleWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <Button sx={{ marginTop: 3 }} variant="contained"onClick={toggleVisibility} color='primary'>{props.buttonLabel}</Button>
      </div>
      <div style={VisibleWhenVisible}>
        {props.children}
      </div>
    </div>
  );
});

export default Togglable;