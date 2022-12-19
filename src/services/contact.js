"use strict";
const db = require("../db/database").init2(
  require("../db/configs").getDatabaseConfig()
);
const moment = require("moment"); // require
const { handle, isEmpty } = require("../services/utils");
const addContact = async ({
  message,
  from,
  subject,
  number,
  email,
  date = moment().format("YYYY-MM-DD HH:mm:ss"),
}) => {
  const answer = {
    error: false,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    code: 200,
    message: "Se hizo el registro de contacto correctamente",
    data: null,
  };
  const [connection, dberror] = await handle(db.getConnection());
  if (dberror) {
    answer.error = true;
    answer.data = dberror;
    answer.message =
      "No se ha podido conectar a la base de datos, un error interno ha ocurrido, intenta más tarde.";
    return answer;
  }
  const query =
    "INSERT INTO `landing_db`.`contact` (`message`, `from`, `subject`, `number`, `email`, `date`) " +
    "VALUES(?, ?, ?, ?, ?, ?);";
  const [data, error] = await handle(
    connection.query(query, [message, from, subject, number, email, date])
  );
  connection.release();
  if (!error) {
    const insertId = data[0].insertId;
    answer.id = insertId;
    console.log(answer);
    return answer;
  }
  answer.error = true;
  answer.code = 500;
  answer.data = error;
  answer.message =
    "Sucedió un error al intentar remover el registro de la base de datos.";
  return answer;
};

