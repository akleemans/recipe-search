export interface Instruction {
  name: string;
  text: string;
}

export interface Recipe {
  id: string;
  name: string;
  url: string;
  image: string;
  ingredients: string[];
  instructions: Instruction[];
  source: string;
  source_id: string;
  prep_time: string;
  total_time: string;
  keywords: string;
  score: number;
  thumbnail: string;
}
