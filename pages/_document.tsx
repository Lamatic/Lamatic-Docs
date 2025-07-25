import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                let urlParams = new URLSearchParams(window.location.search);
                if (window.location.pathname.includes('embeds') || urlParams.get('embed') === 'true') {
                  
                  // Function to hide elements
                  function hideElements() {
                    var elements = document.querySelectorAll('.lamatic-docs-footer, .nextra-nav-container, .nextra-sidebar-container, .nextra-toc, .section.red, .visual-holder.footer, .nextra-breadcrumb, #docs-feedback, .nx-mb-8.nx-flex.nx-items-center.nx-border-t.nx-pt-8');
                    elements.forEach(function(element) {
                      element.style.display = 'none';
                    });
                  }
                  
                  // Hide elements immediately
                  hideElements();
                  
                  // Set up MutationObserver to watch for dynamically added content
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'childList') {
                        hideElements();
                      }
                    });
                  });
                  
                  // Start observing the document body for changes
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true
                  });
                  
                  // Optionally, expand main content
                  var mainContent = document.querySelector('main');
                  if (mainContent) {
                    mainContent.style.margin = '0 auto';
                    mainContent.style.width = '100vw';
                    mainContent.style.maxWidth = '100vw';
                    mainContent.style.minHeight = '100vh';
                    mainContent.style.boxShadow = 'none';
                    mainContent.style.background = '#fff';
                  }
                }
              });
            `,
          }}
        />
      </body>
    </Html>
  );
} 