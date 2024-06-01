const sql = require('mssql');

const express = require('express');
const app = express();
const port = 3000;

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:clouddbazure.database.windows.net,1433;Database=AzureCloudDB;Uid=AzureDemoWS01;Pwd=AzureDemo1409;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

async function connectToDatabase() {
  try {
    // Verbinde mit der Datenbank
    await sql.connect(connectionString);
    console.log('Verbindung zur SQL Server-Datenbank erfolgreich');

    // Führe eine Abfrage aus
    const result = await sql.query`SELECT * FROM test_table`;
    const filteredResults = result.recordset.filter(row => row.id === 2);
    let t = filteredResults[0].test
    return t;
    //return result;

  } catch (err) {
    console.error('Fehler bei der Verbindung:', err);
  } finally {
    // Schließe die Verbindung
    await sql.close();
  }
}

// CORS zulassen
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route definieren, die "test" zurückgibt
app.get('/api/test', (req, res) => {
  const result = connectToDatabase();
  console.log(result);
  res.send(result);
  //res.send('test');
  
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
