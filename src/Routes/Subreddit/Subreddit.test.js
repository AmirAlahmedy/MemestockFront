import React from "react";
import { create } from "react-test-renderer";
import Subreddit from "./subreddit";

describe("Subreddit component snapshot", () => {
  test("it matches the snapshot", () => {
    const component = create(<Subreddit />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

it("Shows subreddit page meta", async () => {
  const component = create(<Subreddit />);
  const instance = component.getInstance();
  await instance.componentDidMount();
  console.log(instance.state); 
});

test("Buttons", () => {
  const component = create(<Subreddit  />);
  const rootInstance = component.root;
  const button = rootInstance.findByType("button");
  button.props.onClick();
  expect(button.props.children).toHaveBeenCalled();
});
//subscribed={false}
/*
describe("Subscribe Button", () => {
  test("it shows the expected text when clicked", () => {
    const component = create(<Subreddit />);
    const instance = component.getInstance();
    //expect(instance.state.text).toBe("");
    instance.editSubreddit();
    expect(instance.state.subredditEdit).toBe(true);
  });
});
*/
/*
it('Login should call handleSubmit when clicked', () => {
  const spy = jest.spyOn(Subreddit.prototype, 'handleChange');
  const component = create(<Subreddit />);
    const instance = component.getInstance();
  //const f_wrapper = create(<Subreddit/>);
  instance.find('.logInForm').simulate('submit');
  expect(spy).toHaveBeenCalled() 
});
/*
test("it shows the expected text when clicked", () => {
  const component = create(<Subreddit  />);
  const rootInstance = component.root;
  const button = rootInstance.findByType("button");
  button.props.onClick();
  expect(button.props.children).toBe("SUBSCRIBE");
});
*/
