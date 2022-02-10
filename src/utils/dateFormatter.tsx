import React from 'react';

import Moment from 'react-moment';

function dateFormatter({ date }: any): JSX.Element {
  return (
    <Moment format="MM월 DD일, YYYY년" withTitle>
      {date}
    </Moment>
  );
}

export default dateFormatter;
