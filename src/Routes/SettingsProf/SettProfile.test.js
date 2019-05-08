import React from "react";
import { create } from "react-test-renderer";
import SettProfile from "./SettProfile";

describe("SettProfile component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<SettProfile />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it("Shows pass page meta", async () => {
    const component = create(<ChangePass />);
    const instance = component.getInstance();
    await instance.handleSubmit();
    console.log(instance.state); 
  });