"use client"

import { useRouter } from "nextjs-toploader/app";
import { FaRegBookmark, FaRegClock, FaRegQuestionCircle, FaStar, FaUserFriends } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { QuizCardProps } from "../../../types/componentTypes";
import Button from "../reusable/Button";

const QuizCard = (props: QuizCardProps) => {
  const {
    title,
    author,
    is_ai_generated,
    time_limit,
    question_count,
    average_rating = 0,
    attempts_count = 0,
    quiz_id, 
  } = props;

  const router = useRouter()

  return (
    <div className="flex flex-col bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-2xl p-5 hover:border-(--main-primary-light)/50 transition-colors group">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
            {title.substring(0, 1).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-(--text-primary-light) line-clamp-1 group-hover:text-(--main-primary-light) transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-(--text-secondary) mt-1">
              <span>By {author.name}</span>
              <VscVerifiedFilled className="text-blue-500" />
            </div>
          </div>
        </div>
        <button className="text-(--text-secondary) hover:text-(--text-primary-light) transition-colors p-1">
          <FaRegBookmark />
        </button>
      </div>

      {/* Badges / Indicators (Schema derived) */}
      <div className="flex flex-wrap gap-2 mb-5 h-6">
        {is_ai_generated && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider">
            <MdOutlineAutoAwesome /> AI Generated
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs text-(--text-secondary) mb-5 px-1 border-y border-(--main-tertiary-light) py-3">
        <div className="flex items-center gap-1.5">
          <FaRegQuestionCircle /> {question_count} Qs
        </div>
        <div className="flex items-center gap-1.5">
          <FaRegClock /> {time_limit ? `${time_limit} min` : "N/A"}
        </div>
        <div className="flex items-center gap-1.5">
          <FaUserFriends /> {attempts_count > 999 ? `${(attempts_count/1000).toFixed(1)}K` : attempts_count}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto gap-4">
        {average_rating > 0 ? (
          <div className="flex items-center gap-1.5 text-sm font-semibold text-(--text-primary-light)">
            <FaStar className="text-yellow-400" /> {average_rating.toFixed(1)}
          </div>
        ) : (
          <div className="text-xs text-(--text-secondary-light)">New</div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Button attrs={{onClick: ()=> router.push(`/quiz/${quiz_id}`)}} size="small" color="primary" className="px-5">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;