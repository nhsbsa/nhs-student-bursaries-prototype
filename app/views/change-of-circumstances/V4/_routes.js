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
      req.session.data['parentDependencyStatus'] = 'Independent';
      break;

    case 'independentAndLivingWithPartner':
      // Scenario 2: Independent student, assessed alone but living with partner
      req.session.data['previousSituation'] = 'independentAndLivingWithPartner';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['parentDependencyStatus'] = 'Independent';
      req.session.data['livingWithPartner'] = 'Yes';
      break;

    case 'independentAndAssessedOnPartner':
      // Scenario 3: Independent student, assessed on partner
      req.session.data['previousSituation'] = 'independentAndAssessedOnPartner';
      req.session.data['relationshipStatus'] = 'Married or in a civil partnership';
      req.session.data['originalRelationshipStatus'] = 'Married or in a civil partnership';
      req.session.data['parentDependencyStatus'] = 'Independent';
      // req.session.data['livingWithPartner'] = 'Yes';
      break;

    case 'dependentAndAssessedOn1Parent':
      // Scenario 4: Dependent student, assessed on one parent
      req.session.data['previousSituation'] = 'dependentAndAssessedOn1Parent';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['parentDependencyStatus'] = 'Dependent';
      req.session.data['parentAssessmentType'] = '1Parent';
      break;

    case 'dependentAndAssessedOn2Parents':
      // Scenario 5: Dependent student, assessed on two parents
      req.session.data['previousSituation'] = 'dependentAndAssessedOn2Parents';
      req.session.data['relationshipStatus'] = 'None of the above';
      req.session.data['originalRelationshipStatus'] = 'None of the above';
      req.session.data['parentDependencyStatus'] = 'Dependent';
      req.session.data['parentAssessmentType'] = '2Parents';
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


router.post('/apply/tasklist-parent-or-partner-details-route', (req, res) => {

  const relationshipStatus = req.session.data['relationshipStatus']
  // If now married or in a civil partnership, ask for new partner details
  if (
    relationshipStatus === 'Married or in a civil partnership'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-name');
  }
  // Else, go to parent details page
  else {
    res.redirect('/change-of-circumstances/V4/apply/parent-1-name');
  }

})


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

  const wasLivingWithPartner = req.session.data['wasLivingWithPartner']
  const livingWithPartner = req.session.data['livingWithPartner']

  // If not living with partner, ask for evidence of not living together
  if (
    livingWithPartner === 'No'
  ) {
    res.redirect('/change-of-circumstances/V4/apply/partner-evidence-list');
  }
  // Else, go to tasklist
  else {
    res.redirect('/change-of-circumstances/V4/apply/tasklist?allSectionsComplete=true');
  }

})



module.exports = router;
