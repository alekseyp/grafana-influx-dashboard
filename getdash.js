/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (int ARGS variable)
 */

// Accessable variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;


return function scriptedDashboard (callback) {
  'use strict';

  require(['getdash/getdash.app'], function getDahs (dash) {

    // GET variables
    var displayHost = '';
    var displayMetric = '';
    var displayTime;

    // sanitize :: String -> new String
    var sanitize = function sanitize (str) {
      return str.replace(/[^\w\s-,.]/gi, '');
    };

    if(!_.isUndefined(ARGS.host))
      displayHost = sanitize(ARGS.host);

    if(!_.isUndefined(ARGS.metric))
      displayMetric = sanitize(ARGS.metric);

    if(!_.isUndefined(ARGS.time))
      displayTime = sanitize(ARGS.time);

    // Dashboard configuration
    var dashConf = {
      host: displayHost,
      metric: displayMetric,
      time: displayTime,
      title: 'Grafana - Scripted Dashboard for ' + displayHost,
      // Queries used to get list of all hosts. Query must match series string between
      // hostname and end of the series string.
      defaultQueries: [ '/\\/load\\/load$/', ],
    };

    dash.get(dashConf, callback);
  });
};
