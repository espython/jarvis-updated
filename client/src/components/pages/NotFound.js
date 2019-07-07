import React from 'react';

import NotFoundLogo from '../../static/sad-404-icon.svg';

export default function NotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center pt-5 px-5 not-found">
        <div className="card text-center" style={{ width: '18rem' }}>
          <img
            className="card-img-top mx-auto not-found-logo"
            src={NotFoundLogo}
            alt="not found page"
          />
          <div className="card-body">
            <p className="card-text">404 Error Page not Found</p>
          </div>
        </div>
      </div>
    </div>
  );
}
