import { render, screen} from "@testing-library/react";
import ModalSignUp from "../index";

//****Testing Elements Existence */
describe("Check the rendering of SignUp components", () => {
  test("render Texts", () => {
    render(<ModalSignUp />);
    const textElements = screen.getByText("Register new account");
    expect(textElements).toBeInTheDocument();
  });
  test("render Inputs", () => {
    render(<ModalSignUp />);
    const inputElements = screen.getAllByRole("TextInputs");
    //expect(inputElements).count = 2
  });
});