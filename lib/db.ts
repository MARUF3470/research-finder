const PrismaClient = require('@prisma/client').PrismaClient;


let prisma;


if (!prisma) {
    prisma = new PrismaClient();
}


const db = prisma


module.exports = db;