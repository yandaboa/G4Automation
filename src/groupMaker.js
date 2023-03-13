import { db, auth } from "./main"
import { getDatabase, ref, child, get } from "firebase/database"
import router from "./router"

const allStudents = [], allStudentNames = [];

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
                allStudents[key] = snapshot.val()[key];
            }
        } else {
            alert("No student forms filled out");
        }
    }).catch((error) => {
        console.log(error);
    });
    setTimeout(() => sortStudents(), 1000);
}

function sortStudents(){
    let bio = 0, compSci = 0, physics = 0, chem = 0, sportsSci = 0;
    console.log("executing");
    const seperated = [];
    // console.log(Object.keys(allStudents));
    for(var key in allStudents){
        seperated.push(false);
        for(let i = 0; i < allStudents[key]["classes"].length; i++){
            // console.log(allStudents[key]["classes"][i]);
            switch(allStudents[key]["classes"][i]){
                case "IB Bio":
                    bio++;
                    break;
                case "IB Comp Sci":
                    compSci++;
                    break;
                case "IB Physics":
                    physics++;
                    break;
                case "IB Chemistry":
                    chem++;
                    break;
                case "IB Sports Sci":
                    sportsSci++;
                    break;
            }
        }
    }
}