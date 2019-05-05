import React from "react";
import { create } from "react-test-renderer";
import InviteModerators from "./InviteModerators";

describe("InviteModerators component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<InviteModerators />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });