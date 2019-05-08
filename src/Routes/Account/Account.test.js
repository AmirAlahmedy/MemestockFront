import React from "react";
import { create } from "react-test-renderer";
import Account from "./Account";

describe("Account component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<Account />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });