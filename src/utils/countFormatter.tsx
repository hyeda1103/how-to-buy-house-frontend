import React from 'react';

function CountFormatter({ count }: any) {
  const Count = (() => {
    if (count.toString().length <= 3) {
      return '0'.repeat(3 - count.toString().length) + count.toString();
    }
    return count;
  })();
  return (
    <p>
      {Count}
    </p>
  );
}

export default CountFormatter;
