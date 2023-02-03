import Card from "@mui/material/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ScaleText from "react-scale-text";
import { Component } from "react";

const styles = {
  card: {
    margin: "1rem",
    width: "16rem",
    height: "16rem",
  },
  cardContent: {
    minHeight: "8rem",
  },
  cardActions: {
    height: "3rem",
    disableSpacing: true
  },
  iconButton: {
    marginLeft: "auto",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  },
  expandMore: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
  },
  select: {
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
  },
};

class FlashCard extends Component {
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
      <Grid item>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="body3">
              <div
                className="parent"
                style={{ width: "12rem", height: "8rem" }}
              >
                <ScaleText widthOnly={false}>
                  <p className="child">
                    {this.state.isFlipped ? content.word : content.definition}
                  </p>
                </ScaleText>
              </div>
            </Typography>
          </CardContent>
          <CardActions style={styles.cardActions}>
            <Button size="small" onClick={this.handleFlipClick}>
              Flip
            </Button>
            <IconButton style={styles.iconButton}>
              <ExpandMore style={styles.expandMore} />
              <Select style={styles.select} value={"actions"}>
                <MenuItem value="actions">
                  <Typography variant="body1">Actions ...</Typography>
                </MenuItem>
                <MenuItem value="edit">
                  <Typography variant="body1">Edit</Typography>
                </MenuItem>
                <MenuItem value="delete">
                  <Typography variant="body1">Delete</Typography>
                </MenuItem>
              </Select>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default FlashCard;