// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']
  const assessedOn = req.session.data['assessedOn']

  // If user selects any option, proceed to p1 or p2 journey...
  if (
    CoCType === 'Change of relationship status' ||
    CoCType === 'Change of address' ||
    CoCType === 'Change of income' ||
    CoCType === 'Change of p1 or p2 income' ||
    CoCType === 'Change of children details' ||
    CoCType === 'Other change'
  ) {

    if (assessedOn === 'parent' || assessedOn === 'partner') {
      res.redirect('/change-of-circumstances/V4/apply/summary');
    } else {
      res.redirect('/change-of-circumstances/V4/apply/summary');
    }

    // ...Otherwise, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})


router.post('/apply/living-with-partner-route', (req, res) => {

  const livingWithParents = req.session.data['livingWithParents']

  // If user selects no option, stay on this page
  if (
    livingWithParents === 'yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');
  } else if (
    livingWithParents === 'no'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/???');
  } else {
    res.redirect('/change-of-circumstances/V4/apply/living-with-parents');
  }

})


router.post('/apply/partner-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/partner-email')

})


router.post('/apply/partner-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/summary')

})



module.exports = router;
