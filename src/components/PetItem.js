import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PetItem = ({ pet }) => {
  const history = useHistory();
  const {
    name, age, sex, missing, weight, color, image
  } = pet;
  const { user: currentUser } = useSelector((state) => state.auth);
  const handleClick = () => {
    history.push({
      pathname: `/pet/${name.toLowerCase().replace(/ /g, '-')}`,
      state: { pet },
    });
  };

  return (
    <div
      className="col-sm-6 col-md-4"
      role="presentation"
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <div>
        
        <button
          className="view btn-primary mb-2"
          onClick={handleClick}
          data-testid="action-button"
          type="button"
          disabled="true"
        >
          View pet
        </button>
        <img src={image} alt="pet" />
      </div>
      <>
         {missing && <p>Missing</p> }
        <h4>Name: {name.toUpperCase()}</h4>
        <h4>
         Age: {age}
        </h4>
        <h4>
         Sex: {sex}
        </h4>
        <h4>
          Color: {color}
        </h4>

        <h4>
          Weight: {weight}
        </h4>
      </>
    </div>
  );
};
PetItem.propTypes = {
  pet: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PetItem;