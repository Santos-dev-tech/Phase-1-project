document.addEventListener('DOMContentLoaded', function() {
   
    if (!localStorage.getItem('players')) {
      localStorage.setItem('players', JSON.stringify([]));
    }
    if (!localStorage.getItem('scouts')) {
      localStorage.setItem('scouts', JSON.stringify([]));
    }
  
   
    document.querySelectorAll('.menu-content a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
        
        document.querySelectorAll('.section').forEach(section => {
          section.classList.remove('active');
        });
        targetSection.classList.add('active');
      });
    });
  
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  
   
    const playerForm = document.getElementById('player-form');
    if (playerForm) {
      playerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const playerData = {
          name: document.getElementById('player-name').value,
          age: document.getElementById('player-age').value,
          position: document.getElementById('player-position').value,
          location: document.getElementById('player-location').value,
          bio: document.getElementById('player-bio').value,
          highlights: document.getElementById('player-highlights').files[0] ? 
                     document.getElementById('player-highlights').files[0].name : 'No file uploaded',
          timestamp: new Date().toISOString()
        };
  
        const players = JSON.parse(localStorage.getItem('players'));
        players.push(playerData);
        localStorage.setItem('players', JSON.stringify(players));
  
        showNotification('Player profile created successfully!', 'success');
        this.reset();
      });
    }
  
  
    const scoutForm = document.getElementById('scout-form');
    if (scoutForm) {
      scoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const scoutData = {
          name: document.getElementById('scout-name').value,
          location: document.getElementById('scout-location').value,
          preferences: document.getElementById('scout-preferences').value,
          timestamp: new Date().toISOString()
        };
  
        const scouts = JSON.parse(localStorage.getItem('scouts'));
        scouts.push(scoutData);
        localStorage.setItem('scouts', JSON.stringify(scouts));
  
        showNotification('Scout profile created successfully!', 'success');
        this.reset();
      });
    }
  
   
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactData = {
          name: document.getElementById('contact-name').value,
          email: document.getElementById('contact-email').value,
          message: document.getElementById('contact-message').value,
          timestamp: new Date().toISOString()
        };
  
      
        console.log('Contact form submitted:', contactData);
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
      });
    }
  
   
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        const searchType = document.getElementById('search-type').value;
        const searchResults = document.getElementById('search-results');
        
        const name = document.getElementById('search-name').value.toLowerCase();
        const age = document.getElementById('search-age').value;
        const position = document.getElementById('search-position').value.toLowerCase();
        const location = document.getElementById('search-location').value.toLowerCase();
  
        if (searchType === 'player') {
          const players = JSON.parse(localStorage.getItem('players'));
          const filteredPlayers = players.filter(player => {
            return (name === '' || player.name.toLowerCase().includes(name)) &&
                   (age === '' || player.age === age) &&
                   (position === '' || player.position.toLowerCase().includes(position)) &&
                   (location === '' || player.location.toLowerCase().includes(location));
          });
  
          displayResults(filteredPlayers, 'player');
        } else {
          const scouts = JSON.parse(localStorage.getItem('scouts'));
          const filteredScouts = scouts.filter(scout => {
            return (name === '' || scout.name.toLowerCase().includes(name)) &&
                   (location === '' || scout.location.toLowerCase().includes(location));
          });
  
          displayResults(filteredScouts, 'scout');
        }
      });
    }
  

    function displayResults(items, type) {
      const searchResults = document.getElementById('search-results');
      
      if (items.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No results found. Try different search criteria.</p>';
        return;
      }
  
      let html = '';
      items.forEach(item => {
        if (type === 'player') {
          html += `
            <div class="result-card">
              <h3>${item.name}</h3>
              <p><strong>Age:</strong> ${item.age}</p>
              <p><strong>Position:</strong> ${item.position}</p>
              <p><strong>Location:</strong> ${item.location}</p>
              ${item.bio ? `<p><strong>Bio:</strong> ${item.bio}</p>` : ''}
              ${item.highlights !== 'No file uploaded' ? `<p><strong>Highlights:</strong> ${item.highlights}</p>` : ''}
            </div>
          `;
        } else {
          html += `
            <div class="result-card">
              <h3>${item.name}</h3>
              <p><strong>Location:</strong> ${item.location}</p>
              ${item.preferences ? `<p><strong>Preferences:</strong> ${item.preferences}</p>` : ''}
            </div>
          `;
        }
      });
  
      searchResults.innerHTML = html;
    }
  

    function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 3000);
    }
  
    
    document.querySelector('#home').classList.add('active');
  });