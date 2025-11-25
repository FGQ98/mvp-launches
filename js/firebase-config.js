// ============================================
// MVP LAUNCHES - Firebase Configuration
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeNjaaGVEgv6hNSeKrEBqMA51Vy63cmns",
  authDomain: "mvp-launches.firebaseapp.com",
  projectId: "mvp-launches",
  storageBucket: "mvp-launches.firebasestorage.app",
  messagingSenderId: "730938007882",
  appId: "1:730938007882:web:649d7b59794e07ff4e61b3",
  measurementId: "G-ZBJM2BT2BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// ============================================
// FIRESTORE FUNCTIONS
// ============================================

/**
 * Submit application form to Firestore
 * @param {Object} formData - Form data object
 * @returns {Promise} - Document reference
 */
async function submitApplication(formData) {
  try {
    const docRef = await addDoc(collection(db, "aplicaciones"), {
      ...formData,
      created_at: serverTimestamp(),
      status: "nuevo"
    });
    console.log("Aplicación enviada con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al enviar aplicación:", error);
    return { success: false, error: error.message };
  }
}

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * Register new user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error en registro:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Logout user
 * @returns {Promise}
 */
async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error en logout:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Listen to auth state changes
 * @param {Function} callback 
 */
function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}

// Export functions
export { 
  db, 
  auth, 
  analytics,
  submitApplication, 
  registerUser, 
  loginUser, 
  logoutUser, 
  onAuthChange 
};
