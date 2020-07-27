import React from 'react';

const EventDetails = (props) => {
  const { title, date, description } = props.event;
  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
      <div>{description}</div>
    </div>
  );
};

export default EventDetails;
