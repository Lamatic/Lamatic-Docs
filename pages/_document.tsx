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
              (function() {
                // Only run on client side to prevent hydration issues
                if (typeof window === 'undefined') return;
                
                document.addEventListener("DOMContentLoaded", function() {
                  let urlParams = new URLSearchParams(window.location.search);
                  
                  // Handle embed pages
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
                  
                  // Handle agentkits routes - hide sidebar and TOC for full layout
                  if (window.location.pathname.includes('/agentkits/')) {
                    function hideAgentKitsSidebar() {
                      var sidebar = document.querySelector('.nextra-sidebar-container');
                      var toc = document.querySelector('.nextra-toc');
                      var allAsides = document.querySelectorAll('aside');
                      var mainDiv = document.querySelector('main > div');
                      var main = document.querySelector('main');
                      
                      if (sidebar) {
                        sidebar.style.display = 'none';
                        sidebar.style.width = '0';
                        sidebar.style.minWidth = '0';
                      }
                      if (toc) {
                        toc.style.display = 'none';
                        toc.style.width = '0';
                        toc.style.minWidth = '0';
                        // Also hide the parent aside if it contains the TOC
                        allAsides.forEach(function(aside) {
                          if (aside.contains(toc)) {
                            aside.style.display = 'none';
                            aside.style.width = '0';
                            aside.style.minWidth = '0';
                          }
                        });
                      }
                      if (mainDiv) {
                        mainDiv.style.gridTemplateColumns = '1fr';
                        mainDiv.style.maxWidth = '100%';
                      }
                      if (main) {
                        main.style.maxWidth = '100%';
                      }
                    }
                    
                    // Hide immediately
                    hideAgentKitsSidebar();
                    
                    // Watch for changes
                    var agentKitsObserver = new MutationObserver(function() {
                      hideAgentKitsSidebar();
                    });
                    
                    agentKitsObserver.observe(document.body, {
                      childList: true,
                      subtree: true
                    });
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
} 