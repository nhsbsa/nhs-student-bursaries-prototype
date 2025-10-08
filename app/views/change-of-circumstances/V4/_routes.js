// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']

  // If user selects any option, proceed to p1 or p2 journey - otherwise, stay on this page
  if (
    CoCType === 'Change of relationship status' ||
    CoCType === 'Change of address' ||
    CoCType === 'Change of income' ||
    CoCType === 'Change of p1 or p2 income' ||
    CoCType === 'Change of children details' ||
    CoCType === 'Other change'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
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



module.exports = router;
