// Note: Remove the Toaster import if not needed on line 9

// ...existing code...

// For the loadingToast variable on line 277, either:
// 1. Remove it if not needed:
// toast.loading("Generating your email..."); // Changed to not assign to a variable

// OR

// 2. If you need to dismiss the toast later:
// const loadingToastId = toast.loading("Generating your email...");
// ...
// toast.dismiss(loadingToastId); // Use this where needed
