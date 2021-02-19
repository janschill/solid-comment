import { Machine } from "xstate";

export class LoginButton {
  constructor() {
    this.stateMachine = Machine({
      id: "login-button",
      initial: "loggedOut",
      states: {
        loggedOut: {
          on: {
            LOGIN: "loggedIn"
          }
        },
        loggedIn: {
          on: {
            LOGOUT: "loggedOut"
          }
        }
      }
    });
  }

  state() {
    return this.stateMachine
  }

  render() {
    const label = {
      loggedOut: "Log in",
      loggedIn: "Log out"
    }[this.stateMachine.state];
    console.log(this.stateMachine);
    return `<button>${label}</button>`
  }
}
