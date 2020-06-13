import {_retrieveData} from '../utils/asyncStorage';

import axios from 'axios';

const getInstance = async () => {
  const token = await _retrieveData('token');
  return axios.create({
    headers: {Authorization: `Bearer ${token}`},
  });
};
module.exports = getInstance;
