import React from "react";
import { create } from "react-test-renderer";
import ThreadPage from "./thread-page";


configure({adapter: new Adapter()});


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

  it("Get user's comments", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.getCommentsJSX();
    console.log(instance.state); 
  });

  it("Edit thread", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.handleEdit();
    console.log(instance.state); 
  });

  it("Delete thread", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.delPost();
    console.log(instance.state); 
  });

  it("Add reply to a comment", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.replyComment();
    console.log(instance.state); 
  });

  it("Add comment to a thread ", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.addComment();
    console.log(instance.state); 
  });

  it("Edit comment of a thread ", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.goEdit();
    console.log(instance.state); 
  });

  it("delete comment of a thread ", async () => {
    const component = create(<ThreadPage />);
    const instance = component.getInstance();
    await instance.deleteComment();
    console.log(instance.state); 
  });

  