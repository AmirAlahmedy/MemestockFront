import React from "react";
import { create } from "react-test-renderer";
import Settings from "./Settings";

describe("Settings component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<Settings />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });