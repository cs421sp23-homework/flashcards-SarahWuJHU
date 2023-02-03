import React, { Component } from "react";
import CardDeck from "./components/CardDeck";
import { Container } from "@mui/material";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      cards: [
        {
            "_id": "63d6c1c51467a50be8d30f58",
            "word": "accusamus",
            "definition": "Qui quis aut sint nobis aut est dignissimos numquam ut. Praesentium cum rerum temporibus nam. Quam et laudantium delectus voluptates sit. Labore ut quod fuga. Harum dignissimos omnis laborum deleniti consequatur. Numquam natus ut animi alias quas excepturi tenetur veniam ut.",
            "deck": "sequi",
            "author": "63d6c1c41467a50be8d30f56",
            "__v": 0
        },
        {
            "_id": "63d6c1c51467a50be8d30f5a",
            "word": "optio",
            "definition": "Minima voluptatum sed dolorum laborum rerum explicabo. Non laudantium nihil est id facere asperiores recusandae. Odio possimus aspernatur alias adipisci temporibus exercitationem fugiat aperiam consequatur. Temporibus minima labore perspiciatis excepturi molestias sed id dolore. Libero repudiandae tempore doloribus enim reiciendis. Animi impedit est tenetur tenetur deserunt ea.",
            "deck": "sequi",
            "author": "63d6c1c41467a50be8d30f56",
            "__v": 0
        }
    ]
    };
  }

  render() {
    const { cards } = this.state;
    return (
      <Container>
        <Header />
        <CardDeck title ={"sequi"} cards={cards}/>
      </Container>
    );
  }
}

export default App;
