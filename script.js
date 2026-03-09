// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when window is resized above tablet breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Muscle pairing map - links left and right sides
const muscleLinks = {
  'tricep left': 'tricep right',
  'tricep right': 'tricep left',
  'bicep left': 'bicep right',
  'bicep right': 'bicep left',
  'lat left': 'lat right',
  'lat right': 'lat left',
  'glute left': 'glute right',
  'glute right': 'glute left',
  'hamstring left': 'hamstring right',
  'hamstring right': 'hamstring left',
  'calf left': 'calf right',
  'calf right': 'calf left',
  'chest left': 'chest right',
  'chest right': 'chest left',
  'shoulder left': 'shoulder right',
  'shoulder right': 'shoulder left',
  'forearm left': 'forearm right',
  'forearm right': 'forearm left',
  'quads left': 'quads right',
  'quads right': 'quads left',
  'trap left': 'trap right',
  'trap right': 'trap left',
  'mid back left': 'mid back right',
  'mid back right': 'mid back left',
  'lower back left': 'lower back right',
  'lower back right': 'lower back left',
  'neck left': 'neck right',
  'neck right': 'neck left',
};

// All abdominal IDs
const abdominalIds = [
  'abdominal 1',
  'abdominal 2',
  'abdominal 3',
  'abdominal 4',
  'abdominal 5',
  'abdominal 6',
  'abdominal 7',
  'abdominal 8'
];

