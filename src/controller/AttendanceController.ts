import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Attendance} from "../entity/Attendance";
import { Teacher } from "../entity/Teacher";

export class AttendanceController {

    private attendanceRepository = getRepository(Attendance);
    private teacherRepository = getRepository(Teacher);
   
    async markAttendance(request: Request, response: Response, next: NextFunction) {
        if (request.role != 'TEACHER')
            response.status(403).send('UnAuthorised Login as Teacher');
        let valid=false;
        let teacher=await this.teacherRepository.findOne(request.teacherId);
        for(let subject of teacher.subjects)
        {
            if(subject.id==request.body.subjectId)
            {
                valid=true;
                break;
            }
        }
        if(valid)
         return this.attendanceRepository.save( {...request.body, date : new Date()});
        else    
            response.status(401).send('UnAuthorised')

    }
    

    async getAttendancebySubjectId(request: Request, response: Response, next: NextFunction) {
        if (request.role != 'TEACHER')
            response.status(403).send('UnAuthorised Login as Teacher');
        return this.attendanceRepository.find({ where:  { subjectId : request.params.subjectId }  });
    }

    async getAttendancebyStudentId(request: Request, response: Response, next: NextFunction) {
        return this.attendanceRepository.find({ where:  { studentId : request.params.studentId }  });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let attendanceToRemove = await this.attendanceRepository.findOne(request.params.id);
        await this.attendanceRepository.remove(attendanceToRemove);
    }
}