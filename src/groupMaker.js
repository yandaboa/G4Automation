import { db, auth } from "./main"
import { getDatabase, ref, child, get } from "firebase/database"
import router from "./router"

//array of raw student data, straight from Firebase Realtime Database
const allStudents = {};

var size = 0;
const scienceClasses = [];
const classNameToIndex = {};

function scienceDiscipline(className) { 
    //Note: it says function because this is the JavaScript syntax for constructors.

    // class for science classes:
    // contains an array with all the students from that class. We will later form partners with these students.
    classNameToIndex[className] = size;
    //classNameToIndex is a dictionary mapping science class names to the index of the corresponding scienceDiscipline in scienceClasses.
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
                    //this handles making an instance of scienceDiscipline:

                    //it only makes a new instance of scienceDiscipline if 
                    //scienceClasses does not already contain one with the same name

                    let className = allStudents[key].classes[cla];
                    console.log(className);
                    if(!contains(className)){
                        scienceClasses.push(new scienceDiscipline(className));
                    }
                }
            }
            setTimeout(() => assignStudents(), 1000);
        } else {
            alert("No student forms filled out");
        }
    }).catch((error) => {
        console.log(error);
    });
}

//scienceClasses is an array of the scienceDisciplien objects from technique 3 & 4
function contains(discipline){
    // we are checking if the array already contains a scienceDiscipline with the this name
    for(let i = 0; i < scienceClasses.length; i++){
        if(scienceClasses[i].name == discipline){
            return true;
        }
    }
    return false;
}

function assignStudents(){
    // console.log("executing");
    const seperated = [];
    // console.log(Object.keys(allStudents));

    // console.log("here are all the classes");
    // console.log(scienceClasses);
    // console.log(classNameToIndex);
    // console.log(allStudents);

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

    createPartners();
    displayAllGroups();
    // for(let i = 0; i < scienceClasses.length; i++){
    //     createPartners(scienceClasses[i]);
    // }
}

function placeIntoDiscipline(key){
    const numStudentsInClass = [];
    for(let i = 0; i < allStudents[key]["classes"].length; i++){
        // console.log(allStudents[key]["classes"][i]);
        let indexOfClass = classNameToIndex[allStudents[key]["classes"][i]];
        numStudentsInClass.push(Object.keys(scienceClasses[indexOfClass].students).length);
    }
    // console.log(key);
    // console.log(numStudentsInClass);
    let minStudents = 10000, minInd = -1;
    for(let i = 0; i < numStudentsInClass.length; i++){
        if(numStudentsInClass[i] <= minStudents){
            minStudents = numStudentsInClass[i];
            minInd = i;
        }
    }
    scienceClasses[classNameToIndex[allStudents[key]["classes"][minInd]]].addStudent(key, allStudents[key]);
}

const groups = [];


let csvContent = "data:text/csv;charset=utf-8,"; //the .csv file
function displayAllGroups(){
    //the array "groups" contains "partnerships" - the key is a string for which discipline the partnership is doing
    //and then the actual object contains the names of students in that "partnership"

    //we are adding them to a string "row", which is then added to the .csv
    csvContent += "G4 Groups \r\n";
    for(let i = 0; i < groups.length; i++){
        let row = "Group 1,";
        for(var partnerhship in groups[i]){
            for(var student in partnerhship){
                row += partnerhship + ": ";
                row += student + ",";
            }
        }
        csvContent += row + "\r\n";
    }

    // var encodedUri = encodeURI(csvContent); //these two lines are to download the .csv, by opening a new window with it
    // window.open(encodedUri);

    let csv = 'Put,Column,Titles,Here\n';
    // this.csvdata.forEach((row) => {
    //         csv += row.join(',');
    //         csv += "\n";
    // });
 
    const anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    anchor.target = '_blank';
    anchor.download = 'groups1.csv';
    anchor.click();
}


let numSatisfiedStudents = 0;
const partnersByDiscipline = {};

function createPartners(discipline){
    partnersByDiscipline[discipline.name] = [];
    console.log(discipline.name);
    console.log(discipline.students);
    for(var key in discipline.students){
        discipline.students[key]["partnered"] = false;
    }

    for(var key in discipline.students){
        if(discipline.students[key]["partnered"]){
            continue;
        }
        if(Object.keys(discipline.students).contains((discipline.students[key].requestedStudent)) && discipline.students[discipline.students[key].requestedStudent].requestedStudent == key){
            discipline.students[key]["partnered"] = true;
            discipline.students[discipline.students[key].requestedStudent]["partnered"] = true;
            const pair = [];
            pair.push(key); pair.push(discipline.students[key].requestedStudent);
            partnersByDiscipline[discipline.name].push(pair);
        }
    }
    for(var key in discipline.students){
        if(discipline.students[key]["partnered"]){
            continue;
        }
        if(Object.keys(discipline.students).contains((discipline.students[key].requestedStudent)) && discipline.students[discipline.students[key].requestedStudent]["partnered"] == false){
            iscipline.students[key]["partnered"] = true;
            discipline.students[discipline.students[key].requestedStudent]["partnered"] = true;
            const pair = [];
            pair.push(key); pair.push(discipline.students[key].requestedStudent);
            partnersByDiscipline[discipline.name].push(pair);
        }
    }
    let lastUnassigned = "";
    for(var key in discipline.students){
        if(discipline.students[key]["partnered"]){
            continue;
        }
        if(lastUnassigned == ""){
            lastUnassigned = key;
        } else {
            const arr = []; arr.push(lastUnassigned); arr.push(key);
            partnersByDiscipline[discipline.name].push(arr);
            lastUnassigned = "";
        }
    }
    if(lastUnassigned != ""){
        let arr = partnersByDiscipline[discipline.name][partnersByDiscipline[discipline.name].length - 1];
        arr.push(lastUnassigned);
        partnersByDiscipline[discipline.name][partnersByDiscipline[discipline.name].length - 1] = arr;
    }
}