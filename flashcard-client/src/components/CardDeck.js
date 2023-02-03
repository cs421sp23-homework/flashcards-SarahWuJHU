import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Grid from "@material-ui/core/Grid";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CourseCard from "./FlashCard";

class CardDeck extends Component {
    render() {
      const { cards, title } = this.props;
  
      return (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box py={2}>
              <Typography variant="h6">{title}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {cards.map((content, index) => {
                return (
                  <CourseCard
                    key={index}
                    content={content}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      );
    }
  }

export default CardDeck