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
    CoCType === 'Change of p1 or p2 income' && wasAssessedOn === 'partner'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-same-partner');
  } else if (
    CoCType === 'Change of p1 or p2 income'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
    // If user selects no option, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})


router.post('/apply/living-with-same-partner-route', (req, res) => {

  const livingWithSamePartner = req.session.data['livingWithSamePartner']

  if (
    livingWithSamePartner === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');
  } else if (
    livingWithSamePartner === 'No'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/living-with-same-partner');
  }

})


router.post('/apply/living-with-partner-route', (req, res) => {

  const livingWithPartner = req.session.data['livingWithPartner']

  if (
    livingWithPartner === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');

  } else if (
    livingWithPartner === 'No'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/are-you-independent');

  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/living-with-partner');
  }

})


router.post('/apply/are-you-independent-route', (req, res) => {

  const isNowIndependent = req.session.data['isNowIndependent']
  const wasAssessedOn = req.session.data['wasAssessedOn']

  if (
    isNowIndependent === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parents-living-together');

  } else if (
    isNowIndependent === 'No' && (wasAssessedOn === 'partner' || wasAssessedOn === 'oneParent' || wasAssessedOn === 'twoParents')
  ) {
    res.redirect('/change-of-circumstances/V4/apply/are-you-independent-reason');

  } else if (
    isNowIndependent === 'No' && wasAssessedOn === 'nobody'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/coc-not-required');

  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/are-you-independent');
  }

})


router.post('/apply/parents-living-together-route', (req, res) => {

  const parentsLivingTogether = req.session.data['parentsLivingTogether']
  const wasAssessedOnParentOrPartner = req.session.data['wasAssessedOnParentOrPartner']

  if (
    parentsLivingTogether === 'yesOneParent'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-name');
  } else if (
    parentsLivingTogether === 'yesTwoParents'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-1-name');
  } else if (
    parentsLivingTogether === 'no' && wasAssessedOnParentOrPartner === 'true'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/date');
  } else if (
    parentsLivingTogether === 'no'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/coc-not-required');
  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/living-with-parents');
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
