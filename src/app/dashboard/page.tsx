"use client";

import { useState } from "react";
import { connectWithGit } from "@/src/lib/axios";
import { getUserInfo } from "@/src/lib/axios";
export default function LandingPage() {
    const [repoUrl, setRepoUrl] = useState("");
    const [avatar,setAvatar] = useState("");
    const getInfo = async()=>{
        const res = await getUserInfo();
        console.log(res);
    }
    const handleImportRepo = () => {
        if (!repoUrl.trim()) return;
        // TODO: Implement repo import
        console.log("Import repo:", repoUrl);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 3v18" />
                                <path d="M5 12h14" />
                                <path d="m5 7 3 5-3 5" />
                                <path d="m19 7-3 5 3 5" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            DataAffect
                        </span>
                    </div>
                    <button
                        onClick={connectWithGit}
                        className="cursor-pointer rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                        Connect Github
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
                {/* Background gradient glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />

                <div className="relative z-10 w-full text-center">
                    {/* Badge */}
                    <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Now tracking schema changes in real-time
                    </div>



                    {/* Repo Import */}
                    <div className="animate-fade-in-up-delay-3 mt-8 w-full">
                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 transition-colors focus-within:border-accent/50">
                            <div className="flex items-center pl-3 text-muted">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleImportRepo()}
                                placeholder="https://github.com/you/your-repo"
                                className="min-w-0 w-full mx-6 flex-1 bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted/60"
                            />
                            <button
                                onClick={handleImportRepo}
                                disabled={!repoUrl.trim()}
                                className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Import
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-muted/60">
                            Paste a GitHub repository URL to start tracking schema changes
                            instantly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-6">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <p className="text-sm text-muted">
                        © 2026 DataAffect. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                            Docs
                        </a>
                        <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}