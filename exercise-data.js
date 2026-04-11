// Load exercises from local curated JSON file
let exercisesDatabase = [];

async function loadExercisesFromJSON() {
    try {
        const response = await fetch('curated-exercises.json');
        const data = await response.json();
        
        // Handle both formats: {exercises: [...]} or just [...]
        exercisesDatabase = data.exercises || data;
        
        console.log(`✅ Loaded ${exercisesDatabase.length} curated exercises`);
        return exercisesDatabase;
    } catch (error) {
        console.error('❌ Error loading exercises:', error);
        return [];
    }
}

// Get exercise image URL (local path)
function getExerciseImageUrl(exercise, imageIndex = 0) {
    if (exercise.images && exercise.images.length > imageIndex) {
        // Remove any leading slashes and return local path
        const imagePath = exercise.images[imageIndex].replace(/^\//, '');
        return `exercises/${imagePath}`;
    }
    return null;
}

// Filter exercises by body part (primary muscle)
function getExercisesByBodyPart(bodyPart) {
    return exercisesDatabase.filter(ex => {
        const primaryMuscle = ex.primaryMuscles?.[0] || '';
        return primaryMuscle.toLowerCase() === bodyPart.toLowerCase();
    });
}

// Filter exercises by target muscle (primary muscle)
function getExercisesByTarget(target) {
    return exercisesDatabase.filter(ex => {
        const primaryMuscle = ex.primaryMuscles?.[0] || '';
        return primaryMuscle.toLowerCase().includes(target.toLowerCase());
    });
}

// Filter exercises by equipment
function getExercisesByEquipment(equipment) {
    return exercisesDatabase.filter(ex => 
        ex.equipment && ex.equipment.toLowerCase() === equipment.toLowerCase()
    );
}

// Search exercises by name
function searchExercises(searchTerm) {
    const term = searchTerm.toLowerCase();
    return exercisesDatabase.filter(ex => 
        ex.name.toLowerCase().includes(term)
    );
}

// Get all exercises
function getAllExercises() {
    return exercisesDatabase;
}

// Get single exercise by ID
function getExerciseById(exerciseId) {
    return exercisesDatabase.find(ex => ex.id === exerciseId);
}

// Map muscle names from body map to exercise format
function mapMuscleToExerciseFormat(muscleName) {
    const muscleMap = {
        'chest': 'chest',
        'tricep': 'triceps',
        'bicep': 'biceps',
        'shoulder': 'shoulders',
        'forearm': 'forearms',
        'trap': 'traps',
        'lat': 'lats',
        'mid back': 'middle back',
        'neck': 'neck',
        'abdominals': 'abdominals',
        'lower back': 'lower back',
        'glute': 'glutes',
        'quads': 'quadriceps',
        'hamstring': 'hamstrings',
        'calf': 'calves'
    };
    
    return muscleMap[muscleName.toLowerCase()] || muscleName;
}