import React from 'react';
import { Pager, Glyphicon } from 'react-bootstrap';

const PagerBack = () => (
    <Pager >
      <Glyphicon glyph="glyphicon glyphicon-chevron-left" />
      <Pager.Item previous href="#" />
    </Pager>
);

export default PagerBack;
