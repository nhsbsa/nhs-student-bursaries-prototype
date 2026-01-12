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


module.exports = router;
