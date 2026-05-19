/* eslint-disable @next/next/no-img-element */
import { VscVerifiedFilled } from "react-icons/vsc";
import { QuizDetailsProps } from "../../../types/componentTypes";
import Button from "../reusable/Button";

interface Props {
  details: QuizDetailsProps;
}

const CreatorCard = ({ details }: Props) => {
  return (
    <div className="bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-2xl p-6 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 text-sm font-semibold text-(--text-secondary) self-start mb-6">
        Creator
      </div>

      <div className="flex items-center gap-4 w-full text-left mb-6">
        {details.author.avatar_url ? (
          <img
            src={details.author.avatar_url}
            alt={details.author.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-(--main-tertiary-light)"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold border-2 border-blue-500/30">
            {details.author.name.charAt(0)}
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-base font-bold text-(--text-primary-light) flex items-center gap-1.5">
            {details.author.name} <VscVerifiedFilled className="text-blue-500" />
          </span>
          {/* Missing role details in schema so defaulting to simple text or skip. Added static filler just to match design shape */}
          <span className="text-xs text-(--text-secondary-light)">Content Creator on MxQuiz</span>
        </div>
      </div>

      {/* Stats container omitted since schema doesn't track follower/following network */}

      <Button width="w-full" color="tertiary" className="border-(--main-tertiary-light)! text-(--text-secondary)! hover:text-(--text-primary-light)!">
        Follow
      </Button>
    </div>
  );
};

export default CreatorCard;