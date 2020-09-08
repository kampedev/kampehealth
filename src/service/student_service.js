import { connection } from "./jsstore_con";

export class StudentService {

    constructor() {

        this.tableName = "Users";
    }

    getStudents() {
        return connection.select({
            from: this.tableName,
        })
    }

    addStudent(student) {
        return connection.insert({
            into: this.tableName,
            values: [student],
            return: true
        })
    }

    getStudentById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    removeStudent(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    clearTable(){
   return  connection.clear('Users')
   .then(response=>{
     console.log(response);

   })


    }

    updateStudentById(student) {
        return connection.update({
            in: this.tableName,
            set: {
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phone_number: student.phone_number,
                dob: student.dob,
                gender: student.gender,
                genotype: student.genotype,
                address: student.address
            },
            where: {
                id: student.id
            }
        })
    }
}
