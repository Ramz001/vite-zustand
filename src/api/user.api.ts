import {
  type GET_FILTERS,
  type GET_USERS_RESPONSE,
} from "../types/global.type";

export const getUsers = async ({
  filters,
}: {
  filters?: GET_FILTERS;
}): Promise<GET_USERS_RESPONSE | undefined> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.skip !== undefined) {
      queryParams.append("skip", filters.skip.toString());
    }
    if (filters?.limit !== undefined) {
      queryParams.append("limit", filters.limit.toString());
    }
    if (filters?.sortBy !== undefined) {
      queryParams.append("sortBy", filters.sortBy);
    }
    if (filters?.order !== undefined) {
      queryParams.append("order", filters.order);
    }

    const res = await fetch(
      `https://dummyjson.com/users?${queryParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
