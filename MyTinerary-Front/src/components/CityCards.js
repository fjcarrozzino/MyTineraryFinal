import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/CityCards.css";
import { Link } from "react-router-dom";

const CityCards = (props) => {
  return (
    <>
      {props.countries.map((item) => (
        <Card className="cards" key={item.name} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={item.name}
            height="140"
            image={item.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography className="description" variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link className="link-city-cards" to={`/cities/${item._id}`}>
              <Button size="small">Learn More</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default CityCards;
