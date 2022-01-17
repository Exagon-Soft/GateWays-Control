import { render, screen} from "@testing-library/react";
import NotLoggedArea from "../index";

//****Testing Elements Existence */
describe("Check the rendering of NotLogged components", () => {
  test("render Texts", () => {
    render(<NotLoggedArea />);
    const textElements = screen.getByText("Enter the system to manage your GateWays");
    expect(textElements).toBeInTheDocument();
  });
});