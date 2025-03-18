export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string; error?: string }>;

export type LandmarkCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  provinces: string;
  price: number;
  lat: number;
  lng: number;
};
