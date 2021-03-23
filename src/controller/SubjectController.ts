import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Subject} from "../entity/Subject";
import {Enroll} from "../entity/Enroll";
import {Teacher} from "../entity/Teacher";

export class SubjectController {

   
    private subjectRepository  = getRepository(Subject);
    private enrollRepository=getRepository(Enroll);
    private teacherRepository = getRepository(Teacher);

    async validateTeacher(subjectId,teacherId)
    {
        let valid=false;
        
        let teacher=await this.teacherRepository.findOne(teacherId);
        for(let subject of teacher.subjects)
        {
            if(subject.id==subjectId)
            {
                valid=true;
                break;
            }
        }
        return valid;
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.subjectRepository.find();
    }
    

    async one(request: Request, response: Response, next: NextFunction) {
        return this.subjectRepository.findOne(request.params.subjectId);
    }
    async listSubjects(request: Request, response: Response, next: NextFunction) {
        if (request.role != 'TEACHER')
            response.status(403).send('UnAuthorised Login as Teacher');
        let user = await this.teacherRepository.findOne(request.teacherId);
        return user.subjects;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let teacher=await this.teacherRepository.findOne(request.teacherId);
        return this.subjectRepository.save({...request.body,teacher});
    }
    
    async update(request: Request, response: Response, next: NextFunction) {
        let valid= await this.validateTeacher(request.params.subjectId,request.teacherId);
        if(valid)
        {
            let subjectToUpdate = await this.subjectRepository.findOne(request.params.subjectId);
            return this.subjectRepository.save({...subjectToUpdate, ...request.body});
        }
        else
         response.status(403).send('UnAuthorised');

    }

    async remove(request: Request, response: Response, next: NextFunction) {
       
        //To do set teacherId in session middleware
        let valid= await this.validateTeacher(request.params.subjectId,request.teacherId);
        if(valid)
        {
            let subjectToRemove = await this.subjectRepository.findOne(request.params.subjectId);
        
            await this.subjectRepository.remove(subjectToRemove);
            await this.enrollRepository.delete({ subjectId : request.params.subjectId });            
        }
        else
        {
            response.status(403).send('UnAuthorised');
        }
         
         
    }

    
}