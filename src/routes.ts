import {StudentController} from "./controller/StudentController";
import {EnrollController} from "./controller/EnrollController";
import {AttendanceController} from "./controller/AttendanceController";
import {SubjectController} from "./controller/SubjectController";
import {TeacherController} from "./controller/TeacherController";
export const Routes = [
{
    method: "post",
    route: "/enroll/:subjectId",
    controller: EnrollController,
    action: "enroll"
},
{
    method: "get",
    route: "/enroll/:subjectId",
    controller: EnrollController,
    action: "getEnrolledStudents"
},
{
    method: "get",
    route: "/enroll",
    controller: EnrollController,
    action: "getEnrolledSubjects"
},
{
    method: "post",
    route: "/attendance",
    controller: AttendanceController,
    action: "markAttendance"
},
{
    method: "get",
    route: "/attendance/subject/:subjectId",
    controller: AttendanceController,
    action: "getAttendancebySubjectId"
},
{
    method: "get",
    route: "/attendance/student/:studentId",
    controller: AttendanceController,
    action: "getAttendancebyStudentId"
},
{
    method: "get",
    route: "/subject/:subjectId",
    controller: SubjectController,
    action: "one"
},
{
    method: "post",
    route: "/subject",
    controller: SubjectController,
    action: "save"
},
{
    method: "put",
    route: "/subject/:subjectId",
    controller: SubjectController,
    action: "update"
},
{
    method: "delete",
    route: "/subject/:subjectId",
    controller: SubjectController,
    action: "remove"
},
{
    method: "get",
    route: "/subjects",
    controller: SubjectController,
    action: "listSubjects"
},
{
    method: "post",
    route: "/teacher/signup",
    controller: TeacherController,
    action: "signup"
},
{
    method: "post",
    route: "/teacher/login",
    controller: TeacherController,
    action: "login"
},
{
    method: "post",
    route: "/student/signup",
    controller: StudentController,
    action: "signup"
},
{
    method: "post",
    route: "/student/login",
    controller: StudentController,
    action: "login"
}
];