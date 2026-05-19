import { useAppSelector } from "@/store";
import { defaultUserState, setUserState } from "@/store/slices/userSlice";
import { UserResponse } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../utils/api";


export const useAuthStateChange = () => {
  const { isLoggedIn, userId, idToken } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: [userId],
    queryFn: async () => {
      const user = await authApi(idToken).get<UserResponse>("/auth");
      return user.data;
    },
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

  return {...query, handleChange}
};

export const useIdTokenChange = ()=>{
    const {mutateAsync} = useMutation({
        mutationFn: async(token: string)=>{
            await authApi(token).post("/auth/token")
        },
    })
}