// Dummy exercise data for each muscle group
const muscleData = {
  'chest': {
    displayName: 'CHEST (PECTORALS)',
    description: 'The pectorals consist of two main muscles: the pectoralis major and minor. The chest has three distinct sections - upper, middle, and lower - each activated by different angles of movement. Strong pecs are essential for pushing movements and upper body power.',
    exercises: [
      'Barbell Bench Press',
      'Incline Dumbbell Press',
      'Decline Bench Press',
      'Cable Flyes',
      'Push-ups'
    ]
  },
  'tricep': {
    displayName: 'TRICEPS',
    description: 'The triceps brachii is a three-headed muscle on the back of the upper arm. It is responsible for elbow extension and is crucial for pushing and pressing movements. Strong triceps are essential for overhead activities and upper body strength.',
    exercises: [
      'Close-Grip Bench Press',
      'Tricep Dips',
      'Overhead Tricep Extension',
      'Skull Crushers',
      'Cable Pushdowns'
    ]
  },
  'bicep': {
    displayName: 'BICEPS',
    description: 'The biceps brachii consists of two heads (long and short) that make up the front of the upper arm. They are primarily responsible for elbow flexion and forearm supination. Well-developed biceps are key for pulling movements.',
    exercises: [
      'Barbell Curls',
      'Hammer Curls',
      'Preacher Curls',
      'Concentration Curls',
      'Cable Curls'
    ]
  },
  'lat': {
    displayName: 'LATS (LATISSIMUS DORSI)',
    description: 'The latissimus dorsi are the largest muscles in the back, creating the V-taper shape. They are responsible for shoulder extension, adduction, and internal rotation. Strong lats are crucial for pulling movements and overall back development.',
    exercises: [
      'Pull-ups',
      'Lat Pulldowns',
      'Barbell Rows',
      'T-Bar Rows',
      'Straight-Arm Pulldowns'
    ]
  },
  'shoulder': {
    displayName: 'SHOULDERS (DELTOIDS)',
    description: 'The deltoids consist of three heads: anterior (front), lateral (middle), and posterior (rear). They are responsible for shoulder abduction, flexion, and extension. Well-rounded shoulders require training all three heads.',
    exercises: [
      'Overhead Press',
      'Lateral Raises',
      'Front Raises',
      'Rear Delt Flyes',
      'Arnold Press'
    ]
  },
  'quads': {
    displayName: 'QUADRICEPS',
    description: 'The quadriceps consist of four muscles on the front of the thigh: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. They are responsible for knee extension and are crucial for walking, running, and jumping.',
    exercises: [
      'Barbell Squats',
      'Leg Press',
      'Bulgarian Split Squats',
      'Leg Extensions',
      'Front Squats'
    ]
  },
  'hamstring': {
    displayName: 'HAMSTRINGS',
    description: 'The hamstrings are a group of three muscles on the back of the thigh: biceps femoris, semitendinosus, and semimembranosus. They are responsible for knee flexion and hip extension, essential for running and jumping.',
    exercises: [
      'Romanian Deadlifts',
      'Leg Curls',
      'Good Mornings',
      'Nordic Hamstring Curls',
      'Glute-Ham Raises'
    ]
  },
  'glute': {
    displayName: 'GLUTES',
    description: 'The gluteal muscles consist of three muscles: gluteus maximus, medius, and minimus. The glutes are the largest and most powerful muscles in the body, responsible for hip extension, rotation, and stabilization.',
    exercises: [
      'Hip Thrusts',
      'Bulgarian Split Squats',
      'Deadlifts',
      'Glute Bridges',
      'Cable Kickbacks'
    ]
  },
  'calf': {
    displayName: 'CALVES',
    description: 'The calf muscles consist of the gastrocnemius and soleus. They are responsible for plantarflexion (pointing the toes) and are crucial for walking, running, and jumping. Strong calves provide stability and power.',
    exercises: [
      'Standing Calf Raises',
      'Seated Calf Raises',
      'Jump Rope',
      'Box Jumps',
      'Donkey Calf Raises'
    ]
  },
  'abdominals': {
    displayName: 'ABDOMINALS (CORE)',
    description: 'The abdominals consist of multiple muscles including the rectus abdominis, external and internal obliques, and transverse abdominis. They are responsible for trunk flexion, rotation, and core stability.',
    exercises: [
      'Crunches',
      'Planks',
      'Russian Twists',
      'Hanging Leg Raises',
      'Cable Crunches'
    ]
  },
  'trap': {
    displayName: 'TRAPS (TRAPEZIUS)',
    description: 'The trapezius is a large diamond-shaped muscle covering the upper back and neck. It is responsible for scapular elevation, depression, and retraction. Strong traps are essential for shoulder stability and posture.',
    exercises: [
      'Barbell Shrugs',
      'Dumbbell Shrugs',
      'Farmer\'s Walk',
      'Face Pulls',
      'Upright Rows'
    ]
  },
  'forearm': {
    displayName: 'FOREARMS',
    description: 'The forearms contain multiple muscles responsible for wrist and finger movements. They are crucial for grip strength and are engaged in almost all upper body exercises.',
    exercises: [
      'Wrist Curls',
      'Reverse Wrist Curls',
      'Farmer\'s Walk',
      'Dead Hangs',
      'Reverse Curls'
    ]
  },
  'mid back': {
    displayName: 'MID BACK',
    description: 'The mid back includes the rhomboids and middle trapezius muscles. These muscles are responsible for scapular retraction and are crucial for posture and pulling movements.',
    exercises: [
      'Seated Cable Rows',
      'Bent-Over Rows',
      'Face Pulls',
      'T-Bar Rows',
      'Inverted Rows'
    ]
  },
  'lower back': {
    displayName: 'LOWER BACK',
    description: 'The lower back consists primarily of the erector spinae muscles. They are responsible for spinal extension and are crucial for maintaining posture and performing compound movements safely.',
    exercises: [
      'Deadlifts',
      'Hyperextensions',
      'Good Mornings',
      'Romanian Deadlifts',
      'Superman Holds'
    ]
  },
  'neck': {
    displayName: 'NECK',
    description: 'The neck muscles support the head and allow for various head movements. Strong neck muscles are important for posture, athletic performance, and injury prevention.',
    exercises: [
      'Neck Curls',
      'Neck Extensions',
      'Lateral Neck Flexion',
      'Plate-Loaded Neck Harness',
      'Isometric Neck Holds'
    ]
  }
};

// Track currently selected muscle group
let selectedMuscleGroup = null;

// Get all muscle elements
const svg = document.querySelector('.body svg');
const muscles = svg.querySelectorAll('path[id]');

// Function to get all related muscles (paired + abdominals)
function getRelatedMuscles(muscleId) {
  const related = [muscleId];
  
  if (abdominalIds.includes(muscleId)) {
    return [...abdominalIds];
  }
  
  const pairedId = muscleLinks[muscleId];
  if (pairedId) {
    related.push(pairedId);
  }
  
  return related;
}

// Function to activate a muscle group
function activateMuscleGroup(muscleIds) {
  muscleIds.forEach(id => {
    const muscle = svg.querySelector(`path[id="${id}"]`);
    if (muscle) muscle.classList.add('active');
  });
}

