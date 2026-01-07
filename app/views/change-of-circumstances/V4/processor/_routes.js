// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();


// Route for request-more-information: set CoC activity to 'pending' and redirect
router.post('/parent-income-expenses/request-more-information', (req, res) => {
  req.session.data['CoCActivityStatus'] = 'pending';

  res.redirect('/change-of-circumstances/V4/processor/student-details-locked');
});



module.exports = router;
