import React, { Component } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DisplayCard from "../components/DisplayCard";
import { Navigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useLocation, useNavigate, useParams } from "react-router-dom";

class StudyDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, deck: [] };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { deck } = this.props.router.location.state;
    if (deck) {
      this.setState((state) => {
        state.deck = deck;
        return state;
      });
    }
  }

  handleNext = () => {
    this.setState((state) => {
      if (state.index === state.deck.length-1) {
        state.index = 0;
      } else {
        state.index = state.index + 1;
      }
      return state;
    });
  };
  handlePrev = () => {
    this.setState((state) => {
      if (state.index === 0) {
        state.index = state.deck.length;
      } else {
        state.index = state.index - 1;
      }
      return state;
    });
  };
  handleBack = (e) => {
    e.preventDefault();
    this.props.router.navigate("/display");
  };
  render() {
    if (!this.props.auth) {
      return <Navigate replace to="/login" />;
    }
    const { deck, index } = this.state;
    const card = deck.length === 0 ? {
      word: "Currently No Card to Study",
      definition: "Currently No Card to Study",
      deck: "",
    } : deck[index];
    return (
      <Container className="container-main">
        <DisplayCard content={card} />
        <div className="action-buttons">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="success"
                className="ms-4 prev-next-btns"
                onClick={this.handlePrev}
              >
                Prev
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="success"
                className="ms-4 prev-next-btns"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="success"
                className="ms-4 prev-next-btns"
                onClick={this.handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

function withRouter(StudyDeck) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <StudyDeck {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter(StudyDeck);
