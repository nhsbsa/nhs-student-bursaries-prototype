// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']
  const wasAssessedOn = req.session.data['wasAssessedOn']

  if (
    CoCType === 'Change of p1 or p2 income'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/pause-page');
    // If user selects no option, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})




module.exports = router;
