import React from 'react';
import { Pager, Glyphicon } from 'react-bootstrap';

const PagerFwd = () => (
    <Pager>
      <Pager.Item next href="#"><Glyphicon glyph="glyphicon glyphicon-chevron-right" /></Pager.Item>
    </Pager>
);

export default PagerFwd;
