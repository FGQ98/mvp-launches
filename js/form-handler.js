// ============================================
// MVP LAUNCHES - Form Handler
// ============================================

import { submitApplication } from './firebase-config.js';

/**
 * Initialize form handling
 * @param {string} formId - ID of the form element
 */
function initForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Gather form data
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Submit to Firebase
    const result = await submitApplication(data);
    
    if (result.success) {
      // Show success message
      showMessage(form, 'success', '¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto.');
      form.reset();
    } else {
      // Show error message
      showMessage(form, 'error', 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}

/**
 * Show message after form submission
 * @param {HTMLElement} form 
 * @param {string} type - 'success' or 'error'
 * @param {string} message 
 */
function showMessage(form, type, message) {
  // Remove existing message if any
  const existingMsg = form.querySelector('.form__message');
  if (existingMsg) existingMsg.remove();
  
  // Create message element
  const msgEl = document.createElement('div');
  msgEl.className = `form__message form__message--${type}`;
  msgEl.textContent = message;
  
  // Style the message
  msgEl.style.cssText = `
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    text-align: center;
    font-weight: 500;
    ${type === 'success' 
      ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
      : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
  `;
  
  // Insert after submit button
  form.appendChild(msgEl);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    msgEl.remove();
  }, 5000);
}

// Export
export { initForm };
