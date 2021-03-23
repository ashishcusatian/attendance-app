import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Student} from "../entity/Student";
const sha512 = require('js-sha512').sha512;
const uuid=require('uuid-random');
import {setRedisKeyWithExpiry} from "../redis/redis"
export class StudentController {

    private studentRepository = getRepository(Student);
   
    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find();

        
    }
    

    async one(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.findOne(request.params.id);
    }

    async login(request: Request, response: Response, next: NextFunction) {
        let student=await this.studentRepository.findOne({ where:  { email : request.body.email }});
        
        if(student!=undefined)
        {
            request.body.password=sha512(request.body.password);
            if(request.body.password!=student.password)
                response.status(401).send('Incorrect password')
            else
            {
                
                let session={role:'STUDENT', id : student.id ,email: request.body.email}
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

    async signup(request: Request, response: Response, next: NextFunction) {
        console.log("signup student   ");
        let student=await this.studentRepository.findOne({ where:  { email : request.body.email }});
        console.log("signup student find done   ");
        if(student==undefined)
        {
            request.body.password=sha512(request.body.password);
            console.log("signup student undef done   ", request.body);
            return this.studentRepository.save(request.body);
        }
        else
        {
            response.status(400).send('An account exists with this email. Please login')
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let studentToRemove = await this.studentRepository.findOne(request.params.id);
        await this.studentRepository.remove(studentToRemove);
    }
}