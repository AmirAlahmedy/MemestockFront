import React from "react";
import { create } from "react-test-renderer";
import BanUsers from "./BanUsers";

describe("BanUsers component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<BanUsers />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });