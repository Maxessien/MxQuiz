import AttemptsHeader from "@/src/components/attempts/AttemptsHeader"
import AttemptsTable from "@/src/components/attempts/AttemptsTable"
import { getUserAttempts } from "@/src/utils/fetchers"
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils"
import { cookies } from "next/headers"


const UserAttemptsPage = async() => {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)

    console.log(token)
    const attempts = await getUserAttempts(token?.value || "")
    
  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 md:px-8">
      <AttemptsHeader />
      <AttemptsTable attempts={attempts} />
    </div>
  )
}

export default UserAttemptsPage