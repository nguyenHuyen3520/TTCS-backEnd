const {gql} = require('apollo-server-express')

const typeDefs = gql `
    scalar Date
    type User{
        id: ID!
        name: String!
        address: String
        password: String!
        role: Int!
        salary: Int
        seniority: Boolean
        classes: [Class]
    } 

    type Class {
        id: ID!
        name: String
        teacher: User
        students: [User]
        price: Int
        totalDay: Int
        startDate: Date
        schedule: [Date]
        learnedArray: [Date]
        code: String
    }

    type Class_user{
        id: ID!
        class: Class
        student: User
        checkMoney: Boolean
    }

    type Attendance{
        id: ID!
        class: Class
        students: [User]
        date: Date
    }

    type holidaySalary{
        id: ID!
        date: Date
        coefficient: Int
    }

    type salaryManager{
        id: ID!
        teacher: User 
        data: [Date]
        name: String 
    }

    #ROOT TYPE
    #Query
    type Query {
        students: [User]
        teachers: [User]
        user(id: ID): User
        classes: [Class]
        class(id: ID): Class
        holidaySalary: holidaySalary
        attendance(id: ID): Attendance    
    }

    #MUTATION
    type Mutation {
        createUser( name: String, email: String, address: String, password: String, role: Int, seniority: Boolean, salary: Int ): User
        UpdateUser(userId: ID): User
        DeleteUser(userId: ID): String

        createClass( name: String, teacherId: ID, price: Int, totalDay: Int, startDate: Date, schedule: [Date]): Class
        UpdateClass(ClassId: ID): Class
        DeleteClass(ClassId: ID): Class

        createAttendance(classId: ID, data: Date ): Attendance
        AddStudentToClass(classId: ID, studentId: ID, checkMoney: Boolean): Class_user
        DeleteStudentFromClass(classId: ID, studentId: ID): Class
    }
`

module.exports = typeDefs