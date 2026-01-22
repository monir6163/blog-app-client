import { cookies } from "next/headers";

export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-session`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );
      const session = await res.json();
      if (!session?.data) {
        return { data: null, message: "No active session", status: false };
      }
      return { data: session, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch session data",
        status: false,
      };
    }
  },
};
