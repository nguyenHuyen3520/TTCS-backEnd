const resolvers = {

    Query: {
        students: (parent, args, context) => context.mongoDataMethods.getAllUser({role: 1}),
        teachers: (parent, args, context) => context.mongoDataMethods.getAllUser({role: 2}),

        user: (parent, args, context) =>  context.mongoDataMethods.getUser(args.id),

        classes: (parent, args, context) => context.mongoDataMethods.getAllClass(),

        class: (parent, args, context) =>  context.mongoDataMethods.getClass(args.id),

        holidaySalary: (parent, args, context) =>  context.mongoDataMethods.getHolidaySalary(),

        attendance: (parent, args, context) =>  context.mongoDataMethods.getAttendance(args.id),
    },
    Class: {
        students: (parent, args, context) => context.mongoDataMethods.getStudentOfClass(args.id)
    },

    User: {
        classes: (parent, args, context) => context.mongoDataMethods.getClassOfStudent(args.id)
    },
    // Mutation
    Mutation:{
        createUser: async (parent, args, context)=> context.mongoDataMethods.createUser(args),
        createClass: async (parent, args, context)=> context.mongoDataMethods.createClass(args),
        createAttendance: async (parent, args, context)=> context.mongoDataMethods.createAttendance(args),

        DeleteUser: async (parent, args, context)=> context.mongoDataMethods.createUser(args),
        DeleteClass: async (parent, args, context)=> context.mongoDataMethods.DeleteClass(args),


    }
}

module.exports = resolvers;