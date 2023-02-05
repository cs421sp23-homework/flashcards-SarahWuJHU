import React, { Component, setState } from "react";
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
      authorized:false,
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
    this.userLogin = this.userLogin.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.organizeCards = this.organizeCards.bind(this);
    this.initializeCards = this.initializeCards.bind(this);
  }

  async userRegister(user) {
    try {
      const response = await register(user);
      this.setState((state) => {
        state.authorized = true;
        state.token = response.data.token;
        return state;
      });
      this.initializeCards();
      return {m:"Register Successful!"};
    } catch (err) {
      return {m:"Your username has already been registered!"};
    }
  }

  async userLogin(user) {
    try {
      const response = await authenticate(user);
      this.setState((state) => {
        state.authorized = true;
        state.token = response.data.token;
        return state;
      });
      this.initializeCards();
      return {m:"Log in Successful!"};
    } catch (err) {
      return {m:"Invalid username/password!"};
    }
  }

  async initializeCards() {
    setToken(this.state.token);
    const cards = await getAll();
    this.setState((state) => {
      state.cards = cards;
      return state;
    });
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
    const { cards, authorized } = this.state;
    return (
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                userLogin={this.userLogin}
                userRegister={this.userRegister}
              />
            }
          />
          <Route
            path= {`/display`}
            element={<DisplayCards decks={this.organizeCards(cards)} auth={authorized}/>}
          />
        </Routes>
      </Container>
    );
  }
}

export default App;
