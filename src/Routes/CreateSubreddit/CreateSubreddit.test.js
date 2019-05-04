import React from "react";
import { create } from "react-test-renderer";
import CreateSubreddit from "./CreateSubreddit";

describe("CreateSubreddit component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<CreateSubreddit />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  
