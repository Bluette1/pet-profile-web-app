import { REGISTER_OWN_PETS } from './types';

export const registerOwnPets = (pets) => ({
  type: REGISTER_OWN_PETS,
  payload: pets,
});
