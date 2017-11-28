import React from 'react';
import { Pager } from 'react-bootstrap';

const PagerBack = () => (
  <div className='backImage'>
    <img src="../public/img/white_back_button.png" alt="back" />
    <Pager>
      <Pager.Item previous href="#" />
    </Pager>
  </div>
);

export default PagerBack;
