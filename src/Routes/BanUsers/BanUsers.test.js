import React from "react";
import { create } from "react-test-renderer";
import BanUsers from "./BanUsers";

describe("BanUsers component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<BanUsers />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it("Shows pass page meta", async () => {
    const component = create(<ChangePass />);
    const instance = component.getInstance();
    await instance.BanUser();
    console.log(instance.state); 
  });