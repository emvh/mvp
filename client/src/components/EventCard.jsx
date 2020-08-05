import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  cardContent: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '12em',
    lineHeight: '3em',
  },
}));

const EventCard = (props) => {
  const classes = useStyles();
  const { index, id, title, date, description, image, onClick } = props;

  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={image}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>
            {moment(date).format('MMMM Do YYYY')}
          </Typography>
          <Typography>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" style={{ color: '#337570' }} onClick={() => onClick(id)}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EventCard;
