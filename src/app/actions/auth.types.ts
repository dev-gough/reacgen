export type AuthFormState = {
  status: "idle" | "error" | "exists";
  message?: string;
  errors?: Record<string, string>;
};

export const initialAuthState: AuthFormState = { status: "idle" };
