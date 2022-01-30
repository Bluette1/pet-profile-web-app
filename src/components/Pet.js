import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PetService from "../services/pet.service";

const Pet = () => {
  const location = useLocation();
  const history = useHistory();
  const [errDisplay, setErrDisplay] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const own_pets = useSelector((state) => state.own_pet);

  const { pet } = location.state;
  const {
    _id,
    name,
    age,
    sex,
    missing,
    weight,
    color,
    image,
    available_for_adoption: availableForAdoption,
  } = pet;

  const owner = () => {
    const owned = own_pets.filter((petId) => petId === _id);
    if (owned.length > 0) {
      return true;
    }
    return false;
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    history.push({ pathname: "/edit/", state: { pet } });
  };

  const handleMissing = (e) => {
    e.preventDefault();

    PetService.reportMissing(_id)
      .then((response) => {
        // dispatch(updatePet(response.data));
        alert(`${name} has been reported missing`);
      })
      .catch((error) => {
        const errorContent =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setErrDisplay(JSON.stringify(errorContent));
      });
  };

  const handleMissingInfo = (e) => {
    e.preventDefault();

    alert(`${name} has been notified. You will be contacted shortly`);
  };

  if (errDisplay !== "") {
    console.log(errDisplay);
    return null;
  }

  return (
    <div className="my-5 row d-md-flex" data-testid="pet-container">
      <div className="col-lg-7">
        <img className="col-12" src={image} alt="pet" />
      </div>
      <div className="col-lg-5">
        <div>
          <h6 className="text-secondary">{name.toUpperCase()}</h6>
          <h6>Sex: {sex}</h6>
          <h6>Age: {age} years</h6>
          <h6>Weight: {weight} kg</h6>
          <h6>Color: {color}</h6>
          {currentUser && owner() && (
            <div>
              <button
                className="btn-primary mb-2"
                onClick={handleUpdate}
                data-testid="action-button"
                type="button"
              >
                Update pet datails
              </button>

              {!missing && (
                <button
                  className="d-block btn-primary mb-2"
                  onClick={handleMissing}
                  data-testid="action-button"
                  type="button"
                >
                  Report missing
                </button>
              )}
            </div>
          )}
          {currentUser && !owner() && (
            <div>
              {availableForAdoption && (
                <button
                  className="btn-primary mb-2"
                  onClick={handleUpdate}
                  data-testid="action-button"
                  type="button"
                >
                  Adopt {name}
                </button>
              )}
            </div>
          )}
        </div>
        {missing && !owner() && (
          <button
            className="d-block btn-primary mb-2"
            onClick={handleMissingInfo}
            data-testid="action-button"
            type="button"
          >
            {name} is a missing pet. Please click here to notify owner if you
            know anything about her whereabouts.
          </button>
        )}

        {missing && owner() && (
          <button
            className="d-block btn-primary mb-2"
            onClick={handleMissing}
            data-testid="action-button"
            type="button"
          >
            {name} was reported missing. Please click here to update her status
            if she's no longer missing.
          </button>
        )}
        <button
          className="btn-primary mb-2"
          onClick={handleClick}
          data-testid="action-button"
          type="button"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Pet;
