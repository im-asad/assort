import getAxiosInstance from '../singletons/axios';
import {_retrieveData} from '../utils/asyncStorage';

const base_url = 'http://51aa02459040.ngrok.io';
export const fetchBins = async () => {
  let settings = await _retrieveData('bins_settings');
  settings = JSON.parse(settings);
  const axios = await getAxiosInstance();
  const url =
    base_url +
    `/api/bins?areaId=${settings.areaSelected}&fillLevel=${
      settings.percentage
    }`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchAreas = async () => {
  const url = base_url + '/api/areas';
  const axios = await getAxiosInstance();
  const response = await axios.get(url);
  console.log(response);
  return response.data;
};
