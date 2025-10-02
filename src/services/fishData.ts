// Define a type for the raw fish data we receive from the API
type RawFish = {
  "SpeciesName": string;
  "Calories": string;
  "FatTotal": string;
  "NOAAFisheriesRegion": string;
  [key: string]: any; // Allow the other properties
};

// Define the structure for our processed data for a single region
type ProcessedRegion = {
  averageCalories: number;
  averageFat: number;
  fish: RawFish[];
};

// Define the final output structure, mapping region names to their data
type ProcessedData = {
  [region: string]: ProcessedRegion;
};

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

  // Use a temporary structure to hold sums and counts during reduction
  const initialAccumulator: {
    [region: string]: {
      totalCalories: number;
      totalFat: number;
      count: number;
      fish: RawFish[];
    };
  } = {};

  // 1. Group fish and calculate totals
  const regionalTotals = fishData.reduce((acc, fish) => {
    const region = fish.NOAAFisheriesRegion;
    if (!region) return acc; // Skip fish with no region

    // Initialize the region in our accumulator if it's the first time we see it
    if (!acc[region]) {
      acc[region] = {
        totalCalories: 0,
        totalFat: 0,
        count: 0,
        fish: [],
      };
    }

    console.log("Fish: ", fish);

    // Parse values, cleaning up strings like "13 g"
    const calories = parseInt(fish.Calories, 10);
    console.log("Fish Calories", fish.Calories, calories)
    const fat = parseFloat(fish.FatTotal); // parseFloat handles "8 g" -> 8
    console.log("Fish Fat", fish.FatTotal, fat);


    // Update totals and add the fish to the list
    if (!isNaN(calories) || !isNaN(fat)) {
      acc[region].totalCalories += calories;
      acc[region].totalFat += fat;
      acc[region].count += 1;
    }
    
    acc[region].fish.push(fish);

    return acc;
  }, initialAccumulator);

  // 2. Calculate averages from the totals
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
  // Requires https://github.com/theabr-org/coding-challenge-server to be running on localhost.
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