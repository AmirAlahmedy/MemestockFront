import React from "react";
import { create } from "react-test-renderer";
import CreatePost from "./CreatePost";


describe("CreatePost component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<CreatePost />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  
