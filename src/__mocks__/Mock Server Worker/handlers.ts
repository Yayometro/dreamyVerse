// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req: any, res: any, ctx: any) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.post("/register", (req: any, res: any, ctx: any) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    console.log(req)

    return res(
      ctx.json({
        "username": "Pepe555",
        "password": "Pswedmewd0##23d..2#",
        "mail": "pepe555@outlook.com",
        "name": "Pepe",
        "lastName": "Maciaz",
        "phone": "+525577396656",
        "avatar": "https://randompic.com/4343r4rfrff",
        "zodiac": "Leo",
      }),
      ctx.status(200)
    );
  }),

  rest.get("/user", (req: any, res: any, ctx: any) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
