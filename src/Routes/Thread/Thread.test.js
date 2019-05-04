import React from "react";
import { create } from "react-test-renderer";
import Thread from "./Thread";


describe("Thread component snapshot", () => {
    test("it matches the snapshot", () => {
      const component = create(<Thread />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  

  it("Shows Thread component meta", async () => {
    const component = create(<Thread />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    console.log(instance.state); 
  });
  
  
  
  