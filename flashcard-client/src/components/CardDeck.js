import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { ExpandMore, Add } from "@mui/icons-material";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Grid from "@material-ui/core/Grid";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CourseCard from "./FlashCard";
import Button from "@mui/material/Button";
import { withStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const styles = {
  iconButton: {
    marginLeft: "auto",
    width: "2rem",
    height: "4rem",
    borderRadius: "50%",
  },
};

class CardDeck extends Component {
  handleAddToDeck = (e) => {
    e.preventDefault();
    this.props.navigate(`/add?deck=${this.props.title}`, {
      state: {
        _id: "",
        word: "",
        definition: "",
        deck: this.props.title,
      },
    });
  };
  
  handleDisplay = (e) => {
    e.preventDefault();
    this.props.navigate(`/read?deck=${this.props.title}`, {
      state: {
        deck: this.props.deck,
      },
    });
  }

  render() {
    const { deck, title, deleteCard } = this.props;

    return (
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box py={2}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Button style={styles.iconButton} py={2} onClick={this.handleAddToDeck}>
            <Add />
          </Button>
          <Button py={2} onClick={this.handleDisplay}>
            <AutoAwesomeMotionIcon />
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {deck.map((content, index) => {
              return (
                <CourseCard
                  key={index}
                  content={content}
                  deleteCard={deleteCard}
                />
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CardDeck {...props} navigate={navigate} />;
}
export default withStyles(styles)(WithNavigate);
