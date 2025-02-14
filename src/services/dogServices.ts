import {
  DOGS_ENDPOINT,
  DOGS_SEARCH_ENDPOINT,
  DOGS_BREEDS_ENDPOINT,
} from "./apiConfig";

import { Dog, FetchDogsParams } from "../types";

export const getDogBreeds = async () => {
  try {
    const response = await fetch(DOGS_BREEDS_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok)
      throw new Error(`Fetch dog breeds failed: ${response.statusText}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Fetch dog breeds failed: ", error);
    throw new Error("Unable to fetch dog breeds. Please try again");
  }
};

export const fetchDogs = async ({
  size = 25,
  from = 0,
  breeds = [],
  sort = "breed:asc",
}: FetchDogsParams): Promise<{ dogs: Dog[]; total: number }> => {
  console.log(breeds);

  const params = new URLSearchParams({
    size: size.toString(),
    from: from.toString(),
    sort,
  });

  if (breeds.length !== 0) {
    params.append("breeds", breeds.join(","));
  }

  const url = `${DOGS_SEARCH_ENDPOINT}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }

  const data: { resultIds: string[]; total: number } = await response.json();

  console.log(data);

  // Fetch full dog details using the IDs
  const dogDetailsResponse = await fetch(DOGS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.resultIds),
    credentials: "include",
  });

  if (!dogDetailsResponse.ok) {
    throw new Error("Failed to fetch dog details");
  }

  const dogs: Dog[] = await dogDetailsResponse.json();

  return { dogs, total: data.total };
};

export const getDogDetailsBasedOnId = async (ids: string[]) => {
  const dogDetailsResponse = await fetch(DOGS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
    credentials: "include",
  });

  if (!dogDetailsResponse.ok) {
    throw new Error("Failed to fetch dog details");
  }

  const dogs: Dog[] = await dogDetailsResponse.json();

  
  return dogs;
}
