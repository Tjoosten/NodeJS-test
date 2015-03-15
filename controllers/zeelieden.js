exports.index = function(req, res) {
  MySQL.query('SELECT * FROM Zeelieden', function(err, rows, fields) {
    // MySQL output = rows.
    if (err) throw err;

    var variables = {
      "data": rows,
      'title': 'gesneuvelde zeelieden',
    }

    res.render('zeelieden/index', variables);
  });
};

exports.sailor = function(req, res) {
  MySQL.query('SELECT * FROM Zeelieden WHERE ZLID =' + req.params.id, function(err, rows, fields) {
    if (err) throw err;

    var variables = {
      "data":  rows,
      'title': 'gesneuveld voor belgie'
    }

    res.render('zeelieden/profiel', variables);
  });
}

exports.search = function(req, res) {

    console.log(req.bodyPaser.value);
}
