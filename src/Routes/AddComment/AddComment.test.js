import React from "react";
import { create } from "react-test-renderer";
import AddComment from "./AddComment";

describe("AddComment component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<AddComment />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });