import { useAppSelector } from "@/store";
import { defaultUserState, setUserState } from "@/store/slices/userSlice";
import { UserResponse } from "@/types/types";
import {
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { User } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAuthCookie, setAuthCookie } from "../actions/auth";
import { authApi } from "../utils/api";

export const useAuthStateChange = (
  queryOptions?: UndefinedInitialDataOptions<
    UserResponse,
    Error,
    UserResponse,
    string[]
  >,
  mutationOptions?: UseMutationOptions<{
    token: string;
    id: string;
}, Error, User | null, unknown>
) => {
  const { isLoggedIn, userId, idToken } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const router = useRouter()
  const pathname = usePathname()

  const query = useQuery({
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 3,
    ...queryOptions,
    queryKey: [userId],
    queryFn: async () => {
      const user = await authApi(idToken).get<UserResponse>("/auth");
      return user.data;
    },
  });

  const handleChange = async (user: User | null) => {
    if (user) {
      const token = await user.getIdToken();
      await setAuthCookie(token);
      const id = user.uid;
      return { token, id };
    } else {
      dispatch(setUserState(defaultUserState));
      await removeAuthCookie();
      throw new Error("User doesn't exist")
    }
  };

  const mutation = useMutation({
    ...mutationOptions,
    mutationFn: handleChange,
    onSuccess: ({ token, id }) => {
      dispatch(
        setUserState({
          avatarUrl: "",
          email: "",
          idToken: token,
          isLoggedIn: true,
          name: "",
          role: "user",
          userId: id,
        }),
      );
      if (pathname==="/") router.push(`/${id}`)
    },
    onError: ()=>{
      dispatch(
        setUserState({
          avatarUrl: "",
          email: "",
          idToken: "",
          isLoggedIn: false,
          name: "",
          role: "user",
          userId: "",
        }),
      );
    }
  });

  useEffect(() => {
    if (query.data) {
      const { avatar_url, email, name, role, user_id } = query.data;
      dispatch(
        setUserState({
          avatarUrl: avatar_url,
          email,
          name,
          role,
          userId: user_id,
          idToken: idToken,
          isLoggedIn: isLoggedIn,
        }),
      );
    }
  }, [
    query.data,
    query.dataUpdatedAt,
    query.errorUpdatedAt,
    dispatch,
    idToken,
    isLoggedIn,
  ]);

  return { query, mutation };
};
