import React from "react";
import { create } from "react-test-renderer";
import ChangePass from "./AddComment";

describe("ChangePass component snapshot", () => {
  test("it matches the snapshot", () => {
    const component = create(<ChangePass />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});


it("Shows pass page meta", async () => {
    const component = create(<ChangePass />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    console.log(instance.state); 
  });

  it("handle submitting new password", async () => {
    const component = create(<ChangePass />);
    const instance = component.getInstance();
    await instance.handleSubmit();
    console.log(instance.state); 
  });