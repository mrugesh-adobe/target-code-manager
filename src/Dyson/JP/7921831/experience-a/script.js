// Adobe Target Experience Script
// Brand: Dyson | Region: JP | Activity: 7921831 | Experience: A

(function() {
  'use strict';

  // Wait for DOM to be ready
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  // Main experience logic
  function initExperience() {
    console.log('Dyson JP Activity 7921831 Experience A - Initialized');

    // Example: Add custom behavior
    const targetElement = document.querySelector('.target-element');
    if (targetElement) {
      targetElement.classList.add('experience-a-active');
      
      // Example: Track custom event
      if (typeof adobe !== 'undefined' && adobe.target) {
        adobe.target.trackEvent({
          mbox: 'experience-a-loaded',
          params: {
            brand: 'Dyson',
            region: 'JP',
            activity: '7921831',
            experience: 'A'
          }
        });
      }
    }

    // Example: Custom click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', function(event) {
        // Custom tracking or behavior
        console.log('CTA clicked - Experience A');
        
        // Track conversion if needed
        if (typeof adobe !== 'undefined' && adobe.target) {
          adobe.target.trackEvent({
            mbox: 'cta-clicked',
            params: {
              experience: 'A'
            }
          });
        }
      });
    }
  }

  // Initialize when DOM is ready
  domReady(initExperience);

})();
