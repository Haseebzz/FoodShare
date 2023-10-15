import pg from "pg"

const connectionString =  "postgresql://postgres:FgczRnStwCsta8CHVFqV@containers-us-west-132.railway.app:6638/railway"


const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    connectionString
}
export const pool = new pg.Pool(config)