import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
    const ourMediaQuery = useMediaQuery('(min-width:320px)');
    return (
      <div style={{ display: 'block'}}>
        <h4>How to use useMediaQuery Component in ReactJS?</h4>
        <span>{`Is Screen at Minimum 400px: ${ourMediaQuery}`}</span>
      </div>
    );
}