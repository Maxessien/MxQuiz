"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const QuizPagination = ({
  currentPage: page,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const sliceStart = (Number(page) || 1) > 3 ? (Number(page) || 3) - 3 : 0;
  const sliceEnd = (Number(page) || 1) - 1;

  const router = useRouter();
  const searchParams = useSearchParams();

  const orderP = searchParams.get("order");
  const sortP = searchParams.get("sort");
  const typeP = searchParams.getAll("type");
  const hasSearch = searchParams.get("search");

  const navToPage = (pageNumber: number) => {
    router.push(
      `/quiz?page=${pageNumber}${hasSearch ? `&search=${hasSearch}` : ""}${orderP ? `&order=${orderP}` : ""}${sortP ? `&sort=${sortP}` : ""}${typeP ? `&type=${typeP}` : ""}`,
    );
  };
  return (
    <div className="flex items-center justify-center gap-2 mt-12 w-full">
      <button disabled={page <= 1} className="w-8 h-8 rounded disabled:opacity-65 bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
        &lt;
      </button>
      {totalPages <= 5 ? (
        Array(totalPages)
          .fill("n")
          .map((_, idx) => {
            return (
              <button
                style={
                  page === idx
                    ? { background: "var(--main-tertiary)" }
                    : undefined
                }
                className="text-lg rounded-full px-3 hover:bg-(--main-tertiary) aspect-square font-medium"
                onClick={() => navToPage(idx + 1)}
                key={idx}
              >
                {idx + 1}
              </button>
            );
          })
      ) : (
        <>
          {Array(totalPages)
            .fill("n")
            .slice(sliceStart, sliceEnd)
            .map((_, idx) => {
              return (
                <button
                  style={
                    page === idx
                      ? { background: "var(--main-tertiary)" }
                      : undefined
                  }
                  className="text-lg rounded-full px-3 hover:bg-(--main-tertiary) aspect-square font-medium"
                  onClick={() => navToPage(idx + 1)}
                  key={idx}
                >
                  {idx + 1}
                </button>
              );
            })}
          <span>...</span>
          <button
            style={
              page === totalPages
                ? { background: "var(--main-tertiary)" }
                : undefined
            }
            className="text-lg rounded-full px-3 hover:bg-(--main-tertiary) aspect-square font-medium"
            onClick={() => navToPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button disabled={page === totalPages} className="w-8 h-8 rounded disabled:opacity-65 bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
        &gt;
      </button>
    </div>
  );
};

export default QuizPagination;
