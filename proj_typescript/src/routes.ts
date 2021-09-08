
import { Response, Request} from 'express';
import CreateCourseService from './CreateCourseService';


export function createCourse(request: Request, response: Response){

  // CreateCourseService.execute("Nodejs",10,"Teste");

  CreateCourseService.execute({
    name: "NodeJS",
    educator: "teste",
  });
  
  CreateCourseService.execute({
    name: "React Native",
    educator: "Albamayang",
    duration: 8
  });

  return response.send();
}
