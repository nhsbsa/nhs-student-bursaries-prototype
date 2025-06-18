
// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();


router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']

  // If user selects any option, proceed to Date question - otherwise, stay on this page
  if (
    CoCType === 'Change of relationship status' ||
    CoCType === 'Change of address' ||
    CoCType === 'Change of income' ||
    CoCType === 'Change of children details' ||
    CoCType === 'Other change'
  ) {
    res.redirect('/change-of-circumstances/v3/apply/date');
  } else {
    res.redirect('/change-of-circumstances/v3/apply/changes');
  }

})

router.post('/apply/date-route', (req, res) => {

  const CoCType = req.session.data['CoCType']

  // Route user to correct question subjourney, depending on answer to previous Change Reason question

  if (CoCType === 'Change of relationship status') {
    // res.redirect('/change-of-circumstances/V3/apply/WIP-change-relationship')
  }
  else if (CoCType === 'Change of address') {
    res.redirect('/change-of-circumstances/V3/apply/change-address')
  }
  else if (CoCType === 'Change of income') {
    // res.redirect('/change-of-circumstances/V3/apply/WIP-change-income')
    res.redirect('/change-of-circumstances/V3/apply/income')
  }
  else if (CoCType === 'Change of other income') {
    // res.redirect('/change-of-circumstances/V3/apply/WIP-change-income')
    res.redirect('/change-of-circumstances/V3/apply/income')
  }
  else if (CoCType === 'Change of children details') {
    // res.redirect('/change-of-circumstances/V3/apply/WIP-change-children-details')
    res.redirect('/change-of-circumstances/V3/apply/explanation')
  }
  else if (CoCType === 'Other change') {
    // res.redirect('/change-of-circumstances/V3/apply/WIP-change-other')
    res.redirect('/change-of-circumstances/V3/apply/explanation')
  }
  else {
    res.redirect('/change-of-circumstances/V3/apply/explanation')
  }

})

router.post('/apply/income-route', (req, res) => {

    res.redirect('/change-of-circumstances/V3/apply/expenses')

})

router.post('/apply/expenses-route', (req, res) => {

    res.redirect('/change-of-circumstances/V3/apply/explanation')

})

router.post('/apply/explanation-route', (req, res) => {

    res.redirect('/change-of-circumstances/V3/apply/summary')

})

module.exports = router;
