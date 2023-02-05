import { List, Fab, withStyles } from "@material-ui/core";
import Add from "@mui/icons-material/Add";
import CardDeck from "../components/CardDeck";
import { Container } from "@mui/material";
import Header from "../components/Header";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  fab: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
};

function DisplayCards(props) {
  const { decks, authorized } = props;
  if (!authorized) {
    return (
      <Container>
        <AppBar
          style={{ background: "#2E3B55", width: "100%" }}
          position="sticky"
        >
          <Toolbar>
            <Box py={3}>
              <Typography variant="h4">403 Forbidden</Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }

  let decklist = [];
  for (const deck in decks) {
    decklist.push(<CardDeck deck={decks[deck]} title={deck} key={deck} />);
  }
  return (
    <Container>
      <Header />
      <List>{decklist}</List>
      <Fab aria-label={"Add"} style={styles.fab}>
        <Add />
      </Fab>
    </Container>
  );
}

export default withStyles(styles)(DisplayCards);
