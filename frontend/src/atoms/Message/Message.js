import React from 'react'
import { Alert } from 'reactstrap'

import '../../bootstrap-scope.scss';

const Message = ({ variant, children }) => {
  return (
    <div className="bootstrap-inside">
        <Alert variant={variant}>{children}</Alert>
    </div>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
