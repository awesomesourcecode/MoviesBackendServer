var url = require('url');
var rewriteAttributeForUser = require('../../util/rewriteUser.js');

/**
 * Delete a Movie from the watchlist
 * @param  {Request}  req  Request
 * @param  {Response} res  Response
 * @return {void}          nothing
 */
var watchlistDelete = function(req, res) {
  var queryObject = url.parse(req.url, true);
  var query = queryObject.query;
  try {
    var movie = query.movie;
    rewriteAttributeForUser(req, function(user){
      var list = user.watchlist;
      user.watchlist = list.filter(function(x) { return x !== movie; });
      return user;
    },res);
  } catch (e) {
    res.writeHead(501, {'Content-Type': 'application/json'});
    res.end("You need to specify what setting to add through the query.");
  }
};

module.exports = watchlistDelete;
