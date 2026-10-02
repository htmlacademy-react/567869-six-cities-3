import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { cities } from './mocks/cities';
import mockOffers from './mocks/offers';
import mockReviews from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cities={cities} offers={mockOffers} reviews={mockReviews}/>
  </React.StrictMode>
);
