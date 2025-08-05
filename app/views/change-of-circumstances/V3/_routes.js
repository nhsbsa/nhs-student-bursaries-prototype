
// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for STUDENT: APPLY FOR CoC journey

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
    res.redirect('/change-of-circumstances/V3/apply/date');
  } else {
    res.redirect('/change-of-circumstances/V3/apply/changes');
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




// Routes for PROCESSOR: PROCESS APPLICATION journey

router.post('/process-application/change-summary/', (req, res) => {

  const CoCProcessorChoice = req.session.data['CoCProcessorChoice']
  const CoCScenario = req.session.data['CoCScenario']

  // COMPLETE CHANGE radio option
  if (CoCProcessorChoice === 'complete') {

    // Route for updating Address only - go straight to asking for comment
    if (CoCScenario === 'addressOnly') {
      res.redirect('/change-of-circumstances/V3/process-application/change-confirmation-comment')
    }

    // Else, payment schedule needs updating too - so ask if they want it updating automatically or manually
    else {
      res.redirect('/change-of-circumstances/V3/process-application/coc-payment-journey/payment-scheduling-required?CoCPaymentsUpdated=false')
    }
  }

  // PEND CHANGE radio option
  else if (CoCProcessorChoice === 'pend') {
    res.redirect('/change-of-circumstances/V3/process-application/pend-reason')
  }

  // DECLINE CHANGE radio option
  else if (CoCProcessorChoice === 'decline') {
    res.redirect('/change-of-circumstances/V3/process-application/decline-reason')
  }

  // Else, stay on this page (no radio selected)
  else {
    res.redirect('/change-of-circumstances/V3/process-application/change-summary')
  }

})



router.post('/process-application/coc-payment-journey/payment-scheduling-required-route/', (req, res) => {

  const CoCSchedulingChoice = req.session.data['CoCSchedulingChoice']

  // AUTOMATIC RESCHEDULE radio option
  if (CoCSchedulingChoice === 'automaticReschedule') {
    // Route for automatic payment rescheduling - go straight to asking for comment
    res.redirect('/change-of-circumstances/V3/process-application/change-confirmation-comment?CoCPaymentsUpdated=false')
  }

  // MANUAL RESCHEDULE radio option
  else if (CoCSchedulingChoice === 'manualReschedule') {
    // Route for manually payment rescheduling - go to start of manual rescheduling journey
    res.redirect('/change-of-circumstances/V3/process-application/coc-payment-journey/payment-details-locked-coc-callout')
  }

  // Else, stay on this page (no radio selected)
  else {
    res.redirect('/change-of-circumstances/V3/process-application/coc-payment-journey/payment-scheduling-required')
  }

})



router.post('/process-application/coc-payment-journey/payment-details-add-payment-route/', (req, res) => {

  // WIP - COMMENTING OUT MOST OF THIS V2-SPECIFIC CODE FOR NOW - WILL REVIEW LATER

  
  // Save state of addedPaymentType dropdown
  // const addedPaymentType = req.session.data['addedPaymentType']

  // Initialise values of each payment type being added (false, at first)
  // T2MeansTestedBursaryAdded = 'false'
  // T2ExtraWeeksAllowanceAdded = 'false'

  // Save states of constants for each payment type being added
  // if (addedPaymentType === 'meansTestedBursary') {
  //   T2MeansTestedBursaryAdded = 'true'
  // }
  // if (addedPaymentType === 'extraWeeksAllowance') {
  //   T2ExtraWeeksAllowanceAdded = 'true'
  // }

  // Pass values of added payment types so they can be shown in payment schedule.
  // Both will be shown, or one, or the other, or else neither.
  // if (T2MeansTestedBursaryAdded === 'true' && T2ExtraWeeksAllowanceAdded === 'true') {
  //   res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2MeansTestedBursaryAdded=true?T2ExtraWeeksAllowanceAdded=true')
  // }
  // else if (T2MeansTestedBursaryAdded === 'true') {
  //   res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2MeansTestedBursaryAdded=true')
  // }
  // else if (T2ExtraWeeksAllowanceAdded === 'true') {
  //   res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T2ExtraWeeksAllowanceAdded=true')
  // }
  // else {
    res.redirect('/change-of-circumstances/V3/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true')
  // }

})


router.post('/process-application/coc-payment-journey/payment-details-edit-payment-route/', (req, res) => {

    // WIP - COMMENTING OUT MOST OF THIS V2-SPECIFIC CODE FOR NOW - WILL REVIEW LATER


  // Save state of editedPaymentType dropdown
  // const editedPaymentType = req.session.data['editedPaymentType']

  // Proceed to schedule, while updating and passing the relevant Edited flag
  // if (editedPaymentType === 'meansTestedBursary') {
  //   res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T3MeansTestedBursaryEdited=true')
  // }
  // else if (editedPaymentType === 'extraWeeksAllowance') {
  //   res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true&T3ExtraWeeksAllowanceEdited=true')
  // }
  // else {
    res.redirect('/change-of-circumstances/V2/process-application/coc-payment-journey/payment-details-locked-coc-callout?CoCPaymentsUpdated=true')
  // }

})



router.post('/process-application/change-confirmation-comment-route/', (req, res) => {

  const CoCScenario = req.session.data['CoCScenario']
  const CoCSchedulingChoice = req.session.data['CoCSchedulingChoice']

  // Save input from comment textbox
  const changeProcessorComment = req.session.data['change-processor-comment']

  // Route for updating Address only
  if (CoCScenario === 'addressOnly') {
    res.redirect('/change-of-circumstances/V3/process-application/change-confirmation-address-only')
  }

  // Route for updating payments automatically
  else if (CoCSchedulingChoice === 'automaticReschedule') {
    res.redirect('/change-of-circumstances/V3/process-application/change-confirmation-auto-scheduled')
  }

  // Else, route for updating payments manually (the most complex one)
  else {
    res.redirect('/change-of-circumstances/V3/process-application/change-confirmation-manually-scheduled')
  }

})


module.exports = router;
