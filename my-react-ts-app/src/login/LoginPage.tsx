import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../authContext/authContext";
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    TextField,
    Alert,
    CircularProgress,
    Divider,
    Stack,
    Link,
    Grid,
    Fade,
    IconButton,
    InputAdornment,
} from "@mui/material";
import {
    CheckCircle,
    Cancel,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { flexDirection, minHeight, padding } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import "../login/loginPage.css"
import GoogleIcon from "@mui/icons-material/Google";
// Password strength validation interface
interface PasswordValidation {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}
// Password strength calculator
const validatePasswordStrength = (password: string): PasswordValidation => {
    return {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    };
};


const LoginPage: React.FC = () => {
    const [active, setActive] = useState(false);
    const [justSignedUp, setJustSignedUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<
        "google" | "facebook" | null
    >(null);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [isLinkSent, setIsLinkSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [resetError, setResetError] = useState<string | null>(null);
    const {
        signInWithEmailPassword,
        signInWithGoogle,
        sendPasswordReset,
        currentUser,
        loading: authLoading,
        signUpWithEmailPassword,
        clearAuthState,
    } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [isSignUp, setIsSignUp] = useState(false);
    const [pageReady, setPageReady] = useState(false);

    // Password visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Password validation state
    const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    // Update password validation when password changes
    useEffect(() => {
        if (isSignUp) {
            setPasswordValidation(validatePasswordStrength(password));
            setJustSignedUp(true);
            setSuccess("Account created! Please sign in.");
        }
    }, [password, isSignUp]);

    // Clean up authentication status and forms when the component mounts
    useEffect(() => {
        // Only clear form data, not auth state
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
        setSuccess(null);

        // Quick page ready state
        const timer = setTimeout(() => {
            setPageReady(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (currentUser) {
            navigate("/app", { replace: true });
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (!currentUser && pageReady) {
            clearAuthState();
        }
    }, [clearAuthState, currentUser, pageReady]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isLinkSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsLinkSent(false);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLinkSent, timer]);

    // Clear messages when switching between sign in/up
    useEffect(() => {
        setError(null);
        setSuccess(null);
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [isSignUp]);

    const validateForm = (): boolean => {
        if (!email || !password) {
            setError("Please fill in all required fields.");
            return false;
        }

        if (!email.includes('@')) {
            setError("Please enter a valid email address.");
            return false;
        }

        // Enhanced password validation for sign up
        if (isSignUp) {
            const validation = validatePasswordStrength(password);

            if (!validation.minLength) {
                setError("Password must be at least 8 characters long.");
                return false;
            }

            if (!validation.hasUpperCase) {
                setError("Password must contain at least one uppercase letter.");
                return false;
            }

            if (!validation.hasLowerCase) {
                setError("Password must contain at least one lowercase letter.");
                return false;
            }

            if (!validation.hasNumber) {
                setError("Password must contain at least one number.");
                return false;
            }

            if (!validation.hasSpecialChar) {
                setError("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;':\",./<>?~`).");
                return false;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return false;
            }
        }

        return true;
    };

    const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            if (isSignUp) {
                await signUpWithEmailPassword(email, password, "client");
                setSuccess("Account created successfully! You can now sign in.");
            } else {
                await signInWithEmailPassword(email, password);
            }
        } catch (err: any) {
            console.error("Auth failed:", err);

            if (isSignUp) {
                // Sign up specific errors
                if (err.code === "auth/email-already-in-use") {
                    setError("An account with this email already exists. Please sign in instead.");
                } else if (err.code === "auth/weak-password") {
                    setError("Password is too weak. Please choose a stronger password.");
                } else if (err.code === "auth/invalid-email") {
                    setError("Please enter a valid email address.");
                } else {
                    setError("Failed to create account. Please try again.");
                }
            } else {
                // Sign in specific errors
                if (err.code === "auth/user-not-found") {
                    setError("No account found with this email. Please sign up first.");
                } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                    setError("Invalid email or password.");
                } else if (err.code === "auth/too-many-requests") {
                    setError("Too many failed attempts. Please try again later.");
                } else if (err.code === "auth/user-disabled") {
                    setError("This account has been disabled. Please contact support.");
                } else {
                    setError("Failed to sign in. Please try again.");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setSuccess(null);
        setSocialLoading("google");
        try {
            await signInWithGoogle();
            // Navigation handled by auth state change
        } catch (err: any) {
            console.error("Google Sign-in failed:", err);
            if (err.code === "auth/popup-blocked") {
                setError("Popup was blocked. Please allow popups and try again.");
            } else if (err.code === "auth/popup-closed-by-user") {
                setError("Sign-in was cancelled. Please try again.");
            } else {
                setError("Failed to sign in with Google. Please try again.");
            }
        } finally {
            setSocialLoading(null);
        }
    };

    const handleGitHubSignIn = async () => {
        setError(null);
        setSuccess(null);
        try {
            // Redirect handled by PrivateRoute
        } catch (err: any) {
            console.error("GitHub Sign-in failed:", err);
            if (err.code === "auth/popup-blocked") {
                setError("Popup was blocked. Please allow popups and try again.");
            } else if (err.code === "auth/popup-closed-by-user") {
                setError("Sign-in was cancelled. Please try again.");
            } else {
                setError("Failed to sign in with GitHub. Please try again.");
            }
        } finally {
            setSocialLoading(null);
        }
    };

    const handleOpenResetModal = () => {
        setResetEmail(email);
        setResetError(null);
        setIsLinkSent(false);
        setTimer(0);
        setResetModalOpen(true);
    };

    const handleCloseResetModal = () => {
        setResetModalOpen(false);
    };

    const handleResetPassword = async () => {
        if (!resetEmail) {
            setResetError("Please enter your email address.");
            return;
        }
        setResetError(null);
        setLoading(true);
        try {
            await sendPasswordReset(resetEmail);
            setIsLinkSent(true);
            setTimer(30);
        } catch (err: any) {
            console.error("Password Reset failed:", err);
            if (err.code === "auth/user-not-found") {
                setResetError("No account found with this email address.");
            } else if (err.code === "auth/invalid-email") {
                setResetError("Please enter a valid email address.");
            } else {
                setResetError("Failed to send password reset email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleModeSwitch = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
        setError(null);
        setSuccess(null);
        // Clear form when switching modes
        setPassword("");
        setConfirmPassword("");
    };

    if (authLoading && !pageReady) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "background.default",
                }}
            >
            </Box>
        );
    }

    if (currentUser && !authLoading && !justSignedUp) {
        return <Navigate to="/app" replace />;
    }
    return (
        <div id="app">
            <div id="container" className={`container ${active ? "active" : ""}`}>
                <div className="form-container login">
                    <form onSubmit={handleEmailSubmit}>
                        <h2>Sign In</h2>
                        <TextField
                            className="user-infor"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading || !!socialLoading}
                            sx={{
                                '& input:-webkit-autofill': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                                    caretColor: theme.palette.text.primary,
                                    transition: 'background-color 5000s ease-in-out 0s',
                                },
                                '& input:-webkit-autofill:hover': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                                '& input:-webkit-autofill:focus': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                                '& input:-webkit-autofill:active': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                            }}
                        />
                        <TextField
                            className="user-infor"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete={isSignUp ? "new-password" : "current-password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading || !!socialLoading}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                '& input:-webkit-autofill': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                                    caretColor: theme.palette.text.primary,
                                    transition: 'background-color 5000s ease-in-out 0s',
                                },
                                '& input:-webkit-autofill:hover': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                                '& input:-webkit-autofill:focus': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                                '& input:-webkit-autofill:active': {
                                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                    boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                                },
                            }}
                        />

                        <div className="check">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot Password</a>
                        </div>
                        <div className="button">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading || !!socialLoading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </div>

                        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<GoogleIcon />}
                                onClick={handleGoogleSignIn}
                                disabled={loading || !!socialLoading}
                                sx={{ justifyContent: "center" }}
                            >
                                {socialLoading === "google" ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    `Sign ${isSignUp ? "up" : "in"} with Google`
                                )}
                            </Button>
                        </Stack>
                    </form>
                </div>


                <div className="form-container register">
                    <form onSubmit={handleEmailSubmit}>
                        <h2>Sign Up</h2>
                        <div className="input">
                            <TextField
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <i className="fa fa-envelope"></i>
                        </div>
                        <div className="input">
                            <TextField
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <i className="fa fa-lock"></i>
                        </div>
                        <div className="password">
                            <TextField
                                type="text"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <i className="fa fa-lock"></i>
                        </div>
                        <div className="button">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading || !!socialLoading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>

                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setActive(false);     // show login panel
                                    setIsSignUp(false);   // logic = sign in
                                }}
                                className="hidden"
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="toggle-panel toggle-right">
                            <h1>Welcome!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setActive(true);      // show register panel
                                    setIsSignUp(true);    // logic = sign up
                                }}
                                className="hidden"
                            >
                                Sign Up
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;