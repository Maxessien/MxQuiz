import AttemptsDetails from "@/src/components/attempts/AttemptsDetails";
import { getUserAttemptsDetails } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const AttemptsDetailsPage = async ({
  params,
}: {
  params: Promise<{ attId: string }>;
}) => {
  const { attId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);

  const details = await getUserAttemptsDetails(token?.value || "", attId);

  if (!details) return notFound();

  return <AttemptsDetails details={details} />;
};

export default AttemptsDetailsPage;
