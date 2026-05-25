"use client";

import { useAppSelector } from "@/store";
import { QuestionResult } from "@/types/types";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Result from "../quiz-questions/Result";

const AttemptsDetails = ({
  details,
}: {
  details: {
    score: number;
    result: QuestionResult[];
  };
}) => {
    const {userId} = useAppSelector(state=> state.user)

    return (
    <>
      <div className="flex mb-3 w-full justify-start">
        <Link
          href={`/${userId}/attempts`}
          className="flex justify-start items-center text-(--text-secondary) gap-2 text-base hover:text-(--main-primary) md:text-lg font-medium"
        >
          <FaArrowLeft /> <span>Back</span>
        </Link>
      </div>
      <Result results={details.result} score={details.score} />
    </>
  );
};

export default AttemptsDetails;
