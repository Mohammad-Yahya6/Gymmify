// Dummy data for exercises - will be replaced with ExerciseDB API later
const exerciseDetailData = {
    "bench-press": {
        name: "Bench Press",
        gifUrl: "", // Will come from ExerciseDB
        targetMuscle: "chest",
        secondaryMuscles: "triceps and front delts",
        equipment: "barbell",
        instructions: [
            "Lie flat on a bench with your feet firmly planted on the ground",
            "Grip the barbell slightly wider than shoulder-width apart",
            "Lower the bar slowly to your mid-chest while keeping your elbows at about a 45-degree angle",
            "Press the bar back up to the starting position, fully extending your arms",
            "Repeat for the desired number of repetitions while maintaining proper form"
        ],
        rating: 5,
        rarity: "common"
    },
    "incline-dumbbell-press": {
        name: "Incline Dumbbell Press",
        gifUrl: "",
        targetMuscle: "upper chest",
        secondaryMuscles: "front delts and triceps",
        equipment: "dumbbell",
        instructions: [
            "Set an adjustable bench to a 30-45 degree incline",
            "Sit back with dumbbells resting on your thighs",
            "Kick the weights up one at a time to shoulder height",
            "Press the dumbbells up until your arms are fully extended",
            "Lower the dumbbells back down with control to the starting position"
        ],
        rating: 5,
        rarity: "common"
    },
    "cable-flyes": {
        name: "Cable Flyes",
        gifUrl: "",
        targetMuscle: "chest",
        secondaryMuscles: "front delts",
        equipment: "cable",
        instructions: [
            "Set the pulleys at chest height and grab both handles",
            "Step forward slightly and lean forward with a slight bend in your elbows",
            "Bring your hands together in front of your chest in a hugging motion",
            "Squeeze your chest at the peak contraction",
            "Slowly return to the starting position with control"
        ],
        rating: 4.5,
        rarity: "common"
    },
    "barbell-overhead-press": {
        name: "Barbell Overhead Press",
        gifUrl: "",
        targetMuscle: "shoulders",
        secondaryMuscles: "triceps and upper chest",
        equipment: "barbell",
        instructions: [
            "Stand with feet shoulder-width apart and grip the barbell at shoulder height",
            "Keep your core tight and elbows slightly forward",
            "Press the bar overhead until your arms are fully extended",
            "Lower the bar back to shoulder height with control",
            "Avoid leaning back excessively during the movement"
        ],
        rating: 5,
        rarity: "common"
    }
};

// Similar exercises by body part
const similarExercises = {
    "chest": [
        {
            name: "Bench Press",
            description: "Prioritizes the chest, specifically the middle chest (lower). It's a compound exercise also recruiting the triceps and front delts as well.",
            rating: 5,
            rarity: "common",
            slug: "bench-press"
        },
        {
            name: "Incline Dumbbell Press",
            description: "An excellent upper chest builder that allows for a greater range of motion than barbell variations.",
            rating: 5,
            rarity: "common",
            slug: "incline-dumbbell-press"
        },
        {
            name: "Cable Flyes",
            description: "Pure chest isolation with constant tension throughout the movement. Excellent for developing the mind-muscle connection.",
            rating: 4.5,
            rarity: "common",
            slug: "cable-flyes"
        }
    ],
    "shoulders": [
        {
            name: "Barbell Overhead Press",
            description: "The king of shoulder exercises. Builds massive delts while also working the triceps and upper chest.",
            rating: 5,
            rarity: "common",
            slug: "barbell-overhead-press"
        },
        {
            name: "Lateral Raises",
            description: "The best exercise for building wider shoulders. Directly targets the lateral deltoid head.",
            rating: 4.5,
            rarity: "common",
            slug: "lateral-raises"
        }
    ],
    "upper chest": [
        {
            name: "Incline Dumbbell Press",
            description: "An excellent upper chest builder that allows for a greater range of motion than barbell variations.",
            rating: 5,
            rarity: "common",
            slug: "incline-dumbbell-press"
        },
        {
            name: "Incline Barbell Press",
            description: "A compound movement targeting the upper pectorals with heavy weight capability.",
            rating: 5,
            rarity: "common",
            slug: "incline-barbell-press"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Get exercise ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id');
    
    if (exerciseId && exerciseDetailData[exerciseId]) {
        loadExerciseDetail(exerciseId);
    } else {
        // Default to bench press if no ID provided
        loadExerciseDetail('bench-press');
    }
});

function loadExerciseDetail(exerciseId) {
    const exercise = exerciseDetailData[exerciseId];
    
    if (!exercise) {
        console.error('Exercise not found:', exerciseId);
        return;
    }
    
    // Update page title
    document.title = `${exercise.name} - Gymmify`;
    
    // Update exercise name
    document.getElementById('exercise-name').textContent = exercise.name;
    
    // Update target muscles
    document.getElementById('target-muscle').textContent = exercise.targetMuscle;
    document.getElementById('secondary-muscle').textContent = exercise.secondaryMuscles;
    
    // Update equipment
    document.getElementById('equipment-needed').textContent = exercise.equipment;
    
    // Update GIF (placeholder for now, will use ExerciseDB later)
    const gifContainer = document.getElementById('exercise-gif');
    if (exercise.gifUrl) {
        gifContainer.innerHTML = `<img src="${exercise.gifUrl}" alt="${exercise.name}">`;
    } else {
        gifContainer.innerHTML = '<span class="placeholder-text">Gif</span>';
    }
    
    // Update instructions
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = exercise.instructions
        .map(instruction => `<li>${instruction}</li>`)
        .join('');
    
    // Load similar exercises
    loadSimilarExercises(exercise.targetMuscle);
}

function loadSimilarExercises(bodyPart) {
    // Update similar exercises heading
    document.getElementById('similar-bodypart').textContent = bodyPart;
    
    // Get similar exercises for this body part
    const exercises = similarExercises[bodyPart] || [];
    
    const container = document.getElementById('similar-exercises-container');
    
    if (exercises.length === 0) {
        container.innerHTML = '<p style="color: #999;">No similar exercises found.</p>';
        return;
    }
    
    container.innerHTML = exercises.map(exercise => `
        <div class="similar-card" onclick="navigateToExercise('${exercise.slug}')">
            <div class="similar-card-info">
                <h3>${exercise.name}</h3>
                <p>${exercise.description}</p>
                <div class="similar-rating">
                    ${generateStars(exercise.rating)}
                    <span class="similar-rating-text">${exercise.rating}</span>
                </div>
                <span class="rarity-badge rarity-${exercise.rarity}">${exercise.rarity}</span>
            </div>
            <div class="similar-card-action">
                <button class="video-btn" onclick="event.stopPropagation(); alert('Video functionality coming soon!')">Video</button>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span>★</span>';
    }
    
    if (hasHalfStar) {
        stars += '<span>⯨</span>';
    }
    
    return stars;
}

function navigateToExercise(exerciseSlug) {
    window.location.href = `exercise.html?id=${exerciseSlug}`;
}

// Make function available globally
window.navigateToExercise = navigateToExercise;