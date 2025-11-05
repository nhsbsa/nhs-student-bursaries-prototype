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
    res.redirect('/change-of-circumstances/V4/apply/partner-details-check');
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
    res.redirect('/change-of-circumstances/V4/apply/are-you-independent-reason');

  } else if (
    isNowIndependent === 'No' && (wasAssessedOn === 'partner' || wasAssessedOn === 'oneParent' || wasAssessedOn === 'twoParents')
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parents-living-together');

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
  const wasAssessedOn = req.session.data['wasAssessedOn']

  if (
    parentsLivingTogether === 'Yes'
  ) {
    if (wasAssessedOn === 'twoParents') {
      res.redirect('/change-of-circumstances/V4/apply/which-parents-do-you-live-with');
    }
    else if (wasAssessedOn === 'oneParent') {
      res.redirect('/change-of-circumstances/V4/apply/living-with-same-parent');
    }
    else {
      res.redirect('/change-of-circumstances/V4/apply/parent-1-name');
    }

  } else if (
    parentsLivingTogether === 'No'
  ) {
    if (wasAssessedOn === 'twoParents') {
      res.redirect('/change-of-circumstances/V4/apply/WIP which-parent-do-you-live-with');
    }
    else if (wasAssessedOn === 'oneParent') {
      res.redirect('/change-of-circumstances/V4/apply/living-with-same-parent');
    }
    else {
      res.redirect('/change-of-circumstances/V4/apply/explanation');
    }

  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/parents-living-together');
  }

})


router.post('/apply/which-parents-do-you-live-with-route', (req, res) => {

  const whichParentsStillLivingWith = req.session.data['whichParentsStillLivingWith']

  if (
    whichParentsStillLivingWith === 'both'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/which-parents-income-changed');

    // OTHER ELSEIFs TO GO HERE....

  } else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/are-you-independent');
  }

})


router.post('/apply/which-parents-income-changed-route', (req, res) => {

  const whichParentsIncomeChanged = req.session.data['whichParentsIncomeChanged']

  if (
    whichParentsIncomeChanged === 'both'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parents-details-check');
  }

  else if (
    whichParentsIncomeChanged === 'onlyParent1' || whichParentsIncomeChanged === 'onlyParent2'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-details-check');
  }

  else {
    // If user selects no option, stay on this page
    res.redirect('/change-of-circumstances/V4/apply/which-parents-income-changed');
  }

})


router.post('/apply/parents-details-check-route', (req, res) => {

  const whichParentsIncomeChanged = req.session.data['whichParentsIncomeChanged']

  if (
    whichParentsIncomeChanged === 'both' || whichParentsIncomeChanged === 'onlyParent1' || whichParentsIncomeChanged === 'onlyParent2'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/explanation?reasonOptional=true');
  }

  else {
    // Stay on this page
    res.redirect('/change-of-circumstances/V4/apply/parents-details-check');
  }

})


router.post('/apply/parent-details-check-route', (req, res) => {

  const whichParentsIncomeChanged = req.session.data['whichParentsIncomeChanged']

  if (
    whichParentsIncomeChanged === 'onlyParent1' || whichParentsIncomeChanged === 'onlyParent2'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/explanation?reasonOptional=true');
  }

  else {
    // Stay on this page
    res.redirect('/change-of-circumstances/V4/apply/parent-details-check');
  }

})


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
