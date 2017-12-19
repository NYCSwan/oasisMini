import React from 'react';
import { Pager, Glyphicon } from 'react-bootstrap';

const PagerBack = () => (
    <Pager>
      <Pager.Item previous href="#"><Glyphicon glyph="glyphicon glyphicon-chevron-left" /></Pager.Item>
    </Pager>
);

export default PagerBack;
