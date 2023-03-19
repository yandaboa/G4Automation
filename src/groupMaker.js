import { db, auth } from "./main"
import { getDatabase, ref, child, get } from "firebase/database"
import router from "./router"

//array of raw student data, straight from Firebase Realtime Database
const allStudents = {};

var size = 0;
const scienceClasses = [];
const classNameToIndex = {};

function scienceDiscipline(className) { // class for science classes : contains an array with all the students from that class. We will later form partners with these students.
    classNameToIndex[className] = size;
    size++;
    this.name = className;
    this.students = {};
    
    this.addStudent = function(name, studentData){
        this.students[name] = studentData;
        return;
    };
  }

export function makeGroups() {
    if(auth.currentUser == null){
        alert("You are not signed in!")
        router.push('/');
    }

    const dbRef = ref(db);
    get(child(dbRef, '/students/')).then((snapshot) => {
        if(snapshot.exists()){
            // console.log(snapshot.val());
            for(var key in snapshot.val()) {

                if(snapshot.val()[key].hasExperience == "yes"){
                    continue;
                }

                allStudents[key] = snapshot.val()[key];

                // console.log(allStudents[key]);
                for(var cla in allStudents[key].classes){
                    let className = allStudents[key].classes[cla];
                    console.log(className);
                    if(!contains(className)){
                        scienceClasses.push(new scienceDiscipline(className));
                    }
                }
            }
        } else {
            alert("No student forms filled out");
        }
    }).catch((error) => {
        console.log(error);
    });
    setTimeout(() => sortStudents(), 1000);
}

function contains(discipline){
    for(let i = 0; i < scienceClasses.length; i++){
        if(scienceClasses[i].name == discipline){
            return true;
        }
    }
    return false;
}

function sortStudents(){
    // console.log("executing");
    const seperated = [];
    // console.log(Object.keys(allStudents));

    console.log("here are all the classes");
    console.log(scienceClasses);
    console.log(classNameToIndex);
    console.log(allStudents);

    for(var key in allStudents){
        seperated.push(false);
        if(allStudents[key].classes.length == 1){
            scienceClasses[classNameToIndex[allStudents[key]["classes"][0]]].addStudent(key, allStudents[key]);
            seperated[seperated.length - 1] = true;
        }
    }
    let counter = 0;
    for(var key in allStudents) {
        if(!seperated[counter]){
            placeIntoDiscipline(key);
            seperated[counter] = true;
        }
        counter++;
    }
    console.log(scienceClasses);
}

function placeIntoDiscipline(key){
    const numStudentsInClass = [];
    for(let i = 0; i < allStudents[key]["classes"].length; i++){
        // console.log(allStudents[key]["classes"][i]);
        let indexOfClass = classNameToIndex[allStudents[key]["classes"][i]];
        numStudentsInClass.push(Object.keys(scienceClasses[indexOfClass].students).length);
    }
    console.log(key);
    console.log(numStudentsInClass);
    let minStudents = 10000, minInd = -1;
    for(let i = 0; i < numStudentsInClass.length; i++){
        if(numStudentsInClass[i] <= minStudents){
            minStudents = numStudentsInClass[i];
            minInd = i;
        }
    }
    scienceClasses[classNameToIndex[allStudents[key]["classes"][minInd]]].addStudent(key, allStudents[key]);
}

