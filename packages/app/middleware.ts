import { authMiddleware } from "@clerk/nextjs";
// https://clerk.com/docs/nextjs/middleware
export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};