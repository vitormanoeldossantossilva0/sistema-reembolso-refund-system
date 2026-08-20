import { Routes, Route } from "react-router";

import { AuthLayout } from "../components/AuthLayout";
import { SignIn } from "../pages/SingnIn";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />


        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}
