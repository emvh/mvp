import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import moment from 'moment';

const EventCard = (props) => {
  const { title, city, date, description, image } = props;

  return (
    <div>
      <div>
        <div className="col mb-4">
          <div className="card h-100">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h6>{moment(date).format('MMMM Do YYYY')}</h6>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
