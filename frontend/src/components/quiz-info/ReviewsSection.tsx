/* eslint-disable @next/next/no-img-element */
import { FaStar } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { QuizDetailsProps } from "../../../types/componentTypes";

interface Props {
  details: QuizDetailsProps;
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  return `${Math.floor(diffInMonths / 12)} years ago`;
};

const ReviewsSection = ({ details }: Props) => {
  if (!details.reviews || details.reviews.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Overall Rating Block */}
        <div className="flex flex-col w-full md:w-64 bg-(--main-tertiary)/40 border border-(--main-tertiary-light) p-6 rounded-2xl shrink-0">
          <h3 className="text-sm font-bold text-(--text-primary-light) mb-4">What Students Say</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-(--text-primary-light)">
              {details.stats.average_rating.toFixed(1)}
            </span>
            <div className="flex text-yellow-400 text-sm mb-1.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(details.stats.average_rating) ? "text-yellow-400" : "text-(--main-tertiary-light)"} />
              ))}
            </div>
          </div>
          <p className="text-xs text-(--text-secondary)">Based on {details.stats.reviews_count} reviews</p>
        </div>

        {/* Reviews Grid (Carousel simulation) */}
        <div className="flex flex-1 gap-4 overflow-x-auto w-full pb-4 scrollbar-hide">
          {details.reviews.map((review) => (
            <div key={review.quiz_comment_id} className="min-w-70 sm:min-w-[320px] bg-(--main-tertiary) border border-(--main-tertiary-light) p-5 rounded-2xl flex flex-col gap-3">
              {/* Dynamic review title extracted from first few words of comment */}
              <h4 className="text-sm font-bold text-(--text-primary-light) line-clamp-1">
                {review.comment.split(' ').slice(0, 3).join(' ')}...
              </h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {review.user.avatar_url ? (
                    <img src={review.user.avatar_url} alt={review.user.name} className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {review.user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs text-(--text-secondary) font-medium flex items-center gap-1">
                    {review.user.name} <VscVerifiedFilled className="text-blue-500" />
                  </span>
                </div>
                <span className="text-[10px] text-(--text-secondary-light)">{timeAgo(review.created_at)}</span>
              </div>

              <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-3 mt-1">
                {review.comment}
              </p>

              <div className="flex text-yellow-400 text-[10px] mt-auto">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-(--main-tertiary-light)"} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button className="text-sm font-medium text-(--text-secondary) hover:text-(--main-primary-light) transition-colors py-2 px-6 rounded-full border border-(--main-tertiary-light) bg-(--main-tertiary)/50">
          View all {details.stats.reviews_count} reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;