// Global variable to store exercises
let exercisesData = [];

document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    const bodyFocusSelect = document.getElementById('body-focus');
    const exactPartSelect = document.getElementById('exact-part');
    const equipmentSelect = document.getElementById('equipment');
    const exercisesContainer = document.getElementById('exercises-container');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Show loading state
    showLoading();
    
    // Load exercises from JSON
    await loadExercisesFromJSON();
    exercisesData = getAllExercises();
    
    // Check if we came from body map page
    const selectedMuscle = sessionStorage.getItem('selectedMuscle');
    const selectedBodyFocus = sessionStorage.getItem('selectedBodyFocus');
    
    if (selectedMuscle) {
        const targetMuscle = mapMuscleToExerciseFormat(selectedMuscle);
        
        // Filter exercises for this muscle
        exercisesData = getExercisesByTarget(targetMuscle);
        
        // Set the dropdown
        exactPartSelect.value = targetMuscle;
        
        sessionStorage.removeItem('selectedMuscle');
        sessionStorage.removeItem('selectedBodyFocus');
    }
    
    // Initial render
    performSearch();
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    bodyFocusSelect.addEventListener('change', performSearch);
    exactPartSelect.addEventListener('change', performSearch);
    equipmentSelect.addEventListener('change', performSearch);
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                exercisesContainer.classList.add('list-view');
            } else {
                exercisesContainer.classList.remove('list-view');
            }
        });
    });
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const bodyFocus = bodyFocusSelect.value;
        const exactPart = exactPartSelect.value;
        const equipment = equipmentSelect.value;
        
        let exercises = getAllExercises();
        
        // Filter by exact part (primary muscle)
        if (exactPart && exactPart !== 'all') {
            exercises = exercises.filter(ex => {
                const primaryMuscle = ex.primaryMuscles?.[0] || '';
                return primaryMuscle.toLowerCase() === exactPart.toLowerCase();
            });
        }
        
        // Filter by equipment
        if (equipment && equipment !== 'all') {
            exercises = exercises.filter(ex => 
                ex.equipment && ex.equipment.toLowerCase() === equipment.toLowerCase()
            );
        }
        
        // Filter by search term
        if (searchTerm) {
            exercises = exercises.filter(ex => 
                ex.name.toLowerCase().includes(searchTerm)
            );
        }
        
        renderExercises(exercises);
    }
    
    // Render exercises
    function renderExercises(exercises) {
        if (exercises.length === 0) {
            exercisesContainer.style.display = 'none';
            noResults.style.display = 'block';
            resultsCount.textContent = 'No Exercises Found';
            return;
        }
        
        exercisesContainer.style.display = 'grid';
        noResults.style.display = 'none';
        resultsCount.textContent = `${exercises.length} Exercise${exercises.length !== 1 ? 's' : ''} Found`;
        
        exercisesContainer.innerHTML = exercises.map(exercise => {
            const primaryMuscle = exercise.primaryMuscles?.[0] || 'N/A';
            const equipment = exercise.equipment || 'N/A';
            const imageUrl = getExerciseImageUrl(exercise, 0);
            
            return `
            <div class="exercise-card" onclick="navigateToExerciseDetail('${exercise.id}')">
                <div class="exercise-info">
                    <div class="exercise-header">
                        <h3>${capitalizeWords(exercise.name)}</h3>
                    </div>
                    <div class="exercise-meta">
                        <span class="meta-tag">${capitalizeFirst(primaryMuscle)}</span>
                        <span class="meta-tag">${capitalizeFirst(equipment)}</span>
                        ${exercise.level ? `<span class="meta-tag">${capitalizeFirst(exercise.level)}</span>` : ''}
                    </div>
                    <p>${exercise.instructions?.[0] || 'Target: ' + primaryMuscle}</p>
                </div>
                <div class="exercise-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); navigateToExerciseDetail('${exercise.id}')">View Details</button>
                </div>
            </div>
        `;
        }).join('');
    }
    
    // Helper functions
    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function capitalizeWords(str) {
        if (!str) return '';
        return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
    }
    
    function showLoading() {
        exercisesContainer.innerHTML = `
            <div class="loading">
                <p>Loading exercises...</p>
            </div>
        `;
        exercisesContainer.style.display = 'block';
        noResults.style.display = 'none';
    }
});

// Navigate to exercise detail page
function navigateToExerciseDetail(exerciseId) {
    window.location.href = `exercise.html?id=${exerciseId}`;
}

// Make function available globally
window.navigateToExerciseDetail = navigateToExerciseDetail;