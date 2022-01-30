import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import Pet from "./PetItem";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const own_pets = useSelector((state) => state.own_pet);
  const pets = useSelector((state) => state.pet);

  const owned = pets.filter((pet) => own_pets.includes(pet._id));

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container" data-testid="profile-container">
      <header className="jumbotron">
      <h3>Hi {currentUser.username}!</h3>
        <h3>Your Pets</h3>
      </header>
      <div className="">
        {owned && owned.length > 0 ? (
          <div className="row d-flex">
            {" "}
            {owned.map((pet) => (
              <Pet key={`pet-${uuid()}`} pet={pet} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
