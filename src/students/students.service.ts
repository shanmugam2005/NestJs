import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {

    private students:object[]=[
        {name:'shan',
        Age:19
        }
    ];

    findAll():object{
        return this.students;
    }

    create(obj:object):void{
        this.students.push(obj)
    }

}
