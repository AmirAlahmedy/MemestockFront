import React from "react";
import { create } from "react-test-renderer";
import SettProfile from "./SettProfile";

describe("SettProfile component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<SettProfile />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });