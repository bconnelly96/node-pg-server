//TODO: use dotenv for db connection strings
const Pool = require('pg').Pool;
const sqlGenerator = require('./generateSqlQueries')

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
});

function queryTable(query, response) {
    console.log(`Executing the following SQL query: <${query}>`);
    pool.query(selectQuery, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getRequest = (request, response) => {
    const tableName = request.query.tableName;
    const tableColumns = request.query.tableColumns;
    const where = request.query.where;
    const orderBy = request.query.orderBy;

    selectQuery = sqlGenerator.generateSelectQuery(tableName, tableColumns, where, orderBy);
    queryTable(selectQuery, response);
};

const postRequest = (request, response) => {
    const tableName = request.body.params.tableName;
    const tableData = request.body.params.tableData;

    insertQuery = sqlGenerator.generateInsertQuery(tableName, tableData);
    queryTable(insertQuery, response);
};

const putRequest = (request, response) => {
    const tableName = request.body.params.tableName;
    const sets = request.body.params.sets;
    const where = request.body.params.where;

    updateQuery = sqlGenerator.generateUpdateQuery(tableName, sets, where);
    queryTable(updateQuery, response);
};

const deleteRequest = (request, response) => {
    const tableName = request.query.tableName;
    const where = request.query.where;

    deleteQuery = sqlGenerator.generateDeleteQuery(tableName, where);
    queryTable(deleteQuery, response);
};

module.exports = {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};