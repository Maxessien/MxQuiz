"use client"

import { useAppSelector } from '@/store'
import { QuizCardProps } from '@/types/componentTypes'
import { useState } from 'react'
import Filters from './Filters'
import HeaderAndSearch from './HeaderAndSearch'
import QuizCard from './QuizCard'
import QuizPagination from './QuizPagination'

const Quizzes = ({quizzes, page, totalPages}: {quizzes: QuizCardProps[], page?: number, totalPages: number}) => {
    const [showFilters, setShowFilters] = useState(false)
    const {width} = useAppSelector(state=> state.app)
  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 py-10 flex flex-col gap-10 lg:gap-14">
          {/* Header Section */}
          <HeaderAndSearch toggleFilters={()=> setShowFilters(!showFilters)} />

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            {/* Sidebar Filters */}
            {(showFilters || width > 1024) && <Filters />}

            {/* Quizzes List & Top Filters */}
            <div className="flex-1 w-full min-w-0 flex flex-col">

              {/* Quizzes Grid */}
              {quizzes?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                  {quizzes?.map((quiz) => (
                    <QuizCard key={quiz.quiz_id} {...quiz} />
                  ))}
                </div>
              ) : (
                <p className="text-xl text-(--text-primary-light) font-semibold w-full text-center">
                  No Quiz Found
                </p>
              )}

              <QuizPagination
                currentPage={page ? Number(page) : 1}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
  )
}

export default Quizzes