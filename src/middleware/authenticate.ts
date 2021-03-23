
import {getRedisKey} from "../redis/redis"

export const auth=async (req,res,next)=>{
    // console.log(req.originalUrl.includes("signup") )
    if(req.originalUrl.includes("login") == true || req.originalUrl.includes("signup") == true )
    {   
        next();
    }
    else
    {
        try{
            let token=req.header('Authorization').replace('Bearer ','');
           let  session= await getRedisKey(token);
           if(session==undefined || session==null)
            {
                res.status(401).send({error: 'Invalid token'})
            }
            else
            {
                let sessionInfo=JSON.parse(session.toString());
    
                if(sessionInfo.role=='TEACHER')
                {
                    req.teacherId=sessionInfo.id;
                }
                else if(sessionInfo.role=='STUDENT')
                {
                    req.studentId=sessionInfo.id;
                }
                req.email=sessionInfo.email;
                req.role=sessionInfo.role;
                next();
            }
                
        }catch(e)
        {
            res.status(401).send({error: 'Unauthorized'})
        }
    
    }
    
    
}