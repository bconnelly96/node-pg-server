/**
 * @param {string} tableName - Name of the table to create
 * @param {object} tableColumns - Array of columns to create in the table
 * @returns {string} A valid SQL query to create a new table
 */
function generateCreateTableQuery(tableName, tableColumns) {
    var createTableQuery = "CREATE TABLE " + tableName + " (";
    for (let i = 0; i < tableColumns.length; i++) {
        createTableQuery += tableColumns[i][0];
        createTableQuery += " ";
        createTableQuery += tableColumns[i][1];
        createTableQuery += ", "
    }
    createTableQuery = createTableQuery.slice(0, -2);
    createTableQuery += ")";
    return createTableQuery;
}

/**
 * @param {string} tableName - Name of the table to insert into
 * @param {object} tableData - Map of key,value pairs where each 
 * key is the name of a data column in the table and each
 * value is the value for that column
 * @returns {string} A valid SQL query to insert row into a table
 */
function generateInsertQuery(tableName, tableData) {
    var insertQuery = "INSERT INTO " + tableName + " (";
    var valuesStr = "VALUES (";
    const dataKeys = Object.keys(tableData);
    for (let i = 0; i < dataKeys.length; i++) {
        const key = dataKeys[i];
        insertQuery += key;
        insertQuery += ", ";
        if (typeof tableData[key] === "string") {
            valuesStr += "'";
            valuesStr += tableData[key];
            valuesStr += "'";
        } else {
            valuesStr += tableData[key];
        }
        valuesStr += ", ";
    }
    insertQuery = insertQuery.slice(0, -2);
    insertQuery += ") ";
    valuesStr = valuesStr.slice(0, -2);
    valuesStr += ");";
    insertQuery += valuesStr;
    return insertQuery;
}

/**
 * @param {string} tableName - Name of the table to select from
 * @param {object} tableColumns - Array of column names to select from the table
 * @param {string} where - Raw SQL string representing a WHERE clause for the select
 * ex. "age > 28"
 * @param {string} orderBy - Raw SQL string representing an ORDER BY clause for the select
 * ex. "price DESC"
 * @returns {string} A valid SQL query to select row(s) from table
 */
function generateSelectQuery(tableName, tableColumns, where, orderBy) {
    var selectQuery = "SELECT ";
    if (tableColumns) {
        for (let i = 0; i < tableColumns.length; i++) {
            selectQuery += tableColumns[i];
            selectQuery += ", ";
        }
        selectQuery = selectQuery.slice(0, -2);
        selectQuery += " FROM ";
    } else {
        selectQuery += "* FROM ";
    }
    selectQuery += tableName;
    if (where) {
        selectQuery += " WHERE ";
        selectQuery += where;
    }
    if (orderBy) {
        selectQuery += " ORDER BY ";
        selectQuery += orderBy;
    }
    return selectQuery;
}

/**
 * @param {string} tableName - Name of the table to update
 * @param {string} sets - RAW SQL string representing a column/value relationship
 * ex. "name = 'John', age = 28, ..."
 * @param {string} where - Raw SQL string representing a WHERE clause for the update
 * @returns {string} A valid SQL query to update row(s) in table
 */
function generateUpdateQuery(tableName, sets, where) {
    var updateQuery = "UPDATE " + tableName + " ";
    updateQuery += "SET ";
    updateQuery += sets;
    updateQuery += " WHERE ";
    updateQuery += where;
    return updateQuery;
}

/**
 * @param {*} tableName - Name of the table to delete from
 * @param {*} where - Raw SQL string representing a WHERE clause for the update
 * exm. "id > 100 AND country IN ('Germany', 'France', 'USA')"
 * @returns {string} A valid SQL query to delete row(s) from table
 */
function generateDeleteQuery(tableName, where) {
    var deleteQuery = "DELETE FROM ";
    deleteQuery += tableName;
    deleteQuery += " WHERE ";
    deleteQuery += where;
    return deleteQuery;
}

module.exports = {
    generateSelectQuery,
    generateInsertQuery,
    generateUpdateQuery,
    generateDeleteQuery
};