import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "url('https://mvp123.s3-us-west-1.amazonaws.com/pugblanket.jpg')",
    backgroundPosition: 'center',
    background: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    marginBottom: '100px',
    marginLeft: '250px',
  },
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
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Home = (props) => {
  const cards = [1, 2, 3];
  const classes = useStyles();
  const { onClick } = props;

  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar position="relative" >
          <Toolbar background-color="yellow" style={{backgroundColor: '#51b2ae'}}>
            <PetsIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Paws
            </Typography>
          </Toolbar>
        </AppBar>

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <br/>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" style={{backgroundColor: '#51b2ae'}} onClick={() => onClick('adoption')}>
                    Find Friends
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" style={{backgroundColor: '#edeef0', fontWeight: 'bold', color: '#51b2ae', borderColor: '#51b2ae'}} onClick={() => onClick('events')}>
                    Find Pawties
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {props.blogs.map((blog, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={blog.url}
                    title="Some Blog"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {blog.title}
                    </Typography>
                    <Typography>
                      {blog.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" style={{color: "#337570"}}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Wassup Dawg
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

        </Typography>
      </footer>
    </React.Fragment>
  );
};

export default Home;
