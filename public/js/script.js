
function loadWorkouts() {
    fetch("http://localhost:3000/workouts/")
        .then(response => response.json())
        .then(data => {
            const workoutsList = document.getElementById("workoutsList");
            workoutsList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workout => {
                const tr = document.createElement("tr");

                // Create first cell
                td = document.createElement("td");
                td.textContent = workout.workout_id;
                tr.appendChild(td);

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
                td.textContent = workout.workout_length_total;
                tr.appendChild(td);

                // Create fifth cell
                td = document.createElement("td");
                td.textContent = workout.workout_comment;
                tr.appendChild(td);

                td = document.createElement("td");
                a = document.createElement("a");
                linkText = document.createTextNode("Lägg till tränningspass");
                a.appendChild(linkText);

                a.setAttribute("href", "/traningspass/" + workout.workout_id);
                td.appendChild(a);
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'Edit';
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'X';
                tr.appendChild(td);

                // Add the tr to the tbody
                workoutsList.appendChild(tr);
            });
        });
}

function loadWorkoutsessions() {
    fetch("http://localhost:3000/workoutsessions/")
        .then(response => response.json())
        .then(data => {
            const workoutSessionsTypesList = document.getElementById("workoutSessionsTypesList");
            workoutSessionsTypesList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workoutsession => {
                const tr = document.createElement("tr");

                // Create first cell
                td = document.createElement("td");
                td.textContent = workoutsession.workoutsession_time;
                tr.appendChild(td);

                // Create third cell
                td = document.createElement("td");
                td.textContent = workoutsession.workouttype_id; 
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'Edit';
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'X';
                tr.appendChild(td);

                // Add the tr to the tbody
                workoutSessionsTypesList.appendChild(tr);
            });
        });
}

function loadWorkouttypes() {
    fetch("http://localhost:3000/workouttypes/")
        .then(response => response.json())
        .then(data => {
            const workoutTypesList = document.getElementById("workoutTypesList");
            workoutTypesList.innerHTML = "";   // Clear the list before adding new workout
            data.forEach(workoutsession => {
                const tr = document.createElement("tr");

                // Create first cell
                td = document.createElement("td");
                td.textContent = workoutsession.workoutsession_time;
                tr.appendChild(td);

                // Create third cell
                td = document.createElement("td");
                td.textContent = workoutsession.workouttype_id; 
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'Edit';
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = 'X';
                tr.appendChild(td);

                // Add the tr to the tbody
                workoutTypesList.appendChild(tr);
            });
        });
}


function addWorkout(event){
    event.preventDefault();
    const workout_date = document.getElementById("workout_date").value;
    const workout_name = document.getElementById("workout_name").value;
    const workout_comment = document.getElementById("workout_comment").value;

    if(!workout_date || !workout_name ){
        alert("Workout Date and Name are required!");
        return; 
    }


    fetch("http://localhost:3000/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Should workout_total_length be added here?
        body: JSON.stringify({ workout_date, workout_name, workout_comment })
    })
        .then(response => response.json())
        .then(data => {
            loadWorkouts();        // Reload workouts after adding a new one
            document.getElementById("workout_date").value = "";
            document.getElementById("workout_name").value = "";
            document.getElementById("workout_comment").value = "";
        })  
}





// Replace eventlistener
document.addEventListener("DOMContentLoaded", () => {
    // Load workouts when the page is loaded
    loadWorkouts();
    loadWorkouttypes();
    loadWorkoutsessions();
 

    // Add an event handler to the Add Workout button
    const addWorkoutBtn = document.getElementById("addWorkout");
    addWorkoutBtn.addEventListener("click", addWorkout);

    // Add an event handler to the Add Workout Type button
    //const addWorkoutTypeBtn = document.getElementById("addWorkoutType");
    //addWorkoutTypeBtn.addEventListener("click", addWorkoutType);

    loadWorkoutsessions();

});