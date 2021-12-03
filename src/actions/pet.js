import { REGISTER_PETS } from './types';

const registerPets = (pets) => ({
  type: REGISTER_PETS,
  payload: pets,
});

export default registerPets;