import { AuthFormType, CreateQuizForm, Fields, FormFields, GenQuizRes } from "@/types/types";
import { RegisterOptions } from "react-hook-form";
import { authApi } from "./api";


export const SESSION_COOKIE_NAME = "user_session_cookie";

export const formatTime = (seconds?: number) => {
  if (seconds === undefined) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const authFieldsRegisters: Record<Fields, Record<AuthFormType, RegisterOptions<FormFields, Fields>>> = {
  email: {login: {required: "Email is required"}, register: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email",
    },
  }},

  name: {login: {required: "Name is required"}, register: {
    required: "Name is required",
    minLength: {value: 2, message: "Name cannot be less than 2 characters"},
    maxLength: {value: 35, message: "Name cannot be greater than 35 characters"},
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message: "Name can only contain letters, spaces, apostrophes, and hyphens"
    }
  }},

  password: {login: {required: "Password is required"}, register: {
    required: "Password is required",
    minLength: {value: 8, message: "Password must be at least 8 characters long"},
    validate: (val) => {
      const value = String(val);
      if (!value.match(/[A-Z]/)) return "Password must contain an uppercase letter";
      if (!value.match(/[a-z]/)) return "Password must contain a lowercase letter";
      if (!value.match(/[0-9]/)) return "Password must contain a number";
      if (!value.match(/[^a-zA-Z0-9]/)) return "Password must contain a special character";

      return true;
    }
  }}
};

export const submitCreateQuizForm = async({optCount, pdf, qCount, qType}: CreateQuizForm, token: string)=>{
  console.log({optCount, pdf, qCount, qType})
  throw new Error("Test break")
  if (!pdf || pdf.length === 0) {
    throw new Error("PDF file is required");
  }
  
  const formData = new FormData()
  formData.append("qType", qType)
  formData.append("qCount", qCount.toString())
  formData.append("optCount", optCount.toString())
  formData.append("pdf", pdf[0])

  const res = await authApi(token).post<GenQuizRes>("/quiz/ai", formData)
  return res.data
}