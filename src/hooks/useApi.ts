import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import global from '../../config/Global.json';

const useApi = () => {
  const getAPI = (API_NAME: string, params: Record<string, any> = {}) => {
    let url = global.api.host + global.api[API_NAME as keyof typeof global.api];
    Object.keys(params).forEach(key => {
      url = url.replace(`{${key}}`, params[key]);
    });
    return url;
  };

  const getHost = () => global.api.host;

  const { authToken } = useContext(AuthContext);
  let token = authToken?.access;

  const Post = async (api: string, payload: any, params: Record<string, any> = {}) => {
    let _api = (getAPI(api, params).includes('undefined')) ? api : getAPI(api, params);
    try {
      const response = await axios.post(_api, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Put = async (api: string, id: string | number, payload: any) => {
    let _api = (getAPI(api).includes('undefined')) ? api : getAPI(api);
    try {
      const response = await axios.put(`${_api}${id}/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Patch = async (api: string, id: string | number, payload: any, params: Record<string, any> = {}) => {
    let _api = (getAPI(api, params).includes('undefined')) ? api : getAPI(api, params);
    if (id && !_api.includes('{id}')) {
      _api = `${_api}${id}/`;
    }
    try {
      const response = await axios.patch(_api, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Get = async (api: string, params: Record<string, any> = {}) => {
    let _api = (getAPI(api, params).includes('undefined') || api.includes('?')) ? api : getAPI(api, params);
    try {
      const response = await axios.get(_api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const Delete = async (api: string, id: string | number) => {
    let _api = (getAPI(api).includes('undefined')) ? api : getAPI(api);
    try {
      const response = await axios.delete(`${_api}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { Post, Put, Patch, Get, Delete, getAPI, getHost };
};

export default useApi;
