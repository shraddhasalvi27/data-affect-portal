"use client";
import { useEffect, useRef, useState } from "react";
import { connectWithGit, getRepos } from "@/src/lib/axios";
import { getUserInfo, userLogout } from "@/src/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface User {
    id: string;
    username: string;
    avatar: string;
}

interface Repo {
    id: string;
    name: string;
    fullName: string;
    htmlUrl: string;
    defaultBranch: string;
    isPrivate: boolean;
}

export default function LandingPage() {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Repo search state
    const [repos, setRepos] = useState<Repo[]>([]);
    const [repoSearch, setRepoSearch] = useState("");
    const [showRepoSuggestions, setShowRepoSuggestions] = useState(false);
    const [reposLoading, setReposLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Selected repo state
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
    const [pastedRepoUrl, setPastedRepoUrl] = useState("");

    const isGithubUrl = (url: string) =>
        /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url.trim());

    const hasRepoReady = selectedRepo !== null || isGithubUrl(pastedRepoUrl);

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
        repo.fullName.toLowerCase().includes(repoSearch.toLowerCase())
    );

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowRepoSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await userLogout();
            setShowLogoutModal(false);
            toast.success("Logged out successfully");
            window.location.href = "/landing";
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Logout failed";
            toast.error(message);
        }
    };

    const handleRepoSelect = (repo: Repo) => {
        setSelectedRepo(repo);
        setRepoSearch(repo.fullName);
        setPastedRepoUrl("");
        setShowRepoSuggestions(false);
        console.log("Selected repo:", repo);
    };

    const handleClearSelection = () => {
        setSelectedRepo(null);
        setRepoSearch("");
        setPastedRepoUrl("");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepoSearch(value);
        setSelectedRepo(null);
        setPastedRepoUrl(value);
        setShowRepoSuggestions(true);
    };

    // Fetch user info
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await getUserInfo();
                setUserInfo(res.data.user);
            } catch {
                setUserInfo(null);
            } finally {
                setLoading(false);
            }
        };
        getInfo();
    }, []);

    // Fetch repos when user is loaded
    useEffect(() => {
        if (!userInfo) return;
        const fetchRepos = async () => {
            setReposLoading(true);
            try {
                const res = await getRepos();
                setRepos(res.data.repos);
            } catch {
                setRepos([]);
            } finally {
                setReposLoading(false);
            }
        };
        fetchRepos();
    }, [userInfo]);

    useEffect(() => {
        console.log("Updated userInfo:", userInfo);
    }, [userInfo]);

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
                    <div className="flex items-center gap-3">
                        <div
                            className="relative"
                            ref={dropdownRef}
                        >
                            {loading ? (
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground" />
                            ) : userInfo ? (
                                <>
                                    <div
                                        className="flex cursor-pointer items-center gap-3"
                                        onClick={() => setShowDropdown((prev) => !prev)}
                                    >
                                        <Image
                                            src={userInfo.avatar}
                                            alt={userInfo.username}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <span>{userInfo.username}</span>
                                    </div>

                                    {showDropdown && (
                                        <div className="absolute right-0 top-full pt-2">
                                            <div className="w-32 rounded-lg border border-border bg-card shadow-lg">
                                                <button
                                                    onClick={() => {
                                                        setShowDropdown(false);
                                                        setShowLogoutModal(true);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted rounded-lg"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={connectWithGit}
                                    className="cursor-pointer rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                                >
                                    Connect Github
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Repo Search Section */}
            <div className="pt-28 pb-12 px-6">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-2xl font-bold mb-2 animate-fade-in-up">
                        Search Repositories
                    </h1>
                    <p className="text-muted text-sm mb-6 animate-fade-in-up-delay">
                        Find and select a repository or paste a GitHub URL to get started.
                    </p>

                    {/* Search + Compare Container */}
                    <div className="animate-fade-in-up-delay-2 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm">
                        {/* Search Box */}
                        <div className="relative" ref={searchRef}>
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
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
                                <input
                                    id="repo-search"
                                    type="text"
                                    placeholder="Search repositories or paste a GitHub URL..."
                                    value={repoSearch}
                                    onChange={handleSearchChange}
                                    onFocus={() => setShowRepoSuggestions(true)}
                                    className="w-full rounded-xl border border-border bg-background pl-12 pr-10 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
                                />
                                {/* Clear button inside input */}
                                {repoSearch && (
                                    <button
                                        onClick={handleClearSelection}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-border text-muted transition-colors hover:bg-muted hover:text-foreground"
                                        aria-label="Clear selection"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Suggestions Dropdown */}
                            {showRepoSuggestions && !selectedRepo && (
                                <div className="absolute z-40 mt-2 w-full rounded-xl border border-border bg-card shadow-2xl overflow-hidden animate-fade-in-up">
                                    {reposLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-accent" />
                                            <span className="ml-3 text-sm text-muted">Loading repos...</span>
                                        </div>
                                    ) : filteredRepos.length === 0 ? (
                                        <div className="py-8 text-center text-sm text-muted">
                                            No repositories found.
                                        </div>
                                    ) : (
                                        <ul className="max-h-72 overflow-y-auto custom-scrollbar">
                                            {filteredRepos.map((repo) => (
                                                <li key={repo.id}>
                                                    <button
                                                        onClick={() => handleRepoSelect(repo)}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-card-hover"
                                                    >
                                                        {/* Repo icon */}
                                                        <svg
                                                            className="shrink-0 text-muted"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                                        </svg>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium truncate">
                                                                    {repo.fullName}
                                                                </span>
                                                                {repo.isPrivate && (
                                                                    <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                                                                        Private
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-xs text-muted">
                                                                {repo.defaultBranch}
                                                            </span>
                                                        </div>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Selected Repo Chip + Compare Button */}
                        {hasRepoReady && (
                            <div className="mt-4 flex items-center justify-between gap-3 animate-fade-in-up">
                                {/* Selected repo chip */}
                                <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                                    <svg
                                        className="shrink-0 text-accent"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                    <span className="text-foreground font-medium truncate max-w-xs">
                                        {selectedRepo ? selectedRepo.fullName : repoSearch.trim()}
                                    </span>
                                    {selectedRepo?.isPrivate && (
                                        <span className="shrink-0 rounded-full border border-accent/30 px-1.5 py-0.5 text-[10px] text-accent">
                                            Private
                                        </span>
                                    )}
                                    <button
                                        onClick={handleClearSelection}
                                        className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-accent/70 transition-colors hover:bg-accent/20 hover:text-accent"
                                        aria-label="Remove selection"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Compare Button */}
                                <button
                                    className="cursor-pointer group relative flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-transform group-hover:scale-110"
                                    >
                                        <path d="M16 3h5v5" />
                                        <path d="M8 3H3v5" />
                                        <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                                        <path d="m15 9 6-6" />
                                    </svg>
                                    Compare
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-80 rounded-xl bg-card p-6 shadow-xl">
                        <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
                        <p className="mb-6 text-sm text-muted">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="rounded-lg border border-border px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:opacity-90"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}