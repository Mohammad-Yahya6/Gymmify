// Sample exercise data (replace with API data later)
const exercisesData = [
    {
        name: "Bench Press",
        slug: "bench-press",
        bodyFocus: "upper",
        exactPart: "chest",
        equipment: "barbell",
        description: "Targeting the chest, specifically the middle pecs. As a compound exercise, this compound exercise also recruits the triceps and front delts, as well as stabilizer muscles of the core and back. Great for building mass and overall upper body strength."
    },
    {
        name: "Incline Dumbbell Press",
        slug: "incline-dumbbell-press",
        bodyFocus: "upper",
        exactPart: "chest",
        equipment: "dumbbell",
        description: "An excellent upper chest builder that allows for a greater range of motion than barbell variations. Perfect for developing the clavicular head of the pectoralis major."
    },
    {
        name: "Cable Flyes",
        slug: "cable-flyes",
        bodyFocus: "upper",
        exactPart: "chest",
        equipment: "cable",
        description: "Pure chest isolation with constant tension throughout the movement. Excellent for developing the mind-muscle connection and chest definition."
    },
    {
        name: "Barbell Overhead Press",
        slug: "barbell-overhead-press",
        bodyFocus: "upper",
        exactPart: "shoulders",
        equipment: "barbell",
        description: "The king of shoulder exercises. Builds massive delts while also working the triceps and upper chest. Essential for overhead strength and pressing power."
    },
    {
        name: "Lateral Raises",
        slug: "lateral-raises",
        bodyFocus: "upper",
        exactPart: "shoulders",
        equipment: "dumbbell",
        description: "The best exercise for building wider shoulders. Directly targets the lateral deltoid head for that 3D shoulder look."
    },
    {
        name: "Face Pulls",
        slug: "face-pulls",
        bodyFocus: "upper",
        exactPart: "shoulders",
        equipment: "cable",
        description: "Essential for rear delt development and shoulder health. Also works the upper back and improves posture."
    },
    {
        name: "Barbell Curl",
        slug: "barbell-curl",
        bodyFocus: "upper",
        exactPart: "biceps",
        equipment: "barbell",
        description: "The classic bicep builder. Allows you to lift heavy weight and build overall arm mass. Focus on controlled negatives for maximum growth."
    },
    {
        name: "Hammer Curls",
        slug: "hammer-curls",
        bodyFocus: "upper",
        exactPart: "biceps",
        equipment: "dumbbell",
        description: "Targets the brachialis and brachioradialis along with the biceps. Essential for building thicker, fuller-looking arms."
    },
    {
        name: "Close-Grip Bench Press",
        slug: "close-grip-bench-press",
        bodyFocus: "upper",
        exactPart: "triceps",
        equipment: "barbell",
        description: "A powerful tricep mass builder that also works the chest. Allows for heavy loading and progressive overload."
    },
    {
        name: "Tricep Dips",
        slug: "tricep-dips",
        bodyFocus: "upper",
        exactPart: "triceps",
        equipment: "bodyweight",
        description: "One of the best bodyweight exercises for building tricep mass. Can be loaded with additional weight for progression."
    },
    {
        name: "Hanging Leg Raises",
        slug: "hanging-leg-raises",
        bodyFocus: "full",
        exactPart: "abs",
        equipment: "bodyweight",
        description: "An advanced ab exercise that targets the entire core with emphasis on the lower abs. Also builds incredible grip strength."
    },
    {
        name: "Cable Woodchops",
        slug: "cable-woodchops",
        bodyFocus: "full",
        exactPart: "abs",
        equipment: "cable",
        description: "A functional core exercise that targets the obliques and develops rotational power. Great for athletes."
    },
    {
        name: "Back Squat",
        slug: "back-squat",
        bodyFocus: "lower",
        exactPart: "quadriceps",
        equipment: "barbell",
        description: "The king of leg exercises. Builds massive quads, glutes, and overall lower body strength. Essential for any serious lifter."
    },
    {
        name: "Bulgarian Split Squats",
        slug: "bulgarian-split-squats",
        bodyFocus: "lower",
        exactPart: "quadriceps",
        equipment: "dumbbell",
        description: "A unilateral leg exercise that builds incredible quad and glute strength. Also improves balance and addresses muscle imbalances."
    },
    {
        name: "Romanian Deadlifts",
        slug: "romanian-deadlifts",
        bodyFocus: "lower",
        exactPart: "hamstrings",
        equipment: "barbell",
        description: "The best hamstring developer. Also builds the glutes and lower back. Essential for posterior chain development."
    },
    {
        name: "Leg Curls",
        slug: "leg-curls",
        bodyFocus: "lower",
        exactPart: "hamstrings",
        equipment: "machine",
        description: "Pure hamstring isolation. Great for building the hamstring peak and balancing out quad development."
    },
    {
        name: "Standing Calf Raises",
        slug: "standing-calf-raises",
        bodyFocus: "lower",
        exactPart: "calves",
        equipment: "machine",
        description: "The primary exercise for building the gastrocnemius muscle. High reps and full range of motion are key."
    },
    {
        name: "Pull-ups",
        slug: "pull-ups",
        bodyFocus: "upper",
        exactPart: "lats",
        equipment: "bodyweight",
        description: "The ultimate back builder. Develops the lats, biceps, and grip strength. Essential for building a V-taper physique."
    },
    {
        name: "Barbell Rows",
        slug: "barbell-rows",
        bodyFocus: "upper",
        exactPart: "lats",
        equipment: "barbell",
        description: "A compound pulling exercise that builds thick lats and overall back mass. Also strengthens the lower back and core."
    },
    {
        name: "Barbell Shrugs",
        slug: "barbell-shrugs",
        bodyFocus: "upper",
        exactPart: "traps",
        equipment: "barbell",
        description: "The primary trap builder. Heavy weight and a full range of motion will build massive upper traps."
    },
    {
        name: "Deadlifts",
        slug: "deadlifts",
        bodyFocus: "lower",
        exactPart: "lower-back",
        equipment: "barbell",
        description: "The king of all exercises. Builds total body strength with emphasis on the posterior chain. Essential for any strength program."
    },
    {
        name: "Hip Thrusts",
        slug: "hip-thrusts",
        bodyFocus: "lower",
        exactPart: "glutes",
        equipment: "barbell",
        description: "The best glute builder. Allows for heavy loading and direct glute activation. Essential for developing powerful hips."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    const bodyFocusSelect = document.getElementById('body-focus');
    const exactPartSelect = document.getElementById('exact-part');
    const equipmentSelect = document.getElementById('equipment');
    const exercisesContainer = document.getElementById('exercises-container');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Check if we came from body map page
    const selectedMuscle = sessionStorage.getItem('selectedMuscle');
    const selectedBodyFocus = sessionStorage.getItem('selectedBodyFocus');
    
    if (selectedMuscle) {
        // Map muscle keys to your "EXACT PART" dropdown values
        const muscleToExactPart = {
            'chest': 'chest',
            'tricep': 'triceps',
            'bicep': 'biceps',
            'shoulder': 'shoulders',
            'forearm': 'forearms',
            'trap': 'traps',
            'lat': 'lats',
            'mid back': 'middle back',
            'neck': 'neck',
            'abdominals': 'abs',
            'lower back': 'lower-back',
            'glute': 'glutes',
            'quads': 'quadriceps',
            'hamstring': 'hamstrings',
            'calf': 'calves'
        };
        
        // Set the EXACT PART dropdown
        const exactPartValue = muscleToExactPart[selectedMuscle];
        if (exactPartValue) {
            exactPartSelect.value = exactPartValue;
        }
        
        // Clear sessionStorage
        sessionStorage.removeItem('selectedMuscle');
    }
    
    if (selectedBodyFocus) {
        // Set the BODY FOCUS dropdown
        bodyFocusSelect.value = selectedBodyFocus;
        sessionStorage.removeItem('selectedBodyFocus');
    }
    
    // Initial render (trigger filter after setting dropdowns)
    setTimeout(() => {
        performSearch();
    }, 100);
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const bodyFocus = bodyFocusSelect.value;
        const exactPart = exactPartSelect.value;
        const equipment = equipmentSelect.value;
        
        const filtered = exercisesData.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm) ||
                                exercise.description.toLowerCase().includes(searchTerm);
            const matchesBody = !bodyFocus || bodyFocus === 'all' || exercise.bodyFocus === bodyFocus;
            const matchesPart = !exactPart || exactPart === 'all' || exercise.exactPart === exactPart;
            const matchesEquipment = !equipment || equipment === 'all' || exercise.equipment === equipment;
            
            return matchesSearch && matchesBody && matchesPart && matchesEquipment;
        });
        
        renderExercises(filtered);
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
            <div class="exercise-card" onclick="navigateToExerciseDetail('${exercise.slug}')">
                <div class="exercise-info">
                    <div class="exercise-header">
                        <h3>${exercise.name}</h3>
                    </div>
                    <div class="exercise-meta">
                        <span class="meta-tag">${capitalizeFirst(exercise.bodyFocus)}</span>
                        ${exercise.exactPart ? `<span class="meta-tag">${capitalizeFirst(exercise.exactPart)}</span>` : ''}
                        <span class="meta-tag">${capitalizeFirst(exercise.equipment)}</span>
                    </div>
                    <p>${exercise.description}</p>
                </div>
                <div class="exercise-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); navigateToExerciseDetail('${exercise.slug}')">Watch Video</button>
                </div>
            </div>
        `).join('');
    }
    
    // Helper function
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

// Navigate to exercise detail page
function navigateToExerciseDetail(exerciseSlug) {
    window.location.href = `exercise.html?id=${exerciseSlug}`;
}

// Make function available globally
window.navigateToExerciseDetail = navigateToExerciseDetail;