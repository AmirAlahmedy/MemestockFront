import React from "react";
import { create } from "react-test-renderer";
import Profile from "./Profile";

describe("Profile component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<Profile />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });