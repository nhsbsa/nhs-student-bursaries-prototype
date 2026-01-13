// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();


// Route for request-more-information: set CoC activity to 'pending' and redirect
router.post('/parent-income-expenses/request-more-information', (req, res) => {
  req.session.data['CoCActivityStatus'] = 'pending';

  res.redirect('/change-of-circumstances/V4/processor/student-details-locked');
});



// Route for change-summary: redirect based on radio option selected
router.post('/change-summary-route', (req, res) => {

  const CoCProcessorChoice = req.session.data['CoCProcessorChoice']
  // const CoCScenario = req.session.data['CoCScenario']

  // COMPLETE CHANGE radio option
  if (CoCProcessorChoice === 'complete') {

      res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-scheduling-required-manual?CoCPaymentsUpdated=false')
    
  }

  // PEND CHANGE radio option
  else if (CoCProcessorChoice === 'pend') {
    res.redirect('/change-of-circumstances/V4/processor/pend-reason')
  }

  // DECLINE CHANGE radio option
  // else if (CoCProcessorChoice === 'decline') {
  //   res.redirect('/change-of-circumstances/V4/processor/decline-reason')
  // }

  // Else, stay on this page (no radio selected)
  else {
    res.redirect('/change-of-circumstances/V4/processor/change-summary')
  }

})


router.post('/update-payments-journey/payment-details-add-payment-route', (req, res) => {

  // Save state of addedPaymentType dropdown
  const addedPaymentType = req.session.data['addedPaymentType']

  // Initialise values of each payment type being added (false, at first)
  T2MeansTestedBursaryAdded = 'false'
  T2ExtraWeeksAllowanceAdded = 'false'

  // Save states of constants for each payment type being added
  if (addedPaymentType === 'meansTestedBursary') {
    T2MeansTestedBursaryAdded = 'true'
  }
  if (addedPaymentType === 'extraWeeksAllowance') {
    T2ExtraWeeksAllowanceAdded = 'true'
  }

  // Pass values of added payment types so they can be shown in payment schedule.
  // Both will be shown, or one, or the other, or else neither.
  if (T2MeansTestedBursaryAdded === 'true' && T2ExtraWeeksAllowanceAdded === 'true') {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2MeansTestedBursaryAdded=true?T2ExtraWeeksAllowanceAdded=true')
  }
  else if (T2MeansTestedBursaryAdded === 'true') {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2MeansTestedBursaryAdded=true')
  }
  else if (T2ExtraWeeksAllowanceAdded === 'true') {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2ExtraWeeksAllowanceAdded=true')
  }
  else {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true')
  }

})


router.post('/update-payments-journey/payment-details-edit-payment-route', (req, res) => {

  // Save state of editedPaymentType dropdown
  const editedPaymentType = req.session.data['editedPaymentType']

  // Proceed to schedule, while updating and passing the relevant Edited flag
  if (editedPaymentType === 'meansTestedBursary') {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T3MeansTestedBursaryEdited=true')
  }
  else if (editedPaymentType === 'extraWeeksAllowance') {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T3ExtraWeeksAllowanceEdited=true')
  }
  else {
    res.redirect('/change-of-circumstances/V4/processor/update-payments-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true')
  }

})


router.post('/change-confirmation-comment-route', (req, res) => {

  const CoCScenario = req.session.data['CoCScenario']
  const CoCSchedulingChoice = req.session.data['CoCSchedulingChoice']

  req.session.data['CoCActivityStatus'] = 'complete';

  // Save input from comment textbox
  const changeProcessorComment = req.session.data['change-processor-comment']

  // Route for updating Address only
  if (CoCScenario === 'addressOnly') {
    res.redirect('/change-of-circumstances/V4/processor/change-confirmation-address-only')
  }

  // Route for updating payments automatically
  else if (CoCSchedulingChoice === 'automaticReschedule') {
    res.redirect('/change-of-circumstances/V4/processor/change-confirmation-auto-scheduled')
  }

  // Else, route for updating payments manually (the most complex one)
  else {
    res.redirect('/change-of-circumstances/V4/processor/change-confirmation-manually-scheduled')
  }

})


module.exports = router;
