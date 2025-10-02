import { describe, it, expect } from 'vitest';
import { processFishData } from './fishData'; 

/**
 * @description
 * Mock data representing the raw format from the API.
 * Note that 'Calories' can be a string, and 'Fat, Total' includes " g".
 * Our processing function will need to handle this.
 */
const mockFishData = [
  {
    "SpeciesName": "Chinook Salmon",
    "Calories": "200",
    "FatTotal": "13 g",
    "NOAAFisheriesRegion": "Alaska",
  },
  {
    "SpeciesName": "Sockeye Salmon",
    "Calories": "150",
    "FatTotal": "8 g",
    "NOAAFisheriesRegion": "Alaska",
  },
  {
    "SpeciesName": "Mahi-mahi",
    "Calories": "85",
    "FatTotal": "1 g",
    "NOAAFisheriesRegion": "Pacific Islands",
  },
  {
    "SpeciesName": "Opah",
    "Calories": "115",
    "FatTotal": "4 g",
    "NOAAFisheriesRegion": "Pacific Islands",
  },
];

describe('processFishData', () => {
  it('should group fish by region and correctly calculate average calories and fat', () => {
    const processedData = processFishData(mockFishData);

    // --- Assertions for Alaska ---
    // Average Calories: (200 + 150) / 2 = 175
    // Average Fat: (13 + 8) / 2 = 10.5
    expect(processedData.Alaska).toBeDefined();
    expect(processedData.Alaska.averageCalories).toBe(175);
    expect(processedData.Alaska.averageFat).toBe(10.5);
    expect(processedData.Alaska.fish.length).toBe(2);
    expect(processedData.Alaska.fish[0].SpeciesName).toBe('Chinook Salmon');

    // --- Assertions for Pacific Islands ---
    // Average Calories: (85 + 115) / 2 = 100
    // Average Fat: (1 + 4) / 2 = 2.5
    expect(processedData['Pacific Islands']).toBeDefined();
    expect(processedData['Pacific Islands'].averageCalories).toBe(100);
    expect(processedData['Pacific Islands'].averageFat).toBe(2.5);
    expect(processedData['Pacific Islands'].fish.length).toBe(2);
    expect(processedData['Pacific Islands'].fish[0].SpeciesName).toBe('Mahi-mahi');
  });

  it('should return an empty object if the input array is empty', () => {
    const processedData = processFishData([]);
    expect(processedData).toEqual({});
  });
});