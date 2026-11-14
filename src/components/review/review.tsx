import { Reviews } from '../../types/review';
import ReviewItem from '../review-item/review-item';
import { MAX_REVIEWS_COUNT } from '../../const';

type ReviewProps = {
  reviews: Reviews;
};

function Review({ reviews }: ReviewProps): JSX.Element {
  const sortedReviews = [...reviews]
    .sort(
      (reviewA, reviewB) =>
        new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime()
    )
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default Review;
