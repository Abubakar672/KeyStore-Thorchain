export class TransactionDTO {
  count;
  actions;
}



export class Transaction {
  pool;
  type; // TODO -> enum this
  status; // TODO -> enum this
  in;
  out;
  date;
  height;
  events;
}
