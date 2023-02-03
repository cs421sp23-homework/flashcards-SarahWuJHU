import { List, Fab, withStyles } from "@material-ui/core";
import Add from "@mui/icons-material/Add";
import CardDeck from "../components/CardDeck";
import { Container } from "@mui/material";
import Header from "../components/Header";

const styles = {
  fab: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
};

function DisplayCards(props) {
  const { decks } = props;
  let decklist = []
  for (const deck in decks){
    console.log(deck)
    decklist.push(<CardDeck deck={decks[deck]} title={deck} key={deck}/>)
  }
  return (
    <Container>
      <Header />
      <List>
        {decklist}
      </List>
      <Fab aria-label={"Add"} style={styles.fab} >
        <Add />
      </Fab>
    </Container>
  );
}

export default withStyles(styles)(DisplayCards);
