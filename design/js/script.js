
function loadWorkouts() {
    fetch("http://localhost:3000/workouts/")
        .then(response => response.json())
        .then(data => {
            const workoutsList = document.getElementById("workoutsList");
            workoutsList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workout => {
                const tr = document.createElement("tr");
                // Create first cell - Not being displayed
                // let td = document.createElement("td");
                // td.textContent = workout.workout_id;
                //tr.appendChild(td);
                // Create second cell
                td = document.createElement("td");
                td.textContent = new Date(workout.workout_date).toLocaleDateString('sv-SE');
                tr.appendChild(td);

                // Create third cell
                td = document.createElement("td");
                td.textContent = workout.workout_name;
                tr.appendChild(td);

                // Create fourth cell
                td = document.createElement("td");
                td.textContent = workout.workout_length;
                tr.appendChild(td);

                // Create fifth cell
                td = document.createElement("td");
                td.textContent = workout.workout_comment;
                tr.appendChild(td);
                // Add the tr to the tbody
                workoutsList.appendChild(tr);
            });
        });
}

function addWorkout(event){
    event.preventDefault();

    const workout_date = document.getElementById("workout_date").value;
    const workout_name = document.getElementById("workout_name").value;
    const workout_length = document.getElementById("workout_length").value;
    const workout_comment = document.getElementById("workout_comment").value;
    // Calculation: workout_total_length = workout_total_length + wourkout_length;
    // Collect workout_tot_length and add new workout_length; ????

    if(!workout_date || !workout_name || !workout_length  ){
        alert("Workout Name, Length and Date are required!");
        return; 
    }

    fetch("http://localhost:3000/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Should workout_total_length be added here?
        body: JSON.stringify({ workout_date, workout_name, workout_length, workout_comment })
    })
        .then(response => response.json())
        .then(data => {
            loadWorkouts();        // Reload workouts after adding a new one
            document.getElementById("workout_date").value = "";
            document.getElementById("workout_name").value = "";
            document.getElementById("workout_length").value = "";
            document.getElementById("workout_comment").value = "";
        })  
}

function loadWorkoutTypes() {
    fetch("http://localhost:3000/workouttypes/")
        .then(response => response.json())
        .then(data => {
            const workoutTypesList = document.getElementById("workoutTypesList");
            workoutTypesList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workouttypes => {
                const tr = document.createElement("tr");
                // Create first cel Workouttype Name
                td = document.createElement("td");
                td.textContent = workouttypes.workouttype_name;
                tr.appendChild(td);
                
                // Add the tr to the tbody
                workoutTypesList.appendChild(tr);
            });
        });
}

function loadWorkoutWorkoutTypes() {
    fetch("http://localhost:3000/workouts-workouttypes/")
        .then(response => response.json())
        .then(data => {
            const workoutWorkoutTypesList = document.getElementById("workoutWorkoutTypesList");
            workoutWorkoutTypesList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workouts_workouttypes => {
                const tr = document.createElement("tr");
                // Create first cel Workout Id
                td = document.createElement("td");
                td.textContent = workouts_workouttype_id.workouttype_id;
                tr.appendChild(td);
                // Create second cel Workouttypes Id
                td = document.createElement("td");
                td.textContent = workouts_workouttype_id.workouttypes_id;
                tr.appendChild(td);
                
                // Add the tr to the tbody
                workoutWorkoutTypesList.appendChild(tr);
            });
        });
}

function addWorkoutType(event){
    event.preventDefault();
    const workouttypes_name = document.getElementById("workouttypes_name").value;
    // Calculation: workout_total_length = workout_total_length + wourkout_length;
    // Collect workout_tot_length and add new workout_length; ????

    if(!workouttypes_name ){
        alert("Workouttypes Name are required!");
        return; 
    }

    fetch("http://localhost:3000/workouttypes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Should workout_total_length be added here?
        body: JSON.stringify({ workouttypes_name })
    })
        .then(response => response.json())
        .then(data => {
            loadWorkoutWorkoutTypes();        // Reload workouts after adding a new one
            document.getElementById("workouttypes_name").value = "";
        })  
}

// Replace eventlistener
document.addEventListener("DOMContentLoaded", () => {
    // Load workouts when the page is loaded
    loadWorkouts();
    loadWorkoutTypes();
    loadWorkoutWorkoutTypes();
 

    // Add an event handler to the Add Workout button
    // const addWorkoutBtn = document.getElementById("addWorkout");
    // addWorkoutBtn.addEventListener("click", addWorkout);

    // Add an event handler to the Add Workout Type button
    const addWorkoutTypeBtn = document.getElementById("addWorkoutType");
    addWorkoutTypeBtn.addEventListener("click", addWorkoutType);

});