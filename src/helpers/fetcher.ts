
const urlBackEndBase = process.env.NEXT_PUBLIC_API_ROUTE
const frontEndUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL
const urlApi = process.env.NEXT_PUBLIC_API_ROUTE + "/api/"

export default function fetcherFetch() {
  let fullUrl: string;
  return {
    get: async (url: string) => {
      try {
        fullUrl = `${urlApi}${url}`;
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()
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
        return dataa;
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
    getFrontEndURL: () => {
        return frontEndUrl
    },
    getBackEndURL: () => {
        return urlBackEndBase
    }
  };
}
