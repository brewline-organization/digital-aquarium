document.addEventListener('DOMContentLoaded', function() {
    const aquarium = document.getElementById('aquarium');
    const addFishBtn = document.getElementById('add-fish');
    const addFoodBtn = document.getElementById('add-food');
    const changeBgBtn = document.getElementById('change-bg');
    const fishCountElement = document.getElementById('count');
    
    let fishCount = 0;
    const backgrounds = [
        '#006994', // Deep blue
        '#1a6a8a', // Medium blue
        '#004d66', // Dark blue
        '#00838f', // Teal
        '#00796b'  // Greenish
    ];
    let currentBgIndex = 0;
    
    // Fish types with colors
    const fishTypes = [
        { color: '#FF5252', class: 'fish-red' },
        { color: '#FFEB3B', class: 'fish-yellow' },
        { color: '#4CAF50', class: 'fish-green' },
        { color: '#9C27B0', class: 'fish-purple' },
        { color: '#00BCD4', class: 'fish-cyan' }
    ];
    
    // Add fish button
    addFishBtn.addEventListener('click', function() {
        for (let i = 0; i < 5; i++) {
            addFish();
        }
    });
    
    // Add food button
    addFoodBtn.addEventListener('click', addFood);
    
    // Change background button
    changeBgBtn.addEventListener('click', function() {
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
        aquarium.style.backgroundColor = backgrounds[currentBgIndex];
    });
    
    function addFish() {
        fishCount++;
        fishCountElement.textContent = fishCount;
        
        const fishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        const fish = document.createElement('div');
        fish.className = `fish ${fishType.class}`;
        
        // Set fish appearance
        fish.style.backgroundColor = fishType.color;
        fish.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        fish.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
        
        // Random position and size
        const size = Math.random() * 20 + 40;
        fish.style.width = `${size}px`;
        fish.style.height = `${size * 0.5}px`;
        
        const startX = Math.random() * (aquarium.offsetWidth - size);
        const startY = Math.random() * (aquarium.offsetHeight - size * 0.5);
        
        fish.style.left = `${startX}px`;
        fish.style.top = `${startY}px`;
        
        aquarium.appendChild(fish);
        
        // Make fish swim
        swim(fish);
        
        // Fish follows food when clicked
        fish.addEventListener('click', function(e) {
            e.stopPropagation();
            const food = document.createElement('div');
            food.className = 'food';
            
            const x = Math.random() * (aquarium.offsetWidth - 10);
            const y = Math.random() * (aquarium.offsetHeight - 10);
            
            food.style.left = `${x}px`;
            food.style.top = `${y}px`;
            
            aquarium.appendChild(food);
            
            // Fish moves toward food
            const fishRect = fish.getBoundingClientRect();
            const aquariumRect = aquarium.getBoundingClientRect();
            
            const fishX = fishRect.left - aquariumRect.left + fishRect.width / 2;
            const fishY = fishRect.top - aquariumRect.top + fishRect.height / 2;
            
            const angle = Math.atan2(y - fishY, x - fishX);
            const distance = Math.sqrt(Math.pow(x - fishX, 2) + Math.pow(y - fishY, 2));
            
            fish.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            
            // Remove food after a delay
            setTimeout(() => {
                food.remove();
                // Continue swimming
                swim(fish);
            }, 2000);
        });
    }
    
    function addFood() {
        const food = document.createElement('div');
        food.className = 'food';
        
        const x = Math.random() * (aquarium.offsetWidth - 10);
        const y = Math.random() * (aquarium.offsetHeight - 10);
        
        food.style.left = `${x}px`;
        food.style.top = `${y}px`;
        
        aquarium.appendChild(food);
        
        // Remove food after 5 seconds
        setTimeout(() => {
            food.remove();
        }, 5000);
    }
    
    function swim(fish) {
        const duration = Math.random() * 5000 + 3000; // 3-8 seconds
        
        const startX = parseInt(fish.style.left) || 0;
        const startY = parseInt(fish.style.top) || 0;
        
        const maxX = aquarium.offsetWidth - fish.offsetWidth;
        const maxY = aquarium.offsetHeight - fish.offsetHeight;
        
        const endX = Math.random() * maxX;
        const endY = Math.random() * maxY;
        
        // Flip fish based on direction
        if (endX > startX) {
            fish.style.transform = 'scaleX(1)';
        } else {
            fish.style.transform = 'scaleX(-1)';
        }
        
        fish.style.transition = `left ${duration}ms linear, top ${duration}ms linear`;
        fish.style.left = `${endX}px`;
        fish.style.top = `${endY}px`;
        
        // Continue swimming after reaching destination
        setTimeout(() => {
            swim(fish);
        }, duration);
    }
    
    // Add initial fish
    for (let i = 0; i < 3; i++) {
        addFish();
    }
});
