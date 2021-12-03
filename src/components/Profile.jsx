import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container" data-testid="profile-container">
      <header className="jumbotron">
        <h3>
          {currentUser.username && <strong>{currentUser.email}</strong>}
          {currentUser.email && <strong>{currentUser.name}</strong>}
          &nbsp;
          Profile
        </h3>
      </header>
        <p>
          {' '}
          <strong>Token:</strong>
          {currentUser.accessToken.substring(0, 20)}
          ...
          {' '}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>  
    </div>
  );
};

export default Profile;