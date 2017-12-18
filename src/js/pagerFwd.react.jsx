import React from 'react';
import { Pager, Glyphicon } from 'react-bootstrap';

const PagerFwd = () => (
    <Pager>
      <Glyphicon glyph="glyphicon glyphicon-chevron-right" />
      <Pager.Item next href="#" />
    </Pager>
);

export default PagerFwd;
