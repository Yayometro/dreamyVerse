import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import RegisterComponent from "@/components/register/RegisterComponent";
import { createMockRouter } from "@/__mocks__/next/MockRouterTest";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime"; 

export const updateValidationMessages = (
  password: string,
  setValidationMessages: (newMsg: object) => void
) => {
  const regexCapital = /[A-Z]/;
  const regexSpecial = /[!@#$%^&*(),.?":_{}|<>]/;

  const newMessages = {
    passLength: password.length < 8 ? "" : "hidden",
    passCapital: regexCapital.test(password) ? "hidden" : "",
    passSpecial: regexSpecial.test(password) ? "hidden" : "",
  };
  setValidationMessages(newMessages);
};
describe("Register.tsx", () => {
  it("updateValidationMessages, when one char is enter and the password is less than 8. All the 3 valiation messages must display", () => {
    // const router = createMockRouter({})
    // jest.mock("next/router", () => ({
    //     useRouter() {
    //       return {
    //         prefetch: () => null
    //       };
    //     }
    //   }));
    render(
      // <RouterContext.Provider value={router}>
        <RegisterComponent />
      //  </RouterContext.Provider>
    );
    const inputPassword = screen.getByLabelText(/Password/i);
    fireEvent.change(inputPassword, { target: { value: "a" } });
    expect(
      screen.getByText(/The password must have at least 8 characters./)
    ).toBeVisible();
    expect(
      screen.getByText(/The password must have at least one capital letter./)
    ).toBeVisible();
    expect(
      screen.getByText(/The password must have at least one special character/i)
    ).toBeVisible();
  });
});
