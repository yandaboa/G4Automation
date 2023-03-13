import { auth } from "./main";
import { db } from "./main";
import router from "./router";

auth.onAuthStateChanged(
    () => {
        if(auth.currentUser == null){
            router.push('/');
        } else {
            router.push('/TeacherDashboard');
        }
    }
)