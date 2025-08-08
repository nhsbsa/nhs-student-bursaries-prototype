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


// Routes for STUDENT: APPLY FOR CoC - Income questions

// Employment income
router.post('/apply/income/employment', (req, res) => {
  if (req.body['employment'] === 'No') {
    req.session.data['employment-amount'] = 'None';
  } else {
    req.session.data['employment-amount'] = req.body['employment-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Self-employment income
router.post('/apply/income/self-employment', (req, res) => {
  if (req.body['selfemployment'] === 'No') {
    req.session.data['self-employment-amount'] = 'None';
  } else {
    req.session.data['self-employment-amount'] = req.body['self-employment-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Pension payments
router.post('/apply/income/pension', (req, res) => {
  if (req.body['pension'] === 'No') {
    req.session.data['pension-amount'] = 'None';
  } else {
    req.session.data['pension-amount'] = req.body['pension-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Rental income
router.post('/apply/income/rent', (req, res) => {
  if (req.body['rent'] === 'No') {
    req.session.data['rent-amount'] = 'None';
  } else {
    req.session.data['rent-amount'] = req.body['rent-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Taxable state benefits
router.post('/apply/income/benefits', (req, res) => {
  if (req.body['benefits'] === 'No') {
    req.session.data['benefits-amount'] = 'None';
  } else {
    req.session.data['benefits-amount'] = req.body['benefits-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Maintenance payments
router.post('/apply/income/maintenance', (req, res) => {
  if (req.body['maintenance'] === 'No') {
    req.session.data['maintenance-amount'] = 'None';
  } else {
    req.session.data['maintenance-amount'] = req.body['maintenance-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Trust fund
router.post('/apply/income/trust-fund', (req, res) => {
  if (req.body['trust'] === 'No') {
    req.session.data['trust-fund-amount'] = 'None';
  } else {
    req.session.data['trust-fund-amount'] = req.body['trust-fund-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Other taxable income
router.post('/apply/income/other', (req, res) => {
  if (req.body['other'] === 'No') {
    req.session.data['other-amount'] = 'None';
  } else {
    req.session.data['other-amount'] = req.body['other-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});

// Sponsorship income
router.post('/apply/income/scholarship', (req, res) => {
  if (req.body['scholarship'] === 'No') {
    req.session.data['scholarship-amount'] = 'None';
  } else {
    req.session.data['scholarship-amount'] = req.body['scholarship-amount'] || '';
  }
  res.redirect('/change-of-circumstances/V3/apply/income');
});



// Routes for STUDENT: APPLY FOR CoC - Expenses questions

// Personal pension contributions
router.post('/apply/expenses/personal-pension', (req, res) => {
  if (req.body['personal-pension'] === 'no') {
    req.session.data['personal-pension-amount'] = 'None';
    req.session.data['personal-pension'] = 'no';
  } else {
    req.session.data['personal-pension-amount'] = req.body['personal-pension-amount'] || '';
    req.session.data['personal-pension'] = 'yes';
  }
  res.redirect('/change-of-circumstances/V3/apply/expenses');
});

// Life assurance payments
router.post('/apply/expenses/life-assurance', (req, res) => {
  if (req.body['life-assurance'] === 'no') {
    req.session.data['life-assurance-amount'] = 'None';
    req.session.data['life-assurance'] = 'no';
  } else {
    req.session.data['life-assurance-amount'] = req.body['life-assurance-amount'] || '';
    req.session.data['life-assurance'] = 'yes';
  }
  res.redirect('/change-of-circumstances/V3/apply/expenses');
});

// Mortgage payments
router.post('/apply/expenses/mortgage-payments', (req, res) => {
  if (req.body['mortgage'] === 'no') {
    req.session.data['mortgage-amount'] = 'None';
    req.session.data['mortgage'] = 'no';
  } else {
    req.session.data['mortgage-amount'] = req.body['mortgage-amount'] || '';
    req.session.data['mortgage'] = 'yes';
  }
  res.redirect('/change-of-circumstances/V3/apply/expenses');
});

// Rent payments
router.post('/apply/expenses/rent', (req, res) => {
  if (req.body['rent'] === 'no') {
    req.session.data['rent-amount'] = 'None';
    req.session.data['rent'] = 'no';
  } else {
    req.session.data['rent-amount'] = req.body['rent-amount'] || '';
    req.session.data['rent'] = 'yes';
  }
  res.redirect('/change-of-circumstances/V3/apply/expenses');
});

// Maintenance payments
router.post('/apply/expenses/maintenance-payments', (req, res) => {
  if (req.body['maintenance'] === 'no') {
    req.session.data['maintenance-amount'] = 'None';
    req.session.data['maintenance'] = 'no';
  } else {
    req.session.data['maintenance-amount'] = req.body['maintenance-amount'] || '';
    req.session.data['maintenance'] = 'yes';
  }
  res.redirect('/change-of-circumstances/V3/apply/expenses');
});



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

// --- Prefill logic for income/expenses questions ---

function getPrefill(value, defaultValue) {
  let checkedYes = false, checkedNo = false, amount = '';
  // If value is missing/empty/undefined and defaultValue is set, use defaultValue and preselect Yes
  if ((!value || value === '') && defaultValue) {
    checkedYes = true;
    amount = defaultValue;
  } else if (value === 'None') {
    checkedNo = true;
  } else if (value && value !== '') {
    checkedYes = true;
    amount = value;
  } else {
    checkedNo = true;
  }
  return { checkedYes, checkedNo, amount };
}

// Employment income
router.get('/apply/income/employment', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/employment', getPrefill(req.session.data['employment-amount']));
});

// Self-employment income
router.get('/apply/income/self-employment', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/self-employment', getPrefill(req.session.data['self-employment-amount']));
});

// Pension payments
router.get('/apply/income/pension', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/pension', getPrefill(req.session.data['pension-amount']));
});

// Rental income (default: None)
router.get('/apply/income/rent', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/rent', getPrefill(req.session.data['rent-amount'], 'None'));
});

// Taxable state benefits
router.get('/apply/income/benefits', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/benefits', getPrefill(req.session.data['benefits-amount']));
});

// Maintenance payments
router.get('/apply/income/maintenance', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/maintenance', getPrefill(req.session.data['maintenance-amount']));
});

// Trust fund
router.get('/apply/income/trust-fund', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/trust-fund', getPrefill(req.session.data['trust-fund-amount']));
});

// Other taxable income
router.get('/apply/income/other', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/other', getPrefill(req.session.data['other-amount']));
});

// Sponsorship income (default: £5750)
router.get('/apply/income/scholarship', (req, res) => {
  res.render('change-of-circumstances/V3/apply/income/scholarship', getPrefill(req.session.data['scholarship-amount'], '5750'));
});

// --- Prefill logic for expenses questions ---

// Personal pension contributions
router.get('/apply/expenses/personal-pension', (req, res) => {
  res.render('change-of-circumstances/V3/apply/expenses/personal-pension', getPrefill(req.session.data['personal-pension-amount']));
});

// Life assurance payments
router.get('/apply/expenses/life-assurance', (req, res) => {
  res.render('change-of-circumstances/V3/apply/expenses/life-assurance', getPrefill(req.session.data['life-assurance-amount']));
});

// Mortgage payments
router.get('/apply/expenses/mortgage-payments', (req, res) => {
  res.render('change-of-circumstances/V3/apply/expenses/mortgage-payments', getPrefill(req.session.data['mortgage-amount']));
});

// Rent payments (expenses) - default to 4280 and preselect Yes if not set
router.get('/apply/expenses/rent', (req, res) => {
  res.render(
    'change-of-circumstances/V3/apply/expenses/rent',
    getPrefill(req.session.data['rent-amount'], '4280')
  );
});

// Maintenance payments
router.get('/apply/expenses/maintenance-payments', (req, res) => {
  res.render('change-of-circumstances/V3/apply/expenses/maintenance-payments', getPrefill(req.session.data['maintenance-amount']));
});

module.exports = router;
