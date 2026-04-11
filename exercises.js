// Global variable to store exercises
let exercisesData = [];
let currentFilters = {
    search: '',
    bodyFocus: 'all',
    exactPart: 'all',
    equipment: 'all'
};

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
    
    // Check if we came from body map page
    const selectedMuscle = sessionStorage.getItem('selectedMuscle');
    const selectedBodyFocus = sessionStorage.getItem('selectedBodyFocus');
    
    if (selectedMuscle) {
        // Map muscle keys to API target values
        const muscleToTarget = {
            'chest': 'pectorals',
            'tricep': 'triceps',
            'bicep': 'biceps',
            'shoulder': 'delts',
            'forearm': 'forearms',
            'trap': 'traps',
            'lat': 'lats',
            'mid back': 'spine',
            'neck': 'neck',
            'abdominals': 'abs',
            'lower back': 'lower back',
            'glute': 'glutes',
            'quads': 'quads',
            'hamstring': 'hamstrings',
            'calf': 'calves'
        };
        
        const targetValue = muscleToTarget[selectedMuscle];
        if (targetValue) {
            // Set the dropdown and load exercises for this specific muscle
            exactPartSelect.value = targetValue;
            currentFilters.exactPart = targetValue;
            exercisesData = await exerciseAPI.getExercisesByTarget(targetValue);
            renderExercises(exercisesData);
            hideLoading();
        }
        
        sessionStorage.removeItem('selectedMuscle');
        sessionStorage.removeItem('selectedBodyFocus');
    } else {
        // Load initial exercises (first 100)
        await loadInitialExercises();
    }
    
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
    
    // Load initial exercises
    async function loadInitialExercises() {
        try {
            // Load first 100 exercises as default
            exercisesData = await exerciseAPI.getAllExercises(100, 0);
            renderExercises(exercisesData);
            hideLoading();
        } catch (error) {
            console.error('Error loading exercises:', error);
            hideLoading();
            showError();
        }
    }
    
    // Search functionality - Makes API calls based on filters
    async function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const bodyFocus = bodyFocusSelect.value;
        const exactPart = exactPartSelect.value;
        const equipment = equipmentSelect.value;
        
        // Update current filters
        currentFilters = { search: searchTerm, bodyFocus, exactPart, equipment };
        
        // Show loading
        showLoading();
        
        try {
            let exercises = [];
            
            // Priority order for API calls:
            // 1. Exact Part (target muscle) - most specific
            // 2. Body Focus (body part)
            // 3. Equipment
            // 4. Search term
            // 5. Default (cached exercises)
            
            if (exactPart && exactPart !== 'all') {
                // Fetch by target muscle from API
                console.log('Fetching by target muscle:', exactPart);
                exercises = await exerciseAPI.getExercisesByTarget(exactPart);
                
                // Apply additional filters locally
                if (equipment && equipment !== 'all') {
                    exercises = exercises.filter(ex => 
                        ex.equipment.toLowerCase() === equipment.toLowerCase()
                    );
                }
                
                if (searchTerm) {
                    exercises = exercises.filter(ex => 
                        ex.name.toLowerCase().includes(searchTerm)
                    );
                }
                
            } else if (bodyFocus && bodyFocus !== 'all') {
                // Fetch by body part from API
                console.log('Fetching by body part:', bodyFocus);
                exercises = await exerciseAPI.getExercisesByBodyPart(bodyFocus);
                
                // Apply additional filters locally
                if (equipment && equipment !== 'all') {
                    exercises = exercises.filter(ex => 
                        ex.equipment.toLowerCase() === equipment.toLowerCase()
                    );
                }
                
                if (searchTerm) {
                    exercises = exercises.filter(ex => 
                        ex.name.toLowerCase().includes(searchTerm)
                    );
                }
                
            } else if (equipment && equipment !== 'all') {
                // Fetch by equipment from API
                console.log('Fetching by equipment:', equipment);
                exercises = await exerciseAPI.getExercisesByEquipment(equipment);
                
                // Apply search term locally if provided
                if (searchTerm) {
                    exercises = exercises.filter(ex => 
                        ex.name.toLowerCase().includes(searchTerm)
                    );
                }
                
            } else if (searchTerm) {
                // Search by name from API
                console.log('Searching by name:', searchTerm);
                exercises = await exerciseAPI.searchExercises(searchTerm);
                
            } else {
                // No filters - use cached exercises or load fresh batch
                console.log('No filters - showing cached exercises');
                if (exercisesData.length === 0) {
                    exercises = await exerciseAPI.getAllExercises(100, 0);
                } else {
                    exercises = exercisesData;
                }
            }
            
            // Update cached data if we got results
            if (exercises.length > 0) {
                exercisesData = exercises;
            }
            
            renderExercises(exercises);
            hideLoading();
            
        } catch (error) {
            console.error('Error searching exercises:', error);
            hideLoading();
            showError();
        }
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
        
        exercisesContainer.innerHTML = exercises.map(exercise => `
            <div class="exercise-card" onclick="navigateToExerciseDetail('${exercise.id}')">
                <div class="exercise-info">
                    <div class="exercise-header">
                        <h3>${capitalizeWords(exercise.name)}</h3>
                    </div>
                    <div class="exercise-meta">
                        <span class="meta-tag">${capitalizeFirst(exercise.bodyPart)}</span>
                        <span class="meta-tag">${capitalizeFirst(exercise.target)}</span>
                        <span class="meta-tag">${capitalizeFirst(exercise.equipment)}</span>
                    </div>
                    <p>Targets: ${capitalizeFirst(exercise.target)} | Equipment: ${capitalizeFirst(exercise.equipment)}</p>
                </div>
                <div class="exercise-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); navigateToExerciseDetail('${exercise.id}')">Watch Video</button>
                </div>
            </div>
        `).join('');
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
                <div class="loading-spinner"></div>
                <p>Loading exercises...</p>
            </div>
        `;
        exercisesContainer.style.display = 'block';
        noResults.style.display = 'none';
    }
    
    function hideLoading() {
        // Loading will be replaced by renderExercises
    }
    
    function showError() {
        exercisesContainer.style.display = 'block';
        noResults.style.display = 'none';
        exercisesContainer.innerHTML = `
            <div class="error">
                <p>⚠️ Error loading exercises</p>
                <p>Please check your internet connection and try again.</p>
                <button onclick="location.reload()" class="retry-btn">Retry</button>
            </div>
        `;
    }
});

// Navigate to exercise detail page
function navigateToExerciseDetail(exerciseId) {
    window.location.href = `exercise.html?id=${exerciseId}`;
}

// Make function available globally
window.navigateToExerciseDetail = navigateToExerciseDetail;