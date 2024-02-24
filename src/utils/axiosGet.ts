import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ErrorHandler } from './errorHandler';
/**
 * Performs a GET request using Axios.
 * 
 * @param {string} url - The URL for the GET request.
 * @param {AxiosRequestConfig} [config] - Optional Axios configuration.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<AxiosResponse>} The response from the request.
 * 
 */
export const axiosGet = async <T = any>(url: string, apiKey: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
      if (!config) {
          config = {};
      }
      
      config.headers = {
          ...config.headers, 
          'apikey': apiKey   
      };

      const response = await axios.get<T>(url, config);
      return response;
  } catch (error) {
      console.error('Error performing GET request:', error);
      throw new ErrorHandler('Error performing GET request', 'GENERAL'); 
  }
}