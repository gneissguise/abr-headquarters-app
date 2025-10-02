import type { RawFish, ProcessedData } from '../types';

/**
 * @description Takes an array of raw fish data and transforms it into an object
 * grouped by region, with calculated average calories and fat.
 * @param {RawFish[]} fishData The raw data array from the API.
 * @returns {ProcessedData} The processed and grouped data.
 */
export const processFishData = (fishData: RawFish[]): ProcessedData => {
  if (!fishData || fishData.length === 0) {
    return {};
  }

  const initialAccumulator: {
    [region: string]: {
      totalCalories: number;
      totalFat: number;
      count: number;
      fish: RawFish[];
    };
  } = {};

  const regionalTotals = fishData.reduce((acc, fish) => {
    const region = fish.NOAAFisheriesRegion;
    if (!region) return acc;

    if (!acc[region]) {
      acc[region] = {
        totalCalories: 0,
        totalFat: 0,
        count: 0,
        fish: [],
      };
    }

    const calories = parseInt(fish.Calories, 10);
    const fat = parseFloat(fish.FatTotal);

    if (!isNaN(calories)) {
      acc[region].totalCalories += calories;
    }

    if (!isNaN(fat)) {
      acc[region].totalFat += fat;
    }

    if (!isNaN(calories) || !isNaN(fat)) {
      acc[region].count += 1;
    }
    
    acc[region].fish.push(fish);

    return acc;
  }, initialAccumulator);

  const result: ProcessedData = {};
  for (const region in regionalTotals) {
    const data = regionalTotals[region];
    result[region] = {
      averageCalories: data.totalCalories / data.count,
      averageFat: data.totalFat / data.count,
      fish: data.fish,
    };
  }

  return result;
};

/**
 * @description Fetches the raw fish data from the local API server.
 * @returns {Promise<RawFish[]>} A promise that resolves to the array of fish data.
 */
export const fetchFishData = async (): Promise<RawFish[]> => {
  const API_URL = 'http://localhost:5001/gofish?apikey=abrradiology';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch fish data:", error);
    return [];
  }
};