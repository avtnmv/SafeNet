// Polygraph Cards Expansion Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up polygraph cards...');
    
    const cards = document.querySelectorAll('.polygraph-card');
    console.log('Found cards:', cards.length);
    
    if (cards.length === 0) {
        console.error('No polygraph cards found!');
        return;
    }
    
    cards.forEach((card, index) => {
        console.log(`Setting up card ${index + 1}`);
        
        // Add click event to the entire card
        card.addEventListener('click', function(event) {
            console.log(`Card ${index + 1} clicked!`);
            
            // Prevent event bubbling
            event.stopPropagation();
            
            const isExpanded = this.classList.contains('expanded');
            console.log(`Card ${index + 1} is expanded:`, isExpanded);
            
            // Close all other cards first
            cards.forEach((otherCard, otherIndex) => {
                if (otherCard !== this && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                    console.log(`Closed card ${otherIndex + 1}`);
                }
            });
            
            // Toggle current card
            if (isExpanded) {
                this.classList.remove('expanded');
                console.log(`Card ${index + 1} collapsed`);
            } else {
                this.classList.add('expanded');
                console.log(`Card ${index + 1} expanded`);
            }
        });
        
        // Add visual feedback
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    console.log('Polygraph cards setup complete!');
});
