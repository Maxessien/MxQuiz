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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi, regApi } from "../utils/api";

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
      await authApi(token).post("/auth/token");
      const id = user.uid;
      return { token, id };
    } else {
      dispatch(setUserState(defaultUserState));
      await regApi.delete("/auth/token", { withCredentials: true });
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
