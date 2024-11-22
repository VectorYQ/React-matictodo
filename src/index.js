import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Ap2 from "./Ap2";
import reportWebVitals from "./reportWebVitals";
import MyComponent from "./MyComponent";
import $ from "jquery";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), opacity: 1.0 };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.timer = setInterval(
      function () {
        var opacity = this.state.opacity;
        opacity -= 0.01;
        if (opacity < 0.1) {
          opacity = 1.0;
        }
        this.setState({ opacity: opacity });
      }.bind(this),
      100
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  render() {
    return (
      <div style={{ opacity: this.state.opacity }}>
        <h2 align="center">Hello,{this.props.name}</h2>
        <p align="center">This is a simple example of a React component.</p>
        <h2 align="center">It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class UserGist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", lastGistUrl: "" };
  }

  componentDidMount() {
    this.serverRequest = $.get(
      this.props.source,
      function (result) {
        var lastGist = result[0];
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url,
        });
      }.bind(this)
    );
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div>
        {this.state.username} 用户最新的 Gist 共享地址：
        <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
      </div>
    );
  }
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." },
];

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Hello name="World Mountain" />
    <MyComponent />
    <UserGist source="https://api.github.com/users/octocat/gists" />
    <NumberList numbers={numbers} />
    <App />
    <Ap2 tasks={DATA} />
    <Blog posts={posts} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
