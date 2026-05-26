

import { FaSpinner } from "react-icons/fa";

const TimesUpPopup = ({isSubmitting}: {isSubmitting: boolean}) => {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 backdrop-blur-md bg-black/60 flex justify-center items-center p-4">
        <div className="bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl font-bold text-red-500">Time&apos;s Up!</h2>
            <p className="text-(--text-secondary)">
                The time limit for this quiz has been exceeded. Your attempt is being auto-submitted.
            </p>
            {isSubmitting && (
                <div className="flex items-center gap-3 mt-2 text-(--main-primary-light) text-lg font-medium">
                    <FaSpinner className="animate-spin text-2xl" />
                    <span>Submitting...</span>
                </div>
            )}
        </div>
    </div>
  )
}

export default TimesUpPopup