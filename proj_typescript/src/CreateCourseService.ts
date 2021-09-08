
/**
 * name - string
 * duration - number
 * educator - string
 */

interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {

  // execute(name: string, duration: number, educator: string){
  //   console.log(name, duration, educator);
  // }´

  // usando a interface
  execute({name, duration = 15, educator}: Course){
    console.log(name, duration, educator);
  }

}

export default new CreateCourseService();
