import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

console.log('eventcard')

const EventCard = (props) => {
  const { title, city, date, image } = props;
  console.log('title', date);

  return (
    <div>
      <div >
        <div class="col mb-4">
          <div class="card h-100">
            <img src={image} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h6>{date}</h6>
              <h5 class="card-title">{title}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
