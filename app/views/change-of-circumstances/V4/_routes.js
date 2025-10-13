// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']

  // If user selects any option, proceed to p1 or p2 journey...
  if (
    CoCType === 'Change of relationship status' ||
    CoCType === 'Change of address' ||
    CoCType === 'Change of income' ||
    CoCType === 'Change of p1 or p2 income' ||
    CoCType === 'Change of children details' ||
    CoCType === 'Other change'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');

    // ...Otherwise, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})


router.post('/apply/living-with-partner-route', (req, res) => {

  const livingWithPartner = req.session.data['livingWithPartner']

  // If user selects no option, stay on this page
  if (
    livingWithPartner === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');
  } else if (
    livingWithPartner === 'No'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-parents');
  } else {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
  }

})


router.post('/apply/living-with-parents-route', (req, res) => {

  const livingWithParents = req.session.data['livingWithParents']

  // If user selects no option, stay on this page
  if (
    livingWithParents === 'yesOneParent'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-name');
  } else if (
    livingWithParents === 'yesTwoParents'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-1-name');
  } else if (
    livingWithParents === 'no'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/coc-not-required');
  } else {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
  }

})


// router.post('/apply/who-do-you-live-with-route', (req, res) => {

//   const livingWith = req.session.data['livingWith']

//   // If user selects no option, stay on this page
//   if (
//     livingWith === 'parentOrParents'
//   ) {
//     res.redirect('/change-of-circumstances/V4/apply/parents-living-together');
//   }
//   else if (
//     livingWith === 'partner'
//   ) {
//     res.redirect('/change-of-circumstances/V4/apply/partner-name');
//   }
//   else if (livingWith === 'neither'
//   ) {
//     res.redirect('/change-of-circumstances/V4/apply/coc-not-required');
//   }
//   else {
//     res.redirect('/change-of-circumstances/V4/apply/who-do-you-live-with');
//   }

// })


router.post('/apply/coc-not-required-route', (req, res) => {

  const cocNotRequiredChoice = req.session.data['cocNotRequiredChoice']

  // If user selects no option, stay on this page
  if (
    cocNotRequiredChoice === 'changeAnswers'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/who-do-you-live-with');
  }
  else if (
    cocNotRequiredChoice === 'startNewCoC'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }
  else if (cocNotRequiredChoice === 'returnToDashboard'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/dashboard');
  }
  else {
    res.redirect('/change-of-circumstances/V4/apply/coc-not-required');
  }

})


router.post('/apply/partner-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/partner-email')

})


router.post('/apply/partner-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/summary')

})


router.post('/apply/parent-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/parent-email')

})


router.post('/apply/parent-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/summary')

})


router.post('/apply/parent-1-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/parent-1-email')

})


router.post('/apply/parent-1-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/parent-2-name')

})


router.post('/apply/parent-2-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/parent-2-email')

})


router.post('/apply/parent-2-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/summary')

})



module.exports = router;
