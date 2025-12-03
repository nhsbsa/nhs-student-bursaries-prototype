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
    res.redirect('/change-of-circumstances/V4/apply/intro-2');
    // If user selects no option, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})


router.post('/apply/status-assessment-relationship-route', (req, res) => {

  const relationshipStatus = req.session.data['relationshipStatus']

    if (
    relationshipStatus === 'Married or in a civil partnership' ||
    relationshipStatus === 'Separated' ||
    relationshipStatus === 'Divorced' ||
    relationshipStatus === 'Widowed'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/status-assessment-live-with-parents');
    // Else, None of the above was selected.....
  } else {
    res.redirect('/change-of-circumstances/V4/apply/status-assessment-both-parents-died');
  }

})


router.post('/apply/status-assessment-live-with-parents-route', (req, res) => {

    res.redirect('/change-of-circumstances/V4/apply/status-assessment-cya');
    
})




module.exports = router;
