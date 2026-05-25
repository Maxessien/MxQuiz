export const firebaseErrorMessages: Record<string, string> = {
  // Authentication Errors
  'auth/email-already-in-use': 'This email address is already in use by another account.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-disabled': 'This user account has been disabled.',
  'auth/user-not-found': 'No user found with this email address.',
  'auth/wrong-password': 'The credentials provided are invalid.',
  'auth/weak-password': 'The password must be at least 6 characters long.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/invalid-credential': 'The credentials provided are invalid.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later.',
  'auth/requires-recent-login': 'This operation is sensitive and requires recent authentication. Please log in again.',
  
  // Storage & General Errors
  'storage/unauthorized': 'User does not have permission to access the object.',
  'storage/object-not-found': 'File does not exist.',
  'permission-denied': 'You do not have permission to execute this operation.',
};

export const getFirebaseErrorMessage = (error: { code?: string; message?: string } | unknown): string => {
  const defaultMessage = 'An unexpected error occurred. Please try again later.';
  if (!error || typeof error !== 'object') return defaultMessage;
  
  const err = error as { code?: string; message?: string };
  if (err.code && firebaseErrorMessages[err.code]) {
    return firebaseErrorMessages[err.code];
  }
  return err.message || defaultMessage;
};
