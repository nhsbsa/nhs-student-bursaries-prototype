// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

// Scenario initialization routes for intro page
router.get('/apply/intro', (req, res) => {
  const previousSituation = req.query.previousSituation;

  // Initialize variables based on scenario
  switch (previousSituation) {
    case 'independentAlone':
      // Scenario 1: Independent student, currently assessed on themselves only
      req.session.data['previousSituation'] = 'independentAlone';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['liveWithParents'] = 'No';
      req.session.data['dependencyStatus'] = 'Independent';
      req.session.data['originalDependencyStatus'] = 'Independent';
      req.session.data['originalLivingWithPartner'] = 'No';
      req.session.data['livingWithPartner'] = 'No';
      break;

    case 'independentAndLivingWithPartner':
      // Scenario 2: Independent student, assessed alone but living with partner
      req.session.data['previousSituation'] = 'independentAndLivingWithPartner';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['liveWithParents'] = 'No';
      req.session.data['dependencyStatus'] = 'Independent';
      req.session.data['originalDependencyStatus'] = 'Independent';
      req.session.data['originalLivingWithPartner'] = 'Yes';
      req.session.data['livingWithPartner'] = 'Yes';
      break;

    case 'independentAndAssessedOnPartner':
      // Scenario 3: Independent student, assessed on partner
      req.session.data['previousSituation'] = 'independentAndAssessedOnPartner';
      req.session.data['relationshipStatus'] = 'Married or in a civil partnership';
      req.session.data['originalRelationshipStatus'] = 'Married or in a civil partnership';
      req.session.data['liveWithParents'] = 'No';
      req.session.data['dependencyStatus'] = 'Independent';
      req.session.data['originalDependencyStatus'] = 'Independent';
      break;

    case 'dependentAndAssessedOn1Parent':
      // Scenario 4: Dependent student, assessed on one parent
      req.session.data['previousSituation'] = 'dependentAndAssessedOn1Parent';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['dependencyStatus'] = 'Dependent';
      req.session.data['originalDependencyStatus'] = 'Dependent';
      req.session.data['parentAssessmentType'] = '1Parent';
      req.session.data['parentsLiveTogether'] = 'No';
      req.session.data['parentsDontLiveTogetherReason'] = 'Divorced';
      break;

    case 'dependentAndAssessedOn2Parents':
      // Scenario 5: Dependent student, assessed on two parents
      req.session.data['previousSituation'] = 'dependentAndAssessedOn2Parents';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['dependencyStatus'] = 'Dependent';
      req.session.data['originalDependencyStatus'] = 'Dependent';
      req.session.data['parentAssessmentType'] = '2Parents';
      req.session.data['parentsLiveTogether'] = 'Yes';
      break;
  }

  res.render('change-of-circumstances/V4/apply/intro');
});



router.post('/apply/changes-route', (req, res) => {

  const CoCType = req.session.data['CoCType']

  if (
    CoCType === 'Change of p1 or p2 income'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/intro-2');
    // If user selects no option, stay on this page
  } else {
    res.redirect('/change-of-circumstances/V4/apply/changes');
  }

})



// STATUS ASSESSMENT ROUTES

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
    // res.redirect('/change-of-circumstances/V4/apply/status-assessment-both-parents-died');

    //Workaround: For now, set relationship status to 'Married or in a civil partnership' until other pages are built
    req.session.data['relationshipStatus'] = 'Married or in a civil partnership';
    res.redirect('/change-of-circumstances/V4/apply/status-assessment-live-with-parents');
  }

})


router.post('/apply/status-assessment-live-with-parents-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/status-assessment-cya');

})



// TASKLIST ROUTES


router.post('/apply/tasklist-parent-or-partner-details-route', (req, res) => {
  const originalRelationshipStatus = req.session.data['originalRelationshipStatus'] || null
  const relationshipStatus = req.session.data['relationshipStatus']
  const dependencyStatus = req.session.data['dependencyStatus']
  // const originalDependencyStatus = req.session.data['originalDependencyStatus'] || null

  // If currently married or in a civil partnership
  if (relationshipStatus === 'Married or in a civil partnership') {
    // If this was already the student's original status (no change), go straight to partner CYA
    if (originalRelationshipStatus && originalRelationshipStatus === relationshipStatus) {
      res.redirect('/change-of-circumstances/V4/apply/partner-cya');
    } else {
      // Otherwise (newly married/in civil partnership) collect partner details first
      res.redirect('/change-of-circumstances/V4/apply/partner-name');
    }
  }
  // If not married but living with a partner, go to partner CYA and show livingWithPartner
  else if (req.session.data['livingWithPartner'] === 'Yes') {
    res.redirect('/change-of-circumstances/V4/apply/partner-cya');
  }

  // If dependent student, go to CYA for parents (they can never CHANGE TO dependent, so they
  // must already be dependent, therefore we must already have some parent details)
  else if (dependencyStatus === 'Dependent') {
    res.redirect('/change-of-circumstances/V4/apply/parents-cya');
  }

  // Else, independent and no partner - go to partner cya (where they can confirm if they still dont
  // LIVE WITH a partner or not)
  else {
    res.redirect('/change-of-circumstances/V4/apply/partner-cya');
  }

})



// PARTNER DETAILS ROUTES

router.post('/apply/partner-name-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/partner-email')

})


router.post('/apply/partner-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/partner-cya')

})


router.post('/apply/partner-live-with-partner-route', (req, res) => {

  const livingWithPartner = req.session.data['livingWithPartner']

  if (
    livingWithPartner === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');
  }
  else {
    {
      res.redirect('/change-of-circumstances/V4/apply/partner-cya');
    }
  }

})


router.post('/apply/partner-cya-route', (req, res) => {

  const originalLivingWithPartner = req.session.data['originalLivingWithPartner']
  const livingWithPartner = req.session.data['livingWithPartner']

  // If was living with partner and now is not, ask for evidence of no longer living together
  if (
    livingWithPartner === 'No' &&
    originalLivingWithPartner &&
    originalLivingWithPartner === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-evidence-list');
  }
  // Else, continue straight to tasklist (as in original application journey)
  else {
    res.redirect('/change-of-circumstances/V4/apply/tasklist?allSectionsComplete=true');
  }

})



// PARENTS DETAILS ROUTES

router.post('/apply/parents-live-together-route', (req, res) => {

  const parentsLiveTogether = req.session.data['parentsLiveTogether']

  if (
    parentsLiveTogether === 'Yes'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/parent-1-name');
  }
  else {
    {
      res.redirect('/change-of-circumstances/V4/apply/parent-name');
    }
  }

})



router.post('/apply/parent-email-route', (req, res) => {

  res.redirect('/change-of-circumstances/V4/apply/parents-cya')

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

  res.redirect('/change-of-circumstances/V4/apply/parents-cya')

})


module.exports = router;
