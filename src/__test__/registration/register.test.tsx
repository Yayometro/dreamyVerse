import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import RegisterComponent from "@/components/register/RegisterComponent";
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import notifier from "@/helpers/notifier";
import { validateMail } from "@/components/register/RegisterComponent";
import {server} from "@/__mocks__/Mock Server Worker/server"

jest.mock("@/helpers/notifier"); // Mock notifier
const mockNotifier = notifier as jest.MockedFunction<typeof notifier>;


const mockRouter : AppRouterInstance = {
  back: jest.fn(),
  forward: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () : { useRouter: jest.Mock } => ({
  useRouter: jest.fn(),
}));


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

  // Establish API mocking before all tests.
  // beforeAll(() => server.listen())

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
    // useRouter.mockImplementation();
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud-name";
    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    // afterEach(() => server.resetHandlers())
    render(
      <RegisterComponent />
    );
  })

  // Clean up after the tests are finished.
  // afterAll(() => server.close())
  it("updateValidationMessages, when one char is enter and the password is less than 8. All the 3 valiation messages must display", () => {

    
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
  it("updateValidationMessages, when password is enter and the password has capital letter and at least 8 char. The special character valiation messages must display", () => {

    const inputPassword = screen.getByLabelText(/Password/i);

    fireEvent.change(inputPassword, { target: { value: "aD4rff4rffff" } });

    expect(
      screen.getByText(/The password must have at least one special character/i)
    ).toBeVisible();
  });
  it("updateValidationMessages, when password is enter and the password has special char and at least 8 char. The capital letter valiation messages must display", () => {

    const inputPassword = screen.getByLabelText(/Password/i);

    fireEvent.change(inputPassword, { target: { value: "aD4rff4rffff" } });

    expect(
      screen.getByText(/The password must have at least one capital letter./)
    ).toBeVisible();
  });

  it("Submit button should not being usefull if the required fields hasn't been filled out", () => {
    const submitBtn = screen.getByRole("button", {name: /submit/i})
    // Confirm the btn is disabled from the beggining
    expect(submitBtn).toBeDisabled()
  })

  it("submit button is enabled once all the required fields arre fullfilled", () => {
    const submitBtn = screen.getByRole("button", {name: /submit/i})
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: {value: "Passwords21!"}
    })
    fireEvent.change(screen.getByLabelText(/mail/i), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByLabelText(/usarname/i), {
      target: { value: "ElPaco99" },
    })

    expect(submitBtn).not.toBeDisabled()
  })

  it("If the mail format is incorrect, a warning message should be displayed when you click on submit and the input email should be cleaned", () => {
    const emailInput = screen.getByLabelText(/mail/i)
    fireEvent.change(emailInput, {
      target: {value: " "}
    })
    // Rest of the required fields:
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: {value: "Passwords21!"}
    })
    fireEvent.change(screen.getByLabelText(/usarname/i), {
      target: { value: "ElPaco99" },
    })
    fireEvent.click(screen.getByRole("button", {name: /Submit/i}))
    expect(validateMail(" ")).not.toBe(true)
    expect(emailInput).toHaveValue("");
  })

  it("One submit is clicked with right information, the response has to be a ok, responce from server with the User data and it should push ro Dashboard.", () => {

  })
});
