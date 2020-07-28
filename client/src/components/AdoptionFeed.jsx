import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { petfinder_token } from '../../../database/keys.js';
import AdoptionCard from './AdoptionCard.jsx';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  container: {
    paddingTop: '50px',
  }
}));

function AdoptionFeed() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://api.petfinder.com/v2/animals?type=dog&limit=100';
  const config = { Authorization: `Bearer ${petfinder_token}` };

  const getData = () => {
    axios({
      method: 'get',
      url: proxyurl + url,
      headers: config,
    })
      .then((response) => {
        console.log(response.data.animals);
        setData(response.data.animals);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>

      <div>
        {isLoading && <p> ... </p>}
      </div>

      {/* <div className={classes.root}> */}
      {/* <Container className={classes.cardGrid}maxWidth="md"> */}
    <div className="adoption-container">
      <CardColumns>
       <Grid container spacing={2}>
        {data.length !== 0 && (data.map(dog => (
          <AdoptionCard
            key={dog.id}
            name={dog.name}
            breeds={dog.breeds}
            image={dog.primary_photo_cropped}
            description={dog.description}
          />
        )))}
      </Grid>
      </CardColumns>
      {/* </Container> */}
      </div>
    </div>
  );
}

export default AdoptionFeed;
