import { REGISTER_PETS } from './types';

export const registerPets = (pets) => ({
  type: REGISTER_PETS,
  payload: pets,
});
