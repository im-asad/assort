import getAxiosInstance from '../singletons/axios';
import {_retrieveData} from '../utils/asyncStorage';

const base_url = 'https://instaconnect.ngrok.io';
export const fetchBins = async () => {
  const axios = await getAxiosInstance();
  console.log("Ehllo")
  let settings = await _retrieveData('bins_settings');
  if (settings) {
    settings = JSON.parse(settings);
  }
  const url =
    base_url +
    `/api/bins?areaId=${settings ? settings.areaSelected : '1'}&fillLevel=${
      settings ? settings.fillPercentage : '60'
    }`;
  const response = await axios.get(url);
  console.log('Res', response);
  return response.data;
};

export const fetchAreas = async () => {
  const url = base_url + '/api/areas';
  const axios = await getAxiosInstance();
  const response = await axios.get(url);
  console.log("areas")
  return response.data;
};
