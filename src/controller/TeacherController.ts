import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Teacher} from "../entity/Teacher";
const sha512 = require('js-sha512').sha512;
const uuid=require('uuid-random');
import {setRedisKeyWithExpiry} from "../redis/redis"

export class TeacherController {

    private teacherRepository = getRepository(Teacher);
    
    
    async all(request: Request, response: Response, next: NextFunction) {
        return this.teacherRepository.find();
    }

    async login(request: Request, response: Response, next: NextFunction) {
        let teacher=await this.teacherRepository.findOne({ where:  { email : request.body.email }});
      
        if(teacher!=undefined)
        {
            request.body.password=sha512(request.body.password);
            if(request.body.password!=teacher.password)
                response.status(401).send('Incorrect password')
            else
            {
                
                let session={role:'TEACHER', id : teacher.id ,email: request.body.email}
                let fifteendays=3600*24*15
                
                let token=uuid();
                
                await setRedisKeyWithExpiry(token,fifteendays,JSON.stringify(session));
                
                return {token};
                
            }
        }
        else
        {
            response.status(401).send(`Account doesn't exist with ${request.body.email} `)
        }
           
        
    }
    async one(request: Request, response: Response, next: NextFunction) {
        return this.teacherRepository.findOne(request.params.id);
    }

    async signup(request: Request, response: Response, next: NextFunction) {
        let teacher=await this.teacherRepository.findOne({ where:  { email : request.body.email }});
        // console.log("Teahcer   ", teacher)
        if(teacher==undefined)
        {
            request.body.password=sha512(request.body.password);
            return this.teacherRepository.save(request.body);
        }
        else
        {
            response.status(400).send('An account exists with this email. Please login')
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let teacherToRemove = await this.teacherRepository.findOne(request.params.id);
        await this.teacherRepository.remove(teacherToRemove);
    }
}