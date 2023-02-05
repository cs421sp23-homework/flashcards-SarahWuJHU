import { FormControl, TextField, Button, Paper } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  form: {
    marginTop: "3rem",
    marginBottom: "1rem",
    padding: "1rem",
  },
  paper: {
    marginBottom: "2rem",
  },
};

class UpsertCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      definition: "",
      deck: "",
    };
  }

  updateWord = (event) => {
    this.setState({
      word: event.target.value,
    });
  };

  updateDefinition = (event) => {
    this.setState({
      definition: event.target.value,
    });
  };

  updateDeck = (event) => {
    this.setState({
      deck: event.target.value,
    });
  };

  render() {
    if (!this.props.auth) {
      return <Navigate replace to="/login" />;
    }
    return (
      <form style={styles.form}>
        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField label="Word" variant="outlined" />
          </FormControl>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Deck (automatically creates/changes decks)"
              variant="filled"
            />
          </FormControl>
        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Definition"
              multiline
              minRows={6}
              variant="outlined"
            />
          </FormControl>
        </Paper>

        <div>
          <Button type="button" color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(UpsertCards);
