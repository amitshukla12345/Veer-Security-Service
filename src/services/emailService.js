import { COMPANY } from '../data/siteData';

/**
 * Send an enquiry email via Web3Forms.
 * @param {Object} formData  - All form fields as key/value pairs.
 * @param {string} subject   - The subject of the email.
 * @returns {Promise}        - Resolves on success, rejects on failure.
 */
export async function sendEnquiryEmail(formData, subject = "New Inquiry from Veer Security") {
  const accessKey = COMPANY.web3formsAccessKey;
  
  if (!accessKey) {
    throw new Error('Web3Forms Access Key is missing. Please add it to siteData.js');
  }
  
  // Honeypot spam protection: If botcheck field is filled, silently ignore
  if (formData.botcheck) {
    console.warn("Bot detected: honeypot field was filled.");
    return { success: true, message: "Email sent successfully" }; // fake success
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: subject,
      from_name: formData.name || "Website Visitor",
      ...formData
    }),
  });

  const json = await response.json();
  if (response.status === 200) {
    return json;
  } else {
    throw new Error(json.message || "Failed to send email.");
  }
}
