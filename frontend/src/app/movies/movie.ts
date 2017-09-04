export interface IMovie {
  id: string;
  title: string;
  year: string;
  description: string;
  picture: string;
  rating: number;
  genres?: string[];
}
