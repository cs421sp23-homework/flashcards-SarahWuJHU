import { FormControl, TextField, Button, Paper } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { Component } from "react";
import { withStyles } from "@material-ui/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const styles = {
  form: {
    marginTop: "3rem",
    marginBottom: "2rem",
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
      _id: "",
      word: "",
      definition: "",
      deck: "",
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDeck = this.updateDeck.bind(this);
    this.updateDefinition = this.updateDefinition.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  componentDidMount = () => {
    const { state } = this.props.router.location;
    if (state) {
      this.setState(state);
    }
  };

  updateWord = (event) => {
    this.setState({
      word: event.target.value,
    });
    document.getElementById("message").innerText =
      "Please enter word, deck, and definition!";
  };

  updateDefinition = (event) => {
    this.setState({
      definition: event.target.value,
    });
    document.getElementById("message").innerText =
      "Please enter word, deck, and definition!";
  };

  updateDeck = (event) => {
    this.setState({
      deck: event.target.value,
    });
    document.getElementById("message").innerText =
      "Please enter word, deck, and definition!";
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.router.navigate("/display", { replace: true });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const card = this.state;
    console.log(this.state);
    const m = await this.props.upsertCard(card);
    document.getElementById("message").innerText = m;
  }

  render() {
    if (!this.props.auth) {
      return <Navigate replace to="/login" />;
    }
    return (
      <form style={styles.form}>
        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Word"
              variant="outlined"
              value={this.state.word}
              onChange={this.updateWord}
            />
          </FormControl>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Deck (automatically creates/changes decks)"
              variant="filled"
              value={this.state.deck}
              onChange={this.updateDeck}
            />
          </FormControl>
        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Definition"
              multiline
              minRows={6}
              value={this.state.definition}
              variant="outlined"
              onChange={this.updateDefinition}
            />
          </FormControl>
        </Paper>

        <div>
          <p className="text-danger" id="message">
            Please enter word, deck, and definition!
          </p>
        </div>

        <div style={styles.form}>
          <Button type="button" color="secondary" onClick={this.handleCancel}>
            Go Back
          </Button>
          <Button type="submit" color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

function withRouter(UpsertCards) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <UpsertCards {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default withStyles(styles)(withRouter(UpsertCards));
