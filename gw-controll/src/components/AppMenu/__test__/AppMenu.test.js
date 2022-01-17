import { render, screen } from "@testing-library/react";
import AppMenu from "../index";



//****Testing Elements Existence */
describe("Check the rendering of NotLogged components", () => {
  test("render Texts", async () => {
    render(
      <AppMenu
        currentUser={{
          UID: "some id",
          Email: "Some Email",
          Rol: "Admin",
        }}
      />
    );
    const logoElement = screen.getByText("GW-CONTROL");
    expect(logoElement).toBeInTheDocument();
  });
});
