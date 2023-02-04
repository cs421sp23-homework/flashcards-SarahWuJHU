import React, { Component } from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router";
import DisplayCards from "./pages/DisplayCards";
import LoginPage from "./pages/LoginPage";
import {
  setToken,
  get,
  getAll,
  create,
  remove,
  update,
  register,
  authenticate,
} from "./services/api.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      cards: [
        {
          _id: "63d6c1c51467a50be8d30f58",
          word: "accusamus",
          definition:
            "Qui quis aut sint nobis aut est dignissimos numquam ut. Praesentium cum rerum temporibus nam. Quam et laudantium delectus voluptates sit. Labore ut quod fuga. Harum dignissimos omnis laborum deleniti consequatur. Numquam natus ut animi alias quas excepturi tenetur veniam ut.",
          deck: "sequi",
          author: "63d6c1c41467a50be8d30f56",
          __v: 0,
        },
        {
          _id: "63d6c1c51467a50be8d30f5a",
          word: "optio",
          definition:
            "Minima voluptatum sed dolorum laborum rerum explicabo. Non laudantium nihil est id facere asperiores recusandae. Odio possimus aspernatur alias adipisci temporibus exercitationem fugiat aperiam consequatur. Temporibus minima labore perspiciatis excepturi molestias sed id dolore. Libero repudiandae tempore doloribus enim reiciendis. Animi impedit est tenetur tenetur deserunt ea.",
          deck: "consequatur",
          author: "63d6c1c41467a50be8d30f56",
          __v: 0,
        },
      ],
    };
  }

  async userRegister(user) {
    try {
      const response = await register(user);
      this.setState((state) => {
        state.token = response.data.token;
        return state;
      });
      console.log(this.state);
      return "Register Successful!";
    } catch (err) {
      return "Your username has already been registered!";
    }
  }

  async userLogin(user) {
    try {
      const response = await authenticate(user);
      console.log(response.data);
      this.setState((state) => {
        state.token = response.data.token;
        return state;
      });
      console.log("hi");
      return "Register Successful!";
    } catch (err) {
      return "Invalid username/password!";
    }
  }

  organizeCards(cards) {
    let decks = {};
    for (const card in cards) {
      if (cards[card].deck in decks) {
        decks[cards[card].deck].push(cards[card]);
      } else {
        decks[cards[card].deck] = [cards[card]];
      }
    }
    return decks;
  }

  render() {
    const { cards } = this.state;
    return (
      <Container>
        <Routes>
          <Route
            path="/auth"
            element={
              <LoginPage
                userLogin={this.userLogin}
                userRegister={this.userRegister}
              />
            }
          />
          <Route
            path="/"
            element={<DisplayCards decks={this.organizeCards(cards)} />}
          />
        </Routes>
      </Container>
    );
  }
}

export default App;
