import React from 'react';
import { COMPANY } from '../data/siteData';

export default function WhatsAppButton() {
  const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=Hello+Veer+Security+Service%2C+I+would+like+to+know+more+about+your+professional+security+services.`;
  return (
    <div className="floating-buttons">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-btn-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.44.642 4.73 1.764 6.718L2 30l7.444-1.742A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.836-1.6l-.42-.25-4.42 1.034 1.056-4.31-.274-.44A11.5 11.5 0 1116 27.5zm6.32-8.604c-.346-.174-2.05-1.012-2.368-1.128-.316-.116-.546-.174-.776.174-.23.346-.892 1.128-1.094 1.36-.2.23-.4.26-.748.086-.346-.174-1.46-.538-2.782-1.716-1.028-.916-1.722-2.048-1.924-2.394-.2-.346-.022-.532.15-.706.156-.156.346-.404.52-.608.172-.2.23-.346.346-.578.116-.23.058-.434-.028-.608-.086-.174-.776-1.868-1.062-2.558-.28-.672-.566-.58-.776-.59-.2-.008-.43-.01-.66-.01a1.27 1.27 0 00-.922.434c-.316.346-1.21 1.182-1.21 2.882 0 1.7 1.238 3.342 1.41 3.572.174.23 2.436 3.716 5.902 5.21.824.356 1.468.568 1.97.728.828.264 1.582.226 2.178.138.664-.1 2.05-.838 2.338-1.648.288-.81.288-1.504.2-1.648-.086-.146-.316-.23-.662-.404z"/>
        </svg>
      </a>
      <a
        href={COMPANY.phoneHref}
        className="float-btn float-btn-call"
        aria-label="Call us now"
        title="Call Now"
      >
        📞
      </a>
    </div>
  );
}
