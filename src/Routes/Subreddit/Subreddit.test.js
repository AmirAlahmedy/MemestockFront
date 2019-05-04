import React from "react";
import { configure, shallow, mount } from 'enzyme';
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

describe("Subreddit component subscribe button", () => {
  test("it shows that subscribed state is changed!)", () => {
    const component = create(<Subreddit subscribed={true} />);
    const instance = component.getInstance();
    instance.srUnSubscribe({ 
      preventDefault: () => {
  }});
    expect(instance.state.subscribed).toBe(false);
  });
});

describe("Subreddit component cancel button", () => {
  test("it shows that threadCreation state is changed!)", () => {
    const component = create(<Subreddit threadCreation={true} />);
    const instance = component.getInstance();
    instance.CancelCreation({ 
      preventDefault: () => {
  }});
    expect(instance.state.threadCreation).toBe(false);
  });
});


describe("Subreddit component CreatePost button", () => {
  test("it shows that threadCreation state is changed!)", () => {
    const component = create(<Subreddit threadCreation={true} subscribed={true} />);
    const instance = component.getInstance();
    instance.createThreadSidebar({ 
      preventDefault: () => {
  }});
    expect(instance.state.threadCreation).toBe(false);
  });
});

describe("Subreddit component cancel edit button", () => {
  test("it shows that threadCreation state is changed!)", () => {
    const component = create(<Subreddit subredditEdit={true} />);
    const instance = component.getInstance();
    instance.cancelSubreddit({ 
      preventDefault: () => {
  }});
    expect(instance.state.subredditEdit).toBe(false);
  });
});
