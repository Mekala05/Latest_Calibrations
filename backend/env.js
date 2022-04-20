const mssql = require('mssql');
class DBConnection {
    async getConnection() {
        try {
            return await mssql.connect({
                user: 'sa',
                password: 'p@ssw0rd',
                server: 'localhost',
                port: 1433,
                database: 'Test_16_Dec',
                options: {
                    encrypt: false
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = new DBConnection();