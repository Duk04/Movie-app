import { axiosInstance } from "@/lib/axios-instance";

export const fetchMovieData = async (endpoint: string) => {
  const { data } = await axiosInstance(endpoint);
  return data;
};
