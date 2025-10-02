/**
 * @description Represents the structure of a single fish item, including its name, image gallery, and other details.
 */
export type Fish = {
  'Species Name': string;
  ImageGallery: { src: string; alt: string }[];
  Biology: string;
  Location: string;
  [key: string]: any; // Allow for other properties
};

/**
 * @description Represents the raw fish data received from the API.
 */
export type RawFish = {
  'Species Name': string;
  Calories: string;
  'Fat, Total': string;
  NOAAFisheriesRegion: string;
  [key: string]: any; // Allow for other properties
};

/**
 * @description Represents the processed data for a single region.
 */
export type ProcessedRegion = {
  averageCalories: number;
  averageFat: number;
  fish: RawFish[];
};

/**
 * @description Represents the final processed data, mapping region names to their data.
 */
export type ProcessedData = {
  [region: string]: ProcessedRegion;
};