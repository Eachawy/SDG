import React from 'react';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router';


const ErrorPage = () => {

    return (
        <>
          <Translate contentKey="error.http.403">
                You are not authorized to access this page.
          </Translate>
          <br/>
          <Link to={'/dashoard'}>العوده الي لوحة التحكم</Link>
        </>
    )
}

export default ErrorPage;