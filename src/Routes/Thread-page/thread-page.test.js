import React from "react";
import { create } from "react-test-renderer";
import ThreadPage from "./thread-page";

describe("Subreddit component snapshot", () => {
  test("it matches the snapshot", () => {
    const component = create(<ThreadPage />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});


it("Shows thread page meta", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    console.log(instance.state); 
  });