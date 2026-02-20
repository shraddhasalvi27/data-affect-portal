"use client";
import { useEffect, useRef, useState } from "react";
import { connectWithGit } from "@/src/lib/axios";
import { getUserInfo, userLogout } from "@/src/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";
interface User {
    id: string;
    username: string;
    avatar: string;
}
export default function LandingPage() {
    const [repoUrl, setRepoUrl] = useState("");
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleImportRepo = () => {
        if (!repoUrl.trim()) return;
        // TODO: Implement repo import
        console.log("Import repo:", repoUrl);
    };
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
    }
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
            <div>
                
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