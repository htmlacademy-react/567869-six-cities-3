import { Host } from './offer';

export type Review = {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}

export type Reviews = Review[];

export type PostReviewData = {
  offerId: string;
  comment: string;
  rating: number;
};

