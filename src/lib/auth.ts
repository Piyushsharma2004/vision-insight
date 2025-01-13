// Define a type for errors
/**
 * @typedef {Object} AuthError
 * @property {boolean} success - Indicates if the operation was successful (always `false` for errors)
 * @property {string} error - Error message describing the issue
 */

// Hardcoded users (In real apps, this would be in a database)
const USERS = {
    'Admin@123': {
      password: '123321',
      role: 'admin',
      name: 'Admin User',
    },
    'UserVi@123': {
      password: 'user123',
      role: 'user',
      name: 'Regular User',
    },
  };
  
  /**
   * Validate user credentials
   * @param {string} username
   * @param {string} password
   * @returns {Object|null} User data or null if invalid
   */
  export function validateCredentials(username, password) {
    const user = USERS[username];
    if (user && user.password === password) {
      // Don't send password back in the response
      const { password: _, ...userData } = user;
      return { ...userData, username };
    }
    return null;
  }
  
  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  export function checkAuth() {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user_session');
      return !!session;
    }
    return false;
  }
  
  /**
   * Get current user data
   * @returns {Object|null}
   */
  export function getCurrentUser() {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user_session');
      return session ? JSON.parse(session) : null;
    }
    return null;
  }
  
  /**
   * Login user
   * @param {string} username
   * @param {string} password
   * @returns {Object|AuthError} Result with success status and user data or error
   */
  export function loginUser(username, password) {
    const userData = validateCredentials(username, password);
  
    if (userData) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_session', JSON.stringify(userData));
      }
      return { success: true, user: userData };
    }
  
    return { success: false, error: 'Invalid credentials' };
  }
  
  /**
   * Logout user
   */
  export function logoutUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
    }
  }
  
  /**
   * Check if user has specific role
   * @param {string} requiredRole
   * @returns {boolean}
   */
  export function hasRole(requiredRole) {
    const user = getCurrentUser();
    return user?.role === requiredRole;
  }
  