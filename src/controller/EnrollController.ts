import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Enroll } from "../entity/Enroll";
import { Subject } from "../entity/Subject";
import { Student } from "../entity/Student";
export class EnrollController {


    private enrollRepository = getRepository(Enroll);
    private subjectRepository = getRepository(Subject);
    private studentRepository = getRepository(Student);

    async enroll(request: Request, response: Response, next: NextFunction) {

        const enroll = { studentId: request.studentId, subjectId: request.params.subjectId };
        return this.enrollRepository.save(enroll);
    }
    async getEnrolledSubjects(request: Request, response: Response, next: NextFunction) {


        if (request.role != 'STUDENT')
            response.status(403).send('UnAuthorised Login as Student');
        else {
            let enrolledSubjectId = await this.enrollRepository.find({ where: { studentId: request.studentId } })
            // console.log(enrolledSubjectId)

            let enrolledSubjects = [];
            for (let i = 0; i < enrolledSubjectId.length; i++) {
                const { subjectId } = enrolledSubjectId[i];
                let enrolledSubject = await this.subjectRepository.find({ where: { id: subjectId } });
                enrolledSubjects.push(enrolledSubject);
            }
            return enrolledSubjects;
        }


    }
    async getEnrolledStudents(request: Request, response: Response, next: NextFunction) {

        if (request.role != 'TEACHER')
            response.status(403).send('UnAuthorised Login as Teacher');
        else {
            let enrolledStudentId = await this.enrollRepository.find({ where: { subjectId: request.params.subjectId } })

            
            let enrolledStudents = [];
            for (let i = 0; i < enrolledStudentId.length; i++) {
                const { studentId } = enrolledStudentId[i];
                let enrolledStudent = await this.studentRepository.find({ where: { id: studentId } });
                enrolledStudents.push(enrolledStudent);
            }
            return enrolledStudents;
        }



    }

    async enrollall(request: Request, response: Response, next: NextFunction) {

        return this.enrollRepository.find();
    }


}