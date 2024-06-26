
import axios, { AxiosError } from "axios";

const urlBackEndBase = process.env.API_ROUTE || "http://localhost:3503"
const frontEndUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
const urlApi = !process.env.API_ROUTE ? "http://localhost:3503/api/" : process.env.API_ROUTE + "/api/"
console.log(urlApi);
console.log(process.env.API_ROUT);

export default function fetcherFetch() {
  // const baseUrl = process.env.API_ROUTE;
  // console.log(baseUrl)
  let fullUrl: string;
  return {
    get: async (url: string) => {
      try {
        fullUrl = `${urlApi}${url}`;
        console.log(fullUrl);
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()
        console.log(data);
        if (!data)
          throw new Error(
            `No response from 'get' using fetcherApi on route '${fullUrl}'`
          );
        return data;
      } catch (e: unknown) {
        console.error("Error:", e);
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw new Error(
            "An unexpected error has occurred while fetching on fetcher.ts, please review the logs in that file"
          );
        }
      }
    },
    post: async (url: string, data: unknown) => {
      try {
        fullUrl = `${urlApi}${url}`;
        console.log(fullUrl);
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        console.log(response)
        if(!response) throw new Error("No data from response")
        console.log(response);
        const dataa = await response.json()
        console.log(dataa)
        // if(!response) {
        //     console.log('response:', response)
        //     throw new Error(`${response.data}`)}
        //     // throw new Error(`No response from 'post' using fetcherApi on route '${fullUrl}'`)}
        return dataa;
      } catch (e: unknown) {
        console.error("Error:", e);
        if (e instanceof Error) {
        //   console.log("e.toJSON() :", e.toJSON());
        //   console.log("e.data: ", e?.data);
        //   console.log("e.response: ", e?.response);
        //   console.log("e.response.data: ", e?.response?.data);
        //   if (e?.response?.data) {
        //     throw new Error(`${e.response.data.message}`);
        //   }
          throw new Error(e.message);
        } else {
          throw new Error(
            "An unexpected error has occurred while fetching on fetcher.ts, please review the logs in that file"
          );
        }
        // if (axios.isAxiosError(e)) {
        //     if (e?.response?.data) {
        //       throw new Error((e as AxiosError).response.data.message);
        //     }
        //   }
        //   throw new Error(
        //     "An unexpected error has occurred while fetching on fetcher.ts, please review the logs in that file"
        //   );
      }
    },
    getFrontEndURL: () => {
        return frontEndUrl
    },
    getBackEndURL: () => {
        return urlBackEndBase
    }
  };
}
