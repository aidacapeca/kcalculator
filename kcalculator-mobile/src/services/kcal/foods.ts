import apiClient from "./api";
import { FoodDetails } from '../../types/food'

export const getAllFoods = async (): Promise<FoodDetails[]> => {
    const PATH = '/all-foods'
    try {
      const response = await apiClient.get(PATH); 
      return response.data; 
    } catch (err) {
        // Logger required
        return [];
    }
}