import React from 'react'
import { Spinner } from 'reactstrap'

import '../../bootstrap-scope.scss';

const Loader = () => {
  return (
      <div className="bootstrap-inside">
        <Spinner
            animation='border'
            role='status'
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                color: '#fbdb6f'
            }}
        >
        </Spinner>
      </div>
  )
}

export default Loader