import Card from "@mui/material/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  card: {
    margin: "1rem",
    width: "70rem",
    height: "30rem",
  },
  cardContent: {
    minHeight: "26rem",
    maxHeight: "26rem",
  },
  cardActions: {
    height: "5rem",
  },

  iconButton: {
    marginLeft: "auto",
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
  },
};

class DisplayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: true,
    };
    this.handleFlipClick = this.handleFlipClick.bind(this);
  }

  handleFlipClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    const { content } = this.props;
    return (
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <div
              style={{
                overflow: "scroll",
                textOverflow: "ellipsis",
                maxHeight: "12rem",
              }}
            >
              <Typography>
                {this.state.isFlipped ? content.word : content.definition}
              </Typography>
            </div>
          </CardContent>
          <CardActions style={styles.cardActions}>
            <Button size="small" onClick={this.handleFlipClick}>
              Flip
            </Button>
          </CardActions>
        </Card>
    );
  }
}
export default withStyles(styles)(DisplayCard);
