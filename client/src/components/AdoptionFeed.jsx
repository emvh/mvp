import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import { petfinder_token } from '../../../database/keys.js';
import AdoptionCard from './AdoptionCard.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function AdoptionFeed() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://api.petfinder.com/v2/animals?type=dog';
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
        {isLoading && <p>Loading </p>}
      </div>
      <div>
        {data.length !== 0 && (data.map(dog => (
          <AdoptionCard
            key={dog.id}
            name={dog.name}
            image={dog.primary_photo_cropped}
            description={dog.description}
          />
        )))}
      </div>
    </div>
  );
}

export default AdoptionFeed;
