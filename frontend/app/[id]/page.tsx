

import UserDashboard from "@/src/components/user-dashboard/UserDashboard";
import { getUserDashboardStats } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const UserDashboardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!token?.value) {
    return notFound();
  }

  const data = await getUserDashboardStats(token.value);
  
  if (!data) {
    return (
      <div className="p-10 text-center text-(--text-errors)">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <UserDashboard userId={id} data={data} />
  )
}

export default UserDashboardPage