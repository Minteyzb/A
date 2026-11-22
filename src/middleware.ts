import { clerkMiddleware } from "@clerk/nextjs/server";

// Pages stay public; admin pages and actions check the user themselves.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf|mp4|webm)).*)",
    "/(api|trpc)(.*)",
  ],
};
