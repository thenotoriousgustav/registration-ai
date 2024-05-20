import { cookies } from "next/headers";
import { getSession } from "./session";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type FetchOptions = {
  method: HttpMethod;
  endpoint: string;
  data?: any;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchFromApi<T>({
  method,
  endpoint,
  data,
}: FetchOptions): Promise<T | null> {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    console.log(accessToken);

    if (!accessToken) {
      console.error("No access token found");
      return null;
    }

    const res = await fetch(BASE_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: method !== "GET" ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${method} ${endpoint}:`, res.statusText);
      return null;
    }

    if (res.status === 204) return null; // No content response for DELETE

    const result = await res.json();
    return result?.data;
  } catch (error) {
    console.error(`Error fetching ${method} ${endpoint}:`, error);
    return null;
  }
}

export async function GET<T>(endpoint: string): Promise<T | null> {
  return fetchFromApi<T>({ method: "GET", endpoint });
}

export async function POST<T>(endpoint: string, data: any): Promise<T | null> {
  return fetchFromApi<T>({ method: "POST", endpoint, data });
}

export async function PUT<T>(endpoint: string, data: any): Promise<T | null> {
  return fetchFromApi<T>({ method: "PUT", endpoint, data });
}

export async function DEL<T>(endpoint: string): Promise<T | null> {
  return fetchFromApi<T>({ method: "DELETE", endpoint });
}
