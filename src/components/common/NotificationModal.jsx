import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function NotificationModal({ data, show }) {

  return (
    <>
      {data?.message &&
        <Alert key={data?.type} variant={data?.type} show={show}>
          {data?.message}
        </Alert>
      }
    </>
  );
}

export default NotificationModal;
