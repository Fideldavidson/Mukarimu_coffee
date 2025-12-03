<script>
  // Mobile scrolling fix
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying mobile scroll fix...');
    
    // 1. Fix body scrolling
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    document.body.style.width = '100%';
    document.body.style.position = 'relative';
    
    // 2. Fix HTML element
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';
    
    // 3. Force disable horizontal scrolling
    window.addEventListener('scroll', function() {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.pageYOffset || document.documentElement.scrollTop);
      }
    });
    
    // 4. Touch device specific fixes
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      // iOS specific fixes
      document.body.style.webkitOverflowScrolling = 'touch';
      document.documentElement.style.webkitOverflowScrolling = 'touch';
      
      // Fix for iOS Safari viewport issues
      document.body.style.minHeight = (window.innerHeight + 1) + 'px';
      
      // Prevent zooming on double-tap
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    }
    
    // 5. Fix for any container elements that might be causing overflow
    setTimeout(function() {
      const containers = document.querySelectorAll('.container, .container-wrap, .row, section');
      containers.forEach(function(container) {
        container.style.overflowX = 'hidden';
        container.style.maxWidth = '100%';
      });
      
      // Force a reflow to trigger proper rendering
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    }, 100);
    
    // 6. Continuous check for horizontal scroll (in case elements are added dynamically)
    setInterval(function() {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.pageYOffset || document.documentElement.scrollTop);
      }
    }, 100);
    
    console.log('Mobile scroll fix applied successfully');
  });
  
  // Also fix on window load (in case images or other elements load late)
  window.addEventListener('load', function() {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    
    // Final check for any horizontal scroll
    if (window.scrollX !== 0) {
      window.scrollTo(0, 0);
    }
  });
</script>