// Function to deactivate a muscle group
function deactivateMuscleGroup(muscleIds) {
  muscleIds.forEach(id => {
    const muscle = svg.querySelector(`path[id="${id}"]`);
    if (muscle) muscle.classList.remove('active');
  });
}

// Function to get muscle key from ID
function getMuscleKey(muscleId) {
  if (abdominalIds.includes(muscleId)) {
    return 'abdominals';
  }
  return muscleId.replace(/ left| right/i, '').trim();
}

// ===== ADD THIS NEW FUNCTION HERE =====
// Function to navigate to exercises page with pre-selected muscle
function navigateToExercises(muscleKey) {
  // Store the selected muscle in sessionStorage
  sessionStorage.setItem('selectedMuscle', muscleKey);
  
  // Map muscles to body focus (upper/lower/full)
  const bodyFocusMap = {
    'chest': 'upper',
    'tricep': 'upper',
    'bicep': 'upper',
    'shoulder': 'upper',
    'forearm': 'upper',
    'trap': 'upper',
    'lat': 'upper',
    'mid back': 'upper',
    'neck': 'upper',
    'abdominals': 'full',
    'lower back': 'lower',
    'glute': 'lower',
    'quads': 'lower',
    'hamstring': 'lower',
    'calf': 'lower'
  };
  
  const bodyFocus = bodyFocusMap[muscleKey] || 'all';
  sessionStorage.setItem('selectedBodyFocus', bodyFocus);
  
  // Navigate to exercises page
  window.location.href = 'exercises.html'; // Change to your actual exercises page URL
}
// ===== END OF NEW FUNCTION =====

// Function to update the info box
function updateInfoBox(muscleId) {
  const infoBox = document.getElementById('muscle-info-box');
  const muscleKey = getMuscleKey(muscleId);
  const data = muscleData[muscleKey];
  
  if (!data) {
    console.error('No data found for muscle:', muscleKey);
    return;
  }
  
  // Build the HTML
  let exercisesList = '';
  data.exercises.forEach(exercise => {
    exercisesList += `<div class="exercise-item">${exercise}</div>`;
  });
  
  // ===== MODIFIED THIS PART - Added onclick to button =====
  infoBox.innerHTML = `
    <div class="muscle-info-content">
      <div class="muscle-header">
        <h2 class="muscle-title">${data.displayName}</h2>
        <p class="muscle-description">${data.description}</p>
      </div>
      
      <div class="exercises-section">
        <h3 class="exercises-title">EXERCISES</h3>
        <div class="exercises-list">
          ${exercisesList}
        </div>
        <button class="view-all-btn" onclick="navigateToExercises('${muscleKey}')">VIEW ALL EXERCISES</button>
      </div>
    </div>
  `;
  // ===== END OF MODIFICATION =====
  
  // Show with class
  infoBox.classList.add('show');
  
  // Smooth scroll to info box
  setTimeout(() => {
    infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

muscles.forEach(muscle => {
  if (muscle.id.startsWith('Vector') || muscle.id === '') return;
  
  // HOVER handlers
  muscle.addEventListener('mouseenter', () => {
    if (selectedMuscleGroup && getRelatedMuscles(muscle.id).some(id => selectedMuscleGroup.includes(id))) {
      return;
    }
    
    const relatedMuscles = getRelatedMuscles(muscle.id);
    activateMuscleGroup(relatedMuscles);
  });
  
  muscle.addEventListener('mouseleave', () => {
    if (selectedMuscleGroup && getRelatedMuscles(muscle.id).some(id => selectedMuscleGroup.includes(id))) {
      return;
    }
    
    const relatedMuscles = getRelatedMuscles(muscle.id);
    deactivateMuscleGroup(relatedMuscles);
  });
  
  // CLICK handler
  muscle.addEventListener('click', () => {
    if (selectedMuscleGroup) {
      deactivateMuscleGroup(selectedMuscleGroup);
    }
    
    const relatedMuscles = getRelatedMuscles(muscle.id);
    selectedMuscleGroup = relatedMuscles;
    activateMuscleGroup(relatedMuscles);
    
    updateInfoBox(muscle.id);
    
    console.log('Selected muscle group:', muscle.id, 'Related:', relatedMuscles);
  });
});