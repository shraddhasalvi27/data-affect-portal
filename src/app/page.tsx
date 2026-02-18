"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://127.0.0.1:5000/users/me", {
          withCredentials: true,
        });

        router.replace("/dashboard");
      } catch (error) {
        router.replace("/landing");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground" />
        <p className="text-sm text-foreground/60">Loading...</p>
      </div>
    </div>
  );
}
