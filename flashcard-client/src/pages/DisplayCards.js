import { List, Fab, withStyles } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import CardDeck from "../components/CardDeck";
import { Container } from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const styles = {
  fab: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
};

function DisplayCards(props) {
  const { decks, auth, deleteCard } = props;
  if (!auth) {
    return <Navigate replace to="/login" />;
  }

  let decklist = [];
  for (const deck in decks) {
    decklist.push(
      <CardDeck
        deck={decks[deck]}
        title={deck}
        key={deck}
        deleteCard={deleteCard}
      />
    );
  }
  return (
    <Container>
      <Header />
      <List>{decklist}</List>
      <Link to="/add">
        <Fab aria-label={"Add"} style={styles.fab}>
          <Add />
        </Fab>
      </Link>
    </Container>
  );
}

export default withStyles(styles)(DisplayCards);
