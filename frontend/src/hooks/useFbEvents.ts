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
        const id = user.uid;

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
      } else {
        dispatch(setUserState(defaultUserState));
        await regApi.delete("/auth/token", { withCredentials: true });
      }
  };

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

  return { ...query, handleChange };
};

export const useIdTokenChange = (mutationOptions?: UseMutationOptions<void, Error, User | null, unknown>) => {
  const mutation = useMutation({
    mutationFn: async (user: User | null) => {
      if (user) {
        const token = await user.getIdToken();
        await authApi(token).post("/auth/token");
      }
    },
    ...mutationOptions
  });

  return {...mutation}

};
