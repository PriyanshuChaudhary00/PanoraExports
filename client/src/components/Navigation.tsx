import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/rbac';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [location, setLocation] = useLocation();
    const { user, logout } = useAuth();
    const userIsAdmin = isAdmin(user);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBD4]/80 dark:bg-[#38240D]/80 backdrop-blur-lg border-b border-[#C05800]/20">
            <div className="max-w-[1600px] mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
                {/* Logo - Left */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-[#713600] dark:bg-[#FDFBD4] rounded-sm flex items-center justify-center">
                        <span className="text-white dark:text-[#38240D] font-bold text-xs">PE</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-[#38240D] dark:text-[#FDFBD4]">PANORA</span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/products"
                        className={`text-sm transition-colors ${location === '/products'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/categories"
                        className={`text-sm transition-colors ${location === '/categories'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Categories
                    </Link>
                    <Link
                        href="/verification"
                        className={`text-sm transition-colors ${location === '/verification'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Verification
                    </Link>
                    <Link
                        href="/faq"
                        className={`text-sm transition-colors ${location === '/faq'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/contact"
                        className={`text-sm transition-colors ${location === '/contact'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/about"
                        className={`text-sm transition-colors ${location === '/about'
                            ? 'text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        About
                    </Link>
                    {/* Admin Link - Show only for admin users */}
                    {userIsAdmin && (
                        <Link
                            href="/admin"
                            className={`flex items-center gap-1.5 text-sm transition-colors ${location === '/admin'
                                ? 'text-purple-600 dark:text-purple-400 font-medium'
                                : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                                }`}
                        >
                            Admin
                            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-bold rounded">
                                ⚡
                            </span>
                        </Link>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Language/Region */}
                    <button className="hidden md:block text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        ENG
                    </button>

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hidden md:flex w-9 h-9 items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    )}

                    {/* User Menu or Sign In */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                <span className="text-sm text-slate-900 dark:text-white">{user.name}</span>
                                {user.verification_status === 'VERIFIED' && (
                                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓</span>
                                )}
                            </div>
                            <button
                                onClick={async () => {
                                    await logout();
                                    setLocation('/');
                                }}
                                className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="hidden md:block text-sm font-medium text-[#38240D] dark:text-[#FDFBD4] border-b-2 border-[#C05800] pb-0.5 hover:opacity-70 transition-opacity"
                        >
                            SIGN IN
                        </Link>
                    )}

                    {/* Mobile Menu */}
                    <button
                        className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-900 dark:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex flex-col gap-4 p-8">
                        <Link
                            href="/products"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/categories"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/verification"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Verification
                        </Link>
                        <Link
                            href="/faq"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            About
                        </Link>
                        {userIsAdmin && (
                            <Link
                                href="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
                            >
                                Admin Dashboard
                                <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-bold rounded">
                                    ⚡
                                </span>
                            </Link>
                        )}

                        {user ? (
                            <>
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                        <span className="text-sm text-slate-900 dark:text-white font-medium">{user.name}</span>
                                        {user.verification_status === 'VERIFIED' && (
                                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            setIsMenuOpen(false);
                                            setLocation('/');
                                        }}
                                        className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-sm font-medium text-slate-900 dark:text-white mt-4 inline-block"
                            >
                                SIGN IN →
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
