import apiClient from "./api";
import { FoodDetails } from '../../types/food'
import axios from 'axios';

export const getAllFoods = async (): Promise<FoodDetails[]> => {
    const PATH = '/all-foods'
    try {
      const response = await apiClient.get(PATH); 
      return response.data; 
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const detail = err.response?.data?.detail;
      throw new Error(detail || err.message || 'Failed to fetch foods');
    }

    throw new Error('Failed to fetch foods');
    }
}

export const getFoodById = async (foodId: string): Promise<FoodDetails> => {
    const PATH = `/food/${foodId}`;
    try {
      console.log('[foods.getFoodById] GET', PATH);
      const response = await apiClient.get(PATH);
      console.log('[foods.getFoodById] status:', response.status);
      console.log('[foods.getFoodById] data:', response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('[foods.getFoodById] axios error:', {
          message: err.message,
          status: err.response?.status,
          detail: err.response?.data,
        });
        const detail = err.response?.data?.detail;
        throw new Error(detail || err.message || 'Failed to fetch food details');
      }

      throw new Error('Failed to fetch food details');
    }
}