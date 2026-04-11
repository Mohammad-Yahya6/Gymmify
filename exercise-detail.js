document.addEventListener('DOMContentLoaded', async function() {
    await loadExercisesFromJSON();
    let exercises = getAllExercises();

    // Get exercise ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id');
    
    if (exerciseId && getExerciseById(exerciseId)) {
        loadExerciseDetail(exerciseId);
    } else {
        // Default to first exercise if no ID provided
        const firstExercise = exercises[0];
        if (firstExercise) {
            loadExerciseDetail(firstExercise.id);
        }
    }
});

function loadExerciseDetail(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    
    if (!exercise) {
        console.error('Exercise not found:', exerciseId);
        return;
    }
    
    // Update page title
    document.title = `${exercise.name} - Gymmify`;
    
    // Update exercise name
    document.getElementById('exercise-name').textContent = exercise.name;
    
    // Update target muscles - primaryMuscles is an ARRAY
    const primaryMuscle = exercise.primaryMuscles?.[0] || 'N/A';
    document.getElementById('target-muscle').textContent = primaryMuscle;
    
    // Update secondary muscles - also an ARRAY
    const secondaryMuscles = exercise.secondaryMuscles?.join(', ') || 'None';
    document.getElementById('secondary-muscle').textContent = secondaryMuscles;
    
    // Update equipment
    document.getElementById('equipment-needed').textContent = exercise.equipment || 'N/A';
    
    // Update images using the helper function
    const gifContainer = document.getElementById('exercise-gif');
    const imageUrl1 = getExerciseImageUrl(exercise, 0); // First image
    const imageUrl2 = getExerciseImageUrl(exercise, 1); // Second image

    if (imageUrl1) {
        // Create both images stacked
        gifContainer.innerHTML = `
            <img src="${imageUrl1}" alt="${exercise.name}" class="image-1">
            ${imageUrl2 ? `<img src="${imageUrl2}" alt="${exercise.name}" class="image-2">` : ''}
        `;
    } else {
        gifContainer.innerHTML = '<span class="placeholder-text">No Image</span>';
    }
    
    // Update instructions
    const instructionsList = document.getElementById('instructions-list');
    if (exercise.instructions && exercise.instructions.length > 0) {
        instructionsList.innerHTML = exercise.instructions
            .map(instruction => `<li>${instruction}</li>`)
            .join('');
    } else {
        instructionsList.innerHTML = '<li>No instructions available</li>';
    }
    
    // Load similar exercises
    loadSimilarExercises(primaryMuscle);
}

function loadSimilarExercises(primaryMuscle) {
    // Update similar exercises heading
    document.getElementById('similar-bodypart').textContent = primaryMuscle;
    
    // Get similar exercises for this body part using the helper function
    const exercises = getExercisesByTarget(primaryMuscle);
    
    // Limit to 6 similar exercises
    const limitedExercises = exercises.slice(0, 6);
    
    const container = document.getElementById('similar-exercises-container');
    
    if (limitedExercises.length === 0) {
        container.innerHTML = '<p style="color: #999;">No similar exercises found.</p>';
        return;
    }
    
    container.innerHTML = limitedExercises.map(exercise => {
        const primaryMuscle = exercise.primaryMuscles?.[0] || 'N/A';
        const equipment = exercise.equipment || 'N/A';
        
        return `
        <div class="exercise-card" onclick="navigateToExercise('${exercise.id}')">
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
                <button class="action-btn" onclick="event.stopPropagation(); navigateToExercise('${exercise.id}')">View Details</button>
            </div>
        </div>
    `;
    }).join('');
}

// Add these helper functions
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
}

function navigateToExercise(exerciseId) {
    window.location.href = `exercise.html?id=${exerciseId}`;
}

// Make function available globally
window.navigateToExercise = navigateToExercise;
function navigateToExercise(exerciseId) {
    window.location.href = `exercise.html?id=${exerciseId}`;
}

// Make function available globally
window.navigateToExercise = navigateToExercise;