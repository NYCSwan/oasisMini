import React from 'react';
import { ResponsiveEmbed } from 'react-bootstrap';

const Timelapse = () => (
  <div style={{ width: 660, height: 'auto' }}>
    <h3>Timelapse Video</h3>
    <ResponsiveEmbed a16by9>
      <video autoPlay loop>
        <source src="/public/img/timelapse.mov" type="video/mov"/>
        Your browser does not support this video.
      </video>
    </ResponsiveEmbed>
  </div>

)

export default Timelapse;
