import React, { Component, setState } from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router";
import DisplayCards from "./pages/DisplayCards";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UpsertCards from "./pages/UpsertCards";
import {
  setToken,
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
      authorized: false,
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
    this.deleteCard = this.deleteCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.addCard = this.addCard.bind(this);
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
      return { m: "Register Successful!", status:true };
    } catch (err) {
      return { m: "Your username has already been registered!",status:false };
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
      return { m: "Log in Successful!",status:true };
    } catch (err) {
      return { m: "Invalid username/password!",status:false };
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

  async addCard(c) {
    if (!c) {
      return "Invalid card";
    }
    if (!c.word || !c.definition || !c.deck) {
      return "Invalid Card";
    }
    setToken(this.state.token);
    try {
      const card = await create(c);
      this.setState((state) => {
        state.cards.push(card);
        return state;
      });
      return "Card successfully Added!";
    } catch (err) {
      return "Invalid card";
    }
  }

  async updateCard(card) {
    if (!card) {
      return "Invalid card";
    }
    if (!card.word || !card.definition || !card.deck) {
      return "Invalid card";
    }
    setToken(this.state.token);
    try {
      const c = await update(card);
      this.setState((state) => {
        state.cards = state.cards.map((n) => (n._id === c._id ? c : n));
        return state;
      });
      return "Card successfully updated!";
    } catch (err) {
      return "Invalid card";
    }
  }

  async deleteCard(card) {
    if (!card._id) {
      return "Invalid card";
    }
    setToken(this.state.token);
    try {
      const c = await remove(card);
      this.setState((state) => {
        state.cards = state.cards.filter((n) => (n._id !== c._id));
        return state;
      });
      console.log(this.state.cards);
      return "Card succesfully deleted!";
    } catch (err) {
      return "Invalid card";
    }
  }

  render() {
    const { cards, authorized } = this.state;
    return (
      <Container>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route
            path="login"
            element={
              <LoginPage
                userLogin={this.userLogin}
                userRegister={this.userRegister}
              />
            }
          />
          <Route
            path="display"
            element={
              <DisplayCards
                decks={this.organizeCards(cards)}
                auth={authorized}
                deleteCard={this.deleteCard}
              />
            }
          />
          <Route path="add" element={<UpsertCards auth={authorized}/>}/>
        </Routes>
      </Container>
    );
  }
}

export default App;
