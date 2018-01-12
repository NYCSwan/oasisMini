// import React from 'react';
// import LoadingIcon from './loading.react';
//
// const Callback = () => (
//   // After authentication, loading while app sets up client session, redirects to /
//
//       <div className='callback'>
//         {LoadingIcon}
//       </div>
// )
//
//
// export default Callback;

import React from 'react';
import loading from './loading.svg';

const Callback = () => (

      <div>
        <img src={loading} alt="loading"/>
      </div>
    );

export default Callback;
