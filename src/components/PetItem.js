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
      className="row my-5"
      role="presentation"
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <div className='col-lg-7'>
        <img className='col-12' src={image} alt="pet" />
      </div>
      <div className='col-lg-5 font-weight-bolder'>
         {missing && <p>***Missing Pet***</p> }
        <h6>Name: {name.toUpperCase()}</h6>
        <h6>
         Age: {age} years
        </h6>
        <h6>
         Sex: {sex}
        </h6>
        <h6>
          Color: {color}
        </h6>

        <h6>
          Weight: {weight} kg
        </h6>
        <button
          className="view btn-primary mb-2 mt-2"
          onClick={handleClick}
          data-testid="action-button"
          type="button"
        >
          View more...
        </button>
      </div>
    </div>
  );
};
PetItem.propTypes = {
  pet: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PetItem;