import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PetItem = ({ pet }) => {
  const history = useHistory();
  const {
    name, age, sex, missing, weight, color, image
  } = pet;
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
        <img src={image} alt="pet" />
      </div>
      <>
         {missing && <p>***Missing Pet***</p> }
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
      <button
          className="view btn-primary mb-2 mt-2"
          onClick={handleClick}
          data-testid="action-button"
          type="button"
        >
          View more..
        </button>
    </div>
  );
};
PetItem.propTypes = {
  pet: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PetItem;