const dbQuery = (query, params, dbClient) => {
  return new Promise((resolve, reject) => {
    console.log('query',query);
    console.log('params',params);
    dbClient.query(query, params, (err,results) => {
        if(err) {
            console.log(err)
            reject(err);
        }
        else resolve(results)
    });
  });
};


module.exports = {
    dbQuery
}