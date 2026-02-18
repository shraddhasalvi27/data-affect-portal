"use client";

import { useState } from "react";
import { connectWithGit } from "@/src/lib/axios";
export default function LandingPage() {
    const [repoUrl, setRepoUrl] = useState("");

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
                    {/* CTA Buttons */}
                    <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <button
                            onClick={connectWithGit}
                            className="group flex cursor-pointer items-center gap-3 rounded-xl bg-foreground px-6 py-3.5 text-base font-semibold text-background transition-all hover:opacity-90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Connect with GitHub
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="transition-transform group-hover:translate-x-0.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

          
            <section className="relative border-t border-border py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Schema intelligence,{" "}
                            <span className="text-muted">automated.</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-muted">
                            Stop guessing. See every schema change, its ripple effects, and
                            potential breaking changes — all in one view.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                       
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 20V10" />
                                    <path d="M18 20V4" />
                                    <path d="M6 20v-4" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Change Detection</h3>
                            <p className="text-sm leading-relaxed text-muted">
                                Automatically detect column additions, deletions, type changes,
                                and constraint modifications across all your schemas.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="18" cy="18" r="3" />
                                    <circle cx="6" cy="6" r="3" />
                                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                                    <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Diff Visualization
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                See side-by-side diffs of your schema versions with clear,
                                color-coded highlights showing exactly what changed.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Impact Analysis</h3>
                            <p className="text-sm leading-relaxed text-muted">
                                Understand which downstream schemas, queries, and services are
                                affected by a change — before you deploy.
                            </p>
                        </div>

                       
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">GitHub Native</h3>
                            <p className="text-sm leading-relaxed text-muted">
                                Connect your repos, track migration files, and get impact
                                reports right in your pull requests.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Breaking Change Alerts
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                Get warned about potentially breaking changes before they
                                cascade through your data pipeline.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:bg-card-hover">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0070f3"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 3v18h18" />
                                    <path d="m19 9-5 5-4-4-3 3" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Version History</h3>
                            <p className="text-sm leading-relaxed text-muted">
                                Full timeline of every schema version with the ability to
                                compare any two points and see the evolution.
                            </p>
                        </div>
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