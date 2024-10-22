// External dependencies
const express = require("express");
const router = express.Router();

// Add your routes here - above the module.exports line
router.get("/", function (req, res) {
  res.render("index");
});


// clear session data - link in footer
router.post('/clear-session-data/', (req, res) => {
  req.session.data = {}
  res.render('index')
})

router.post('/register/v2/national-insurance-number-question-route/', (req, res) => {

  const nationalInsuranceNumberQuestion = req.session.data['national-insurance-number-question']

  if (nationalInsuranceNumberQuestion === 'No') {
    res.redirect('/register/v2/national-insurance-number-reason')
  } else {
    res.redirect('/register/v2/national-insurance-number')
  }

})

router.post('/dashboard/V4-circumstance-change/changes-route/', (req, res) => {

  res.redirect('/dashboard/V4-circumstance-change/date')

})

router.post('/dashboard/V4-circumstance-change/date-route/', (req, res) => {

  const changeCircumstance = req.session.data['change-circumstance']

  if (changeCircumstance === 'Change of relationship status') {
    res.redirect('/dashboard/V4-circumstance-change/WIP-change-relationship')
  }
  else if (changeCircumstance === 'Change of address') {
    res.redirect('/dashboard/V4-circumstance-change/change-address')
  }
  else if (changeCircumstance === 'Change of income') {
    res.redirect('/dashboard/V4-circumstance-change/WIP-change-income')
  }
  else if (changeCircumstance === 'Change of children details') {
    res.redirect('/dashboard/V4-circumstance-change/WIP-change-children-details')
  }
  else {
    res.redirect('/dashboard/V4-circumstance-change/WIP-change-other')
  }

})

// Branching example

router.post("/enrolment/secondment/", function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var nhsNumber = req.session.data["seconded-yes-no"];

  // Check whether the variable matches a condition
  if (nhsNumber == "Yes") {
    // Send user to next page
    res.redirect("/enrolment/seconded-yes");
  } else {
    // Send user to ineligible page
    res.redirect("/enrolment/courseyear");
  }
});

// Branching example
router.post("/person-assessment/intro/employment-status", function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var employmentStatus = req.session.data["employment-status"];

  // Check whether the variable matches a condition. We can also add multiple variables such as   if (nhsNumber == "employed" || nhsNumber == "unemployed"){
  // bare in mind that selecting multiple tickboxes at once may break the app if the validation doesn't match the query. So based on this example if you ticked unemployed and employed, the app will crash

  if (employmentStatus == "full-time-student") {
    // Send user to next page
    res.redirect("/person-assessment/intro/fulltime-student");
  } else {
    // Send user to next page if no input has been selected
    res.redirect("/person-assessment/intro/summary");
  }
});

router.post("/eligibility/studentloan", function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var loanEngland = req.session.data["loanengland"];

  // Check whether the variable matches a condition
  if (loanEngland == "yes-loan") {
    // Send user to next page
    res.redirect("/eligibility/branching/studentloan-yes");
  } else {
    // Send user to ineligible page
    res.redirect("/eligibility/branching/studentloan-no");
  }
});

//eligibility - nationality
router.post("/eligibility/studentloan-no", function (req, res) {
  var residency = req.session.data["residency"];
  if (residency == "uk-national") {
    res.redirect("/eligibility/branching/add-residency");
  } else if (residency == "eu-national") {
    res.redirect("/eligibility/branching/add-residency-eu");
  } else if (residency == "eea-swiss-national") {
    res.redirect("/eligibility/branching/add-residency-eea");
  } else if (residency == "none-above") {
    res.redirect("/eligibility/branching/add-residency-none");
  }
});

router.post("/eligibility/5years", function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var nhsNumber = req.session.data["5years"];

  // Check whether the variable matches a condition
  if (nhsNumber == "Yes") {
    // Send user to next page
    res.redirect("/eligibility/branching/evidence5");
  } else {
    // Send user to ineligible page
    res.redirect("/eligibility/branching/residency-table5");
  }
});

router.post("/eligibility/3years", function (req, res) {
  // Make a variable and give it the value from 'know-nhs-number'
  var nhsNumber = req.session.data["3years"];

  // Check whether the variable matches a condition
  if (nhsNumber == "Yes") {
    // Send user to next page
    res.redirect("/eligibility/branching/evidence");
  } else {
    // Send user to ineligible page
    res.redirect("/eligibility/branching/residency-table");
  }
});

//eligibility route
router.post("/eligibility/studentfinance", function (req, res) {
  var loanEngland = req.session.data["loan-england"];
  // Check whether the variable matches a condition
  if (loanEngland == "sfe-loan") {
    // Send user to next page
    res.redirect("/eligibility/branching/studentfinance-SFE");
  } else {
    // Send user to ineligible page
    res.redirect("/eligibility/branching/studentfinance-None");
  }
});

//EU fees only
router.post("/eligibility/branching/studentfinance-sfe", function (req, res) {
  var loanType = req.session.data["loan-type"];
  // Check whether the variable matches a condition
  if (loanType == "eu-loan") {
    // Send user to next page
    res.redirect("/eligibility/branching/summary-yes-eu");
  } else {
    // Send user to ineligible page
    res.redirect("/eligibility/branching/summary-yes");
  }
});

//intercalation route
router.post("/enrolment/intercalation", function (req, res) {
  var courseDetails = req.session.data["course-details"];

  //If the user checks 'yes':
  if (courseDetails == "intercalated") {
    // Send them to the previously assessed screen
    res.redirect("/enrolment/intercalating");
  } else {
    // If they check 'no' send them to the end of journey screen
    res.redirect("/enrolment/summary");
  }
});

//STATUS ASSESSMENT ROUTES (line 139-303)

// New student income bursary route
router.post("/status/newincomebursary", function (req, res) {
  var incomeBursaryNew = req.session.data["incomeBursaryNew"];

  //If the user checks 'yes':
  if (incomeBursaryNew == "yesBursaryNew") {
    // Send them to the previously assessed screen
    res.redirect("/status/newalreadyassessed");
  } else {
    // If they check 'no' send them to the end of journey screen
    res.redirect("/status/incomebursary-no");
  }
});

// Returning student income bursary route
router.post("/status/incomebursary", function (req, res) {
  var incomeBursary = req.session.data["incomeBursary"];

  //If the user checks 'yes':
  if (incomeBursary == "yesBursary") {
    // Send them to the previously assessed screen
    res.redirect("/status/newalreadyassessed");
  } else {
    // If they check 'no' send them to the end of journey screen
    res.redirect("/status/incomebursary-no");
  }
});

// Previously assessed route
router.post("/status/incomebursary-yes", function (req, res) {
  var assessmentChange = req.session.data["assessmentChange"];

  //If the user checks 'yes':
  if (assessmentChange == "yesChange") {
    // Send them to the already assessed screen
    res.redirect("/status/alreadyassessed");
  } else {
    // If they check 'no' send them to the student and income screen
    res.redirect("/status/studentandincome");
  }
});

// Returning already assessed route
router.post("/status/alreadyassessed", function (req, res) {
  var alreadyAssessed = req.session.data["alreadyAssessed"];

  //If the user checks 'yes':
  if (alreadyAssessed == "yesAssessed") {
    // Send them to the evidence screen
    res.redirect("/status/assessedevidence");
  } else {
    // If they check 'no' send them to the parents screen
    res.redirect("/status/parents");
  }
});

// New already assessed route
router.post("/status/newalreadyassessed", function (req, res) {
  var alreadyAssessedNew = req.session.data["alreadyAssessedNew"];

  //If the user checks 'yes':
  if (alreadyAssessedNew == "yesAssessedNew") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home2");
  } else {
    // If they check 'no' send them to the parents screen
    res.redirect("/status/children");
  }
});

// Parent Q route
router.post("/status/parents", function (req, res) {
  var parentStatus = req.session.data["parentStatus"];

  //If the user checks 'yes':
  if (parentStatus == "yesParent") {
    // Send them to the evidence screen
    res.redirect("/status/summary-parents");
  } else {
    // If they check 'no' send them to the relationship screen
    res.redirect("/status/estranged");
  }
});

// Relationship Q route
router.post("/status/relationship", function (req, res) {
  var relationshipStatus = req.session.data["relationshipStatus"];

  //If the user checks 'yes':
  if (relationshipStatus == "marriedCivilPartnership") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home4");
  } else if (relationshipStatus == "separated") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home5");
  } else if (relationshipStatus == "divorced") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home6");
  } else if (relationshipStatus == "widowed") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home8");
  } else {
    // If they check 'no' send them to the children screen
    res.redirect("/status/parents");
  }
});

// Children Q route
router.post("/status/children", function (req, res) {
  var parentalStatus = req.session.data["parentalStatus"];

  //If the user checks 'yes':
  if (parentalStatus == "yesChildren") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home3");
  } else {
    // If they check 'no' send them to the estranged screen
    res.redirect("/status/relationship");
  }
});

// Estranged Q route
router.post("/status/estranged", function (req, res) {
  var estrangedStatus = req.session.data["estrangedStatus"];

  //If the user checks 'yes':
  if (estrangedStatus == "yesEstranged") {
    // Send them to the evidence screen
    res.redirect("/status/summary-estranged");
  } else {
    // If they check 'no' send them to the self support screen
    res.redirect("/status/selfsupport");
  }
});

// Financial support Q route
router.post("/status/selfsupport", function (req, res) {
  var supportStatus = req.session.data["supportStatus"];

  //If the user checks 'yes':
  if (supportStatus == "yesSupport") {
    // Send them to the evidence screen
    res.redirect("/status/parents-home7");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/status/parents-home");
  }
});

// returning student route
router.post("/status/returning-student", function (req, res) {
  var checkDetails = req.session.data["checkYourDetails"];

  //If the user checks 'yes':
  if (checkDetails == "yes") {
    // Send them to the evidence screen
    res.redirect("/status/journey-finished");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/status/statusintro");
  }
});
//END OF STATUS ASSESSMENT ROUTES

// Scholarship Q route
router.post("/students/scholarship", function (req, res) {
  var supportStatus = req.session.data["scholarship"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesscholar");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/employer");
  }
});

// Employment Q route
router.post("/students/employer", function (req, res) {
  var supportStatus = req.session.data["employment"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesemp");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/self-empl");
  }
});

router.post("/students/self-empl", function (req, res) {
  var supportStatus = req.session.data["self-employed"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesselfemp");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/pens");
  }
});

router.post("/students/pensions", function (req, res) {
  var supportStatus = req.session.data["pension"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yespensions");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/bank-buildingsociety");
  }
});

router.post("/students/bank-buildingsociety", function (req, res) {
  var supportStatus = req.session.data["bank"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesbank");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/lodgings");
  }
});

router.post("/students/lodgings", function (req, res) {
  var supportStatus = req.session.data["lodgings"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yeslodgings");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/taxablebenefits");
  }
});

router.post("/students/taxablebenefits", function (req, res) {
  var supportStatus = req.session.data["benefits"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesbenefits");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/maint");
  }
});

router.post("/students/maint", function (req, res) {
  var supportStatus = req.session.data["maintenance"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesmaintenance");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/trust");
  }
});

router.post("/enrolment/secondment", function (req, res) {
  var supportStatus = req.session.data["seconded-yes-no"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/enrolment/seconded-yes");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/enrolment/courseyear");
  }
});

router.post("/students/trust", function (req, res) {
  var supportStatus = req.session.data["trust"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yestrust");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/other");
  }
});

router.post("/students/other", function (req, res) {
  var supportStatus = req.session.data["other"];

  //If the user checks 'yes':
  if (supportStatus == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/branching/yesothers");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/students/branching/evidence");
  }
});

//dependent children
router.post(
  "/person-assessment/children/dependent-children",
  function (req, res) {
    var dependentChildren = req.session.data["dependent-children"];

    //If the user checks 'yes', they go to the next screen:
    if (dependentChildren == "yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/children/name");
    } else if (dependentChildren == "no") {
      // If they check 'no' they go to a declaration
      res.redirect("/person-assessment/children/declaration");
    }
  }
);

//dependent children
router.post("/person-assessment/intro/income-assessment", function (req, res) {
  var incomeAssessment = req.session.data["income-assessment"];

  //If the user checks 'yes', they go to the next screen:
  if (incomeAssessment == "yes") {
    // Send them to the evidence screen
    res.redirect("/person-assessment/intro/employment-status");
  } else if (incomeAssessment == "no") {
    // If they check 'no' they go to a declaration
    res.redirect("/person-assessment/not-eligible");
  }
});

//person assessment income - salary
router.post("/person-assessment/income/salary-question", function (req, res) {
  var salary = req.session.data["salary"];

  //If the user checks 'yes', they go to the next screen
  if (salary == "Yes") {
    // Send them to the evidence screen
    res.redirect("/person-assessment/income/taxable-allowance-question");
  } else if (salary == "No") {
    // If they check 'no' they skip the next screen
    res.redirect("/person-assessment/income/taxable-allowance-question");
  }
});

//person assessment income - taxable allowance
router.post(
  "/person-assessment/income/taxable-allowance-question",
  function (req, res) {
    var taxableAllowance = req.session.data["taxable-allowance"];

    //If the user checks 'yes', they go to the next screen
    if (taxableAllowance == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/self-employment-question");
    } else if (taxableAllowance == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/self-employment-question");
    }
  }
);

//person assessment income - self employed
router.post(
  "/person-assessment/income/self-employment-question",
  function (req, res) {
    var selfEmployment = req.session.data["self-employment"];

    //If the user checks 'yes', they go to the next screen
    if (selfEmployment == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/maintenance-question");
    } else if (selfEmployment == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/maintenance-question");
    }
  }
);

//person assessment income - maintenance
router.post(
  "/person-assessment/income/maintenance-question",
  function (req, res) {
    var maintenance = req.session.data["maintenance"];

    //If the user checks 'yes', they go to the next screen
    if (maintenance == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/pension-question");
    } else if (maintenance == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/pension-question");
    }
  }
);

//person assessment income - pension
router.post("/person-assessment/income/pension-question", function (req, res) {
  var pension = req.session.data["pension"];

  //If the user checks 'yes', they go to the next screen
  if (pension == "Yes") {
    // Send them to the evidence screen
    res.redirect("/person-assessment/income/bank-interest-question");
  } else if (pension == "No") {
    // If they check 'no' they skip the next screen
    res.redirect("/person-assessment/income/bank-interest-question");
  }
});

//person assessment income - bank interest
router.post(
  "/person-assessment/income/bank-interest-question",
  function (req, res) {
    var bankInterest = req.session.data["bank-interest"];

    //If the user checks 'yes', they go to the next screen
    if (bankInterest == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/taxable-benefits-question");
    } else if (bankInterest == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/taxable-benefits-question");
    }
  }
);

//person assessment income - taxable benefits
router.post(
  "/person-assessment/income/taxable-benefits-question",
  function (req, res) {
    var taxableBenefits = req.session.data["taxable-benefits"];

    //If the user checks 'yes', they go to the next screen
    if (taxableBenefits == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/other-income-question");
    } else if (taxableBenefits == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/other-income-question");
    }
  }
);

//person assessment income - other unearned income
router.post(
  "/person-assessment/income/other-income-question",
  function (req, res) {
    var otherIncome = req.session.data["other-income"];

    //If the user checks 'yes', they go to the next screen
    if (otherIncome == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/lettings-profit-question");
    } else if (otherIncome == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/lettings-profit-question");
    }
  }
);

//person assessment income - lettings/lodgings profit
router.post(
  "/person-assessment/income/lettings-profit-question",
  function (req, res) {
    var lettingsProfit = req.session.data["lettings-profit"];

    //If the user checks 'yes', they go to the next screen
    if (lettingsProfit == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/income/summary");
    } else if (lettingsProfit == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/income/summary");
    }
  }
);

//person assessment expenses - personal pension
router.post(
  "/person-assessment/expenses/personal-pension-question",
  function (req, res) {
    var personalPension = req.session.data["personal-pension"];

    //If the user checks 'yes', they go to the next screen
    if (personalPension == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/income-tax-question");
    } else if (personalPension == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/income-tax-question");
    }
  }
);

//person assessment expenses - income tax
router.post(
  "/person-assessment/expenses/income-tax-question",
  function (req, res) {
    var incomeTax = req.session.data["income-tax"];

    //If the user checks 'yes', they go to the next screen
    if (incomeTax == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/other-loan-question");
    } else if (incomeTax == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/other-loan-question");
    }
  }
);

//person assessment expenses - other loan
router.post(
  "/person-assessment/expenses/other-loan-question",
  function (req, res) {
    var otherLoan = req.session.data["other-loan"];

    //If the user checks 'yes', they go to the next screen
    if (otherLoan == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/national-insurance-question");
    } else if (otherLoan == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/national-insurance-question");
    }
  }
);

//person assessment expenses -national insurance
router.post(
  "/person-assessment/expenses/national-insurance-question",
  function (req, res) {
    var nationalInsurance = req.session.data["national-insurance"];

    //If the user checks 'yes', they go to the next screen
    if (nationalInsurance == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/subscriptions-question");
    } else if (nationalInsurance == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/subscriptions-question");
    }
  }
);

//person assessment expenses - subscriptions
router.post(
  "/person-assessment/expenses/subscriptions-question",
  function (req, res) {
    var subscriptions = req.session.data["subscriptions"];

    //If the user checks 'yes', they go to the next screen
    if (subscriptions == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/employee-pension-question");
    } else if (subscriptions == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/employee-pension-question");
    }
  }
);

//person assessment expenses - employee pension
router.post(
  "/person-assessment/expenses/employee-pension-question",
  function (req, res) {
    var employeePension = req.session.data["employee-pension"];

    //If the user checks 'yes', they go to the next screen
    if (employeePension == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/mortgage-question");
    } else if (employeePension == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/mortgage-question");
    }
  }
);

//person assessment expenses - mortgage
router.post(
  "/person-assessment/expenses/mortgage-question",
  function (req, res) {
    var mortgage = req.session.data["mortgage"];

    //If the user checks 'yes', they go to the next screen
    if (mortgage == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/rent-question");
    } else if (mortgage == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/rent-question");
    }
  }
);

//person assessment expenses - rent
router.post("/person-assessment/expenses/rent-question", function (req, res) {
  var rent = req.session.data["rent"];

  //If the user checks 'yes', they go to the next screen
  if (rent == "Yes") {
    // Send them to the evidence screen
    res.redirect("/person-assessment/expenses/life-assurance-question");
  } else if (rent == "No") {
    // If they check 'no' they skip the next screen
    res.redirect("/person-assessment/expenses/life-assurance-question");
  }
});

//person assessment expenses - life assurance
router.post(
  "/person-assessment/expenses/life-assurance-question",
  function (req, res) {
    var lifeAssurance = req.session.data["life-assurance"];

    //If the user checks 'yes', they go to the next screen
    if (lifeAssurance == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/maintenance-question");
    } else if (lifeAssurance == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/maintenance-question");
    }
  }
);

//person assessment expenses - maintenance
router.post(
  "/person-assessment/expenses/maintenance-question",
  function (req, res) {
    var maintenance = req.session.data["maintenance"];

    //If the user checks 'yes', they go to the next screen
    if (maintenance == "Yes") {
      // Send them to the evidence screen
      res.redirect("/person-assessment/expenses/summary");
    } else if (maintenance == "No") {
      // If they check 'no' they skip the next screen
      res.redirect("/person-assessment/expenses/summary");
    }
  }
);

//CHILDCARE ROUTES (line 721-)

// Claim working tax credit route (annual)
router.post("/childcare-new/annual/childtaxcredit", function (req, res) {
  var childTaxCreditAnnual = req.session.data["childTaxCreditAnnual"];

  //If the user checks 'yes':
  if (childTaxCreditAnnual == "yesChildTaxCreditAnnual") {
    // Send them to the not eligible screen
    res.redirect("/childcare-new/annual/taxcredit-yes");
  } else {
    // If they check 'no' send them to the provider info screen
    res.redirect("/childcare-new/annual/providerinfo");
  }
});

// Claim working tax credit route (quarterly)
router.post("/childcare-new/quarterly/childtaxcredit", function (req, res) {
  var childTaxCreditQuarterly = req.session.data["childTaxCreditQuarterly"];

  //If the user checks 'yes':
  if (childTaxCreditQuarterly == "yesChildTaxCreditQuarterly") {
    // Send them to the not eligible screen
    res.redirect("/childcare-new/quarterly/taxcredit-yes");
  } else {
    // If they check 'no' send them to the provider info screen
    res.redirect("/childcare-new/quarterly/providerinfo");
  }
});

// Claim working tax credit route (termly)
router.post("/childcare-new/termly/childtaxcredit", function (req, res) {
  var childTaxCreditTermly = req.session.data["childTaxCreditTermly"];

  //If the user checks 'yes':
  if (childTaxCreditTermly == "yesChildTaxCreditTermly") {
    // Send them to the not eligible screen
    res.redirect("/childcare-new/termly/taxcredit-yes");
  } else {
    // If they check 'no' send them to the provider info screen
    res.redirect("/childcare-new/termly/providerinfo");
  }
});

// Childcare responsibility route (annual)
router.post(
  "/childcare-new/annual/childcareresponsibility",
  function (req, res) {
    var childcareResponsibilityAnnual =
      req.session.data["childcareResponsibilityAnnual"];

    //If the user checks 'yes':
    if (childcareResponsibilityAnnual == "yesResponsibilityAnnual") {
      // Send them to the end of the journey
      res.redirect("/childcare-new/annual/end");
    } else {
      // If they check 'no' send them to the select child screen
      res.redirect("/childcare-new/annual/selectchild");
    }
  }
);

// Childcare responsibility route (quarterly)
router.post(
  "/childcare-new/quarterly/childcareresponsibility",
  function (req, res) {
    var childcareResponsibilityQuarterly =
      req.session.data["childcareResponsibilityQuarterly"];

    //If the user checks 'yes':
    if (childcareResponsibilityQuarterly == "yesResponsibilityQuarterly") {
      // Send them to the end of the journey
      res.redirect("/childcare-new/quarterly/end");
    } else {
      // If they check 'no' send them to the select child screen
      res.redirect("/childcare-new/quarterly/selectchild");
    }
  }
);

// Childcare responsibility route (termly)
router.post(
  "/childcare-new/termly/childcareresponsibility",
  function (req, res) {
    var childcareResponsibilityTermly =
      req.session.data["childcareResponsibilityTermly"];

    //If the user checks 'yes':
    if (childcareResponsibilityTermly == "yesResponsibilityTermly") {
      // Send them to the end of the journey
      res.redirect("/childcare-new/termly/end");
    } else {
      // If they check 'no' send them to the select child screen
      res.redirect("/childcare-new/termly/selectchild");
    }
  }
);

// Additional childcare route (annual)
router.post("/childcare-new/annual/additionalchildcare", function (req, res) {
  var additionalChilcareAnnual = req.session.data["additionalChilcareAnnual"];

  //If the user checks 'yes':
  if (additionalChilcareAnnual == "yesAdditionalChildcareAnnual") {
    // Send them to the end of the journey
    res.redirect("/childcare-new/annual/addadditionalchildcare");
  } else {
    // If they check 'no' send them to the declaration screen for now
    res.redirect("/childcare-new/annual/summary");
  }
});

// Additional childcare route (quarterly)
router.post(
  "/childcare-new/quarterly/additionalchildcare",
  function (req, res) {
    var additionalChildcareQuarterly =
      req.session.data["additionalChildcareQuarterly"];

    //If the user checks 'yes':
    if (additionalChildcareQuarterly == "yesAdditionalChildcareQuarterly") {
      // Send them to the end of the journey
      res.redirect("/childcare-new/quarterly/addadditionalchildcare");
    } else {
      // If they check 'no' send them to the declaration screen for now
      res.redirect("/childcare-new/quarterly/summary");
    }
  }
);

// Additional childcare route (termly)
router.post("/childcare-new/termly/additionalchildcare", function (req, res) {
  var additionalChildcareTermly = req.session.data["additionalChildcareTermly"];

  //If the user checks 'yes':
  if (additionalChildcareTermly == "yesAdditionalChildcareTermly") {
    // Send them to the end of the journey
    res.redirect("/childcare-new/termly/addadditionalchildcare");
  } else {
    // If they check 'no' send them to the declaration screen for now
    res.redirect("/childcare-new/termly/summary");
  }
});

// Benefits route (childcare prototype)
router.post("/childcare-app/tax-credit", function (req, res) {
  var taxCredit = req.session.data["taxCredit"];

  //If the user checks 'yes':
  if (taxCredit == "yesBenefits") {
    // Send them to the not eligible screen
    res.redirect("/childcare-app/not-eligible");
  } else {
    // If they check 'no' send them to the who is your childcare provider screen
    res.redirect("/childcare-app/childcare-parental-responsibility");
  }
});

// Parental responsibility route (childcare prototype)
router.post(
  "/childcare-app/childcare-parental-responsibility",
  function (req, res) {
    var childcareParentalResponsibility =
      req.session.data["childcareParentalResponsibility"];

    //If the user checks 'yes':
    if (childcareParentalResponsibility == "Yes") {
      // Send them to the not eligible screen
      res.redirect("/childcare-app/not-eligible");
    } else {
      // If they check 'no' send them to the which children screen
      res.redirect("/childcare-app/childcare-provider");
    }
  }
);

// Registered chilcare route (childcare prototype)
router.post("/childcare-app/registered-childcare", function (req, res) {
  var registeredChildcare = req.session.data["registeredChildcare"];

  //If the user checks 'yes':
  if (registeredChildcare == "No") {
    // Send them to the not eligible screen
    res.redirect("/childcare-app/not-eligible");
  } else {
    // If they check 'no' send them to the which children screen
    res.redirect("/childcare-app/tax-credit");
  }
});

// Registered chilcare route (childcare prototype)
router.post("/childcare-app/another-childcare-provider", function (req, res) {
  var anotherProvider = req.session.data["anotherProvider"];

  //If the user checks 'yes':
  if (anotherProvider == "Yes") {
    // Send them to the not registered childcare screen
    res.redirect("/childcare-app/registered-childcare");
  } else {
    // If they check 'no' send them to the check your details screen
    res.redirect("/childcare-app/check-your-details");
  }
});

// living with the student’s other parent / legal guardian route
router.post("/relationship/living-arrangements", function (req, res) {
  var livingA = req.session.data["living-arrangements"];

  //If the user checks 'yes':
  if (livingA == "Yes") {
    // Send them to the evidence screen
    res.redirect("/relationship/person-one/name-both");
  } else {
    // If they check 'no' send them to the dependent screen
    res.redirect("/relationship/reason");
  }
});

//person assessment income - pension payments
router.post("/students/expenses/personal-pension", function (req, res) {
  var pension = req.session.data["pensionpayment"];

  //If the user checks 'yes', they go to the next screen
  if (pension == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/expenses/yes-personal-pension");
  } else if (pension == "No") {
    // If they check 'no' they skip the next screen
    res.redirect("/students/expenses/life-assurance");
  }
});

//person assessment income - life insurance
router.post("/students/expenses/life-assurance", function (req, res) {
  var pension = req.session.data["lifeassurance"];

  //If the user checks 'yes', they go to the next screen
  if (pension == "Yes") {
    // Send them to the evidence screen
    res.redirect("/students/expenses/yes-life-assurance");
  } else if (pension == "No") {
    // If they check 'no' they skip the next screen
    res.redirect("/students/expenses/mortgage-payments");
  }
});

// Children Income route
router.post("/students/Children/dependent-children", function (req, res) {
  var childrenStatus = req.session.data["childrenStatus"];

  //If the user checks 'yes':
  if (childrenStatus == "yesChildren") {
    // Send them to the evidence screen
    res.redirect("/students/Children/name");
  } else {
    // If they check 'no' send them to the estranged screen
    res.redirect("/students/income/intro");
  }
});

//PERSON 1 AND 2 SCENARIO ROUTES (LINES 1051- 1087)
//DEPENDENT PERSON 1 - DEPENDENT CHILDREN
router.post(
  "/person-assessment/scenarios/dependent-person1/children/dependent-children",
  function (req, res) {
    var dependentChildren = req.session.data["dependentChildren"];

    //If the user checks 'yes':
    if (dependentChildren == "yesChildren") {
      // Send them to the evidence screen
      res.redirect("name");
    } else {
      // If they check 'no' send them to the estranged screen
      res.redirect("declaration");
    }
  }
);
//DEPENDENT PERSON 1 AND 2 - DEPENDENT CHILDREN
router.post(
  "/person-assessment/scenarios/dependent-person1-2/person-1/children/dependent-children",
  function (req, res) {
    var dependentChildren = req.session.data["dependentChildren"];

    //If the user checks 'yes':
    if (dependentChildren == "yesChildren") {
      // Send them to the evidence screen
      res.redirect("name");
    } else {
      // If they check 'no' send them to the estranged screen
      res.redirect("declaration");
    }
  }
);

//Passenger reciving an {{ serviceName }}
router.post("/ppe/add-person/nhs-bursary", function (req, res) {
  var addPassenger = req.session.data["addPassenger"];

  //If the user checks 'yes':
  if (addPassenger == "YesPassenger") {
    // Send them to the summary screen
    res.redirect("passenger-miles");
  } else {
    // If they check 'no' send them to the end screen
    res.redirect("no-bursary");
  }
});

//Overseas placements
router.post("/ppe/add-placement/overseas", function (req, res) {
  var overseasPlacement = req.session.data["overseasPlacement"];

  //If the user checks 'yes':
  if (overseasPlacement == "overseas-yes") {
    // Send them to the vaccination screens
    res.redirect("travel-costs");
  } else {
    // If they check 'no' send them to the car hire screen
    res.redirect("car-hire");
  }
});
//is accommodation required?
router.post("/ppe/add-journey/accommodation", function (req, res) {
  var accommodationRequired = req.session.data["accommodationRequired"];

  //If the user checks 'yes':
  if (accommodationRequired == "accommodation-yes") {
    // Send them to the add accommodation
    res.redirect("/ppe/add-accommodation/which-accommodation");
  } else {
    // If they check 'no' send them to evidence upload
    res.redirect("travel-costs");
  }
});

//is there passengers?
router.post("/ppe/add-journey/passengers", function (req, res) {
  var passengersRequired = req.session.data["passengersRequired"];

  //If the user checks 'yes':
  if (passengersRequired == "passengers-yes") {
    // Send them to the add person
    res.redirect("/ppe/add-person/which-person");
  } else {
    // If they check 'no' continue with journey add accommodation
    res.redirect("travel-costs");
  }
});

//Has your term time address changed ?
router.post("/ppe/intro/address-change", function (req, res) {
  var termtimeAddress = req.session.data["termtimeAddress"];

  //If the user checks 'yes':
  if (termtimeAddress == "termtime-address-no") {
    // Send them to add new address
    res.redirect("/ppe/intro/term-time-address");
  } else {
    // If they check 'no' continue to add placement
    res.redirect("/ppe/intro/student-accommodation");
  }
});

//Which placement address? for this journey
router.post("/ppe/add-journey/pick-address", function (req, res) {
  var placementAddress = req.session.data["placementAddress"];

  //If the user checks 'yes':
  if (placementAddress == "add-new-address") {
    // Send them to add new address
    res.redirect("/ppe/add-placement/placement-address");
  } else {
    // If they check the other options continue to average mileage
    res.redirect("/ppe/add-journey/return-mileage");
  }
});

//Which passenger? for this journey
router.post("/ppe/add-person/which-person", function (req, res) {
  var passengerJourney = req.session.data["passengerJourney"];

  //If the user checks 'yes':
  if (passengerJourney == "add-new-person") {
    // Send them to add new person
    res.redirect("/ppe/add-person/name");
  } else {
    // If they check the other options continue to accommodation
    res.redirect("/ppe/add-person/passenger-miles");
  }
});

//Which accommodation? for this journey
router.post("/ppe/add-accommodation/which-accommodation", function (req, res) {
  var accommodationJourney = req.session.data["accommodationJourney"];

  //If the user checks 'yes':
  if (accommodationJourney == "add-new-accommodation") {
    // Send them to add new person
    res.redirect("/ppe/add-accommodation/dates");
  } else {
    // If they check the other options continue to travel costs
    res.redirect("/ppe/add-journey/travel-costs");
  }
});

//DSA Journeys - Previously Assessed
router.post("/dsa/previously-assessed", function (req, res) {
  var previouslyAssessed = req.session.data["previouslyAssessed"];

  //If the user checks 'yes':
  if (previouslyAssessed == "Yes") {
    // Send them to add new person
    res.redirect("/DSA/assessed-yes");
  } else {
    // If they check the other options continue to travel costs
    res.redirect("/DSA/disability");
  }
});
//DSA Journeys - Circumstances changed
router.post("/dsa/circumstances-changed", function (req, res) {
  var circumstancesChanged = req.session.data["circumstancesChanged"];

  //If the user checks 'yes':
  if (circumstancesChanged == "Yes") {
    // Send them to add new person
    res.redirect("/DSA/change-details");
  } else {
    // If they check the other options continue to travel costs
    res.redirect("/DSA/summary-assessed");
  }
});

//DSA Journeys - Equipment
router.post("/dsa/equipment", function (req, res) {
  var specialistEquipment = req.session.data["specialistEquipment"];

  //If the user checks 'yes':
  if (specialistEquipment == "Yes") {
    // Send them to add new person
    res.redirect("/DSA/equipment-list");
  } else {
    // If they check the other options continue to travel costs
    res.redirect("/DSA/summary");
  }
});

// University travel
router.post("/ppe/university-travel/study-travel", function (req, res) {
  var studyTravel = req.session.data["studyTravel"];

  //If the user checks 'yes':
  if (studyTravel == "walk") {
    // Send them to the summary screen
    res.redirect("/ppe/university-travel/summary-university");
  } else if (studyTravel == "lift") {
    // Send them to the summary screen
    res.redirect("/ppe/university-travel/summary-university");
  } else if (studyTravel == "public-transport") {
    // Send them to the return cost
    res.redirect("/ppe/university-travel/return-cost");
  } else if (studyTravel == "drive") {
    // Send them to the return mileage screen
    res.redirect("/ppe/university-travel/return-mileage");
  } else if (studyTravel == "cycle") {
    // Send them to the return mileage screen
    res.redirect("/ppe/university-travel/cycle-mileage");
  } else {
    // If they check 'no' send them to the return mileage screen
    res.redirect("/ppe/university-travel/summary-university");
  }
});

// Journey to placement travel
router.post("/ppe/add-journey/transport", function (req, res) {
  var placementTravel = req.session.data["placementTravel"];

  //If the user checks 'yes':
  if (placementTravel == "lift") {
    // Send them to the other placement
    res.redirect("/ppe/add-journey/other-placement");
  } else if (placementTravel == "walk") {
    // Send them to the other placement
    res.redirect("/ppe/add-journey/other-placement");
  } else if (placementTravel == "drive") {
    // Send them to the return mileage
    res.redirect("/ppe/add-journey/return-mileage");
  } else if (placementTravel == "public-transport") {
    // Send them to the return cost
    res.redirect("/ppe/add-journey/public-transport");
  } else if (placementTravel == "cycle") {
    // Send them to the return mileage screen
    res.redirect("/ppe/add-journey/cycle");
  }
});

// Overseas costs
router.post("/ppe/add-placement/travel-costs", function (req, res) {
  var overseasTravel = req.session.data["overseasTravel"];

  //If the user checks 'yes':
  if (overseasTravel == "travel-vaccinations") {
    // Send them to the travel vaccinations
    res.redirect("/ppe/add-placement/vaccinations");
  } else if (overseasTravel == "travel-medication") {
    // Send them to the travel medication
    res.redirect("/ppe/add-placement/medical-insurance");
  } else if (overseasTravel == "visas") {
    // Send them to the visas
    res.redirect("/ppe/add-placement/visas");
  } else if (overseasTravel == "none") {
    // Send them to the car hire
    res.redirect("/ppe/add-placement/car-hire");
  }
});

//Did you hire a car?
router.post("/ppe/add-placement/car-hire", function (req, res) {
  var carHire = req.session.data["carHire"];

  //If the user checks 'yes':
  if (carHire == "Yes") {
    // Send them to car hire cost
    res.redirect("/ppe/add-placement/carhire-cost");
  } else {
    // If they check the other options continue to summary
    res.redirect("/ppe/add-placement/placement-summary");
  }
});

//Did you travel to another placement addresses?
router.post("/ppe/add-journey/other-placement", function (req, res) {
  var otherPlacement = req.session.data["otherPlacement"];

  //If the user checks 'yes':
  if (otherPlacement == "Yes") {
    // Send them to How did you travel to your other placement address
    res.redirect("/ppe/add-journey/transport2");
  } else {
    // If they check the other options continue to Did you travel to any patients houses?
    res.redirect("/ppe/add-journey/patients");
  }
});

// Journey to other placement travel
router.post("/ppe/add-journey/transport2", function (req, res) {
  var otherPlacement = req.session.data["otherPlacement"];

  //If the user checks 'yes':
  if (otherPlacement == "lift") {
    // Send them to the patients screen
    res.redirect("/ppe/add-journey/patients");
  } else if (otherPlacement == "walk") {
    // Send them to the patients screen
    res.redirect("/ppe/add-journey/patients");
  } else if (otherPlacement == "drive") {
    // Send them to the return mileage screen
    res.redirect("/ppe/add-journey/return-mileage2");
  } else if (otherPlacement == "public-transport") {
    // Send them to the return cost
    res.redirect("/ppe/add-journey/public-transport2");
  } else if (otherPlacement == "cycle") {
    // Send them to the return mileage screen
    res.redirect("/ppe/add-journey/cycle2");
  }
});

//Did you travel to any patients houses?
router.post("/ppe/add-journey/patients", function (req, res) {
  var patientsPlacement = req.session.data["patientsPlacement"];

  //If the user checks 'yes':
  if (patientsPlacement == "Yes") {
    // Send them to How did you travel to patients houses?
    res.redirect("/ppe/add-journey/transport3");
  } else {
    // If they check the other options continue to Did you have any passengers?
    res.redirect("/ppe/add-journey/passengers");
  }
});

// Journey to other placement travel
router.post("/ppe/add-journey/transport3", function (req, res) {
  var patientsPlacement = req.session.data["patientsPlacement"];

  //If the user checks 'yes':
  if (patientsPlacement == "lift") {
    // Send them to the patients screen
    res.redirect("/ppe/add-journey/passengers");
  } else if (patientsPlacement == "walk") {
    // Send them to the patients screen
    res.redirect("/ppe/add-journey/passengers");
  } else if (patientsPlacement == "drive") {
    // Send them to the return mileage screen
    res.redirect("/ppe/add-journey/return-mileage3");
  } else if (patientsPlacement == "public-transport") {
    // Send them to the return cost
    res.redirect("/ppe/add-journey/public-transport3");
  } else if (patientsPlacement == "cycle") {
    // Send them to the return mileage screen
    res.redirect("/ppe/add-journey/cycle3");
  }
});

//Two-step verification
router.post("/MFA-SMS/2SV", function (req, res) {
  var twoSV = req.session.data["twoSV"];

  //If the user checks 'yes':
  if (twoSV == "yes") {
    // Take them to the confirm screen
    res.redirect("/MFA-SMS/signin-initial/confirm");
  } else {
    // Skip and take them to the dashboard
    res.redirect("/MFA-SMS/dashboard");
  }
});

// Extra Costs to journey
router.post("/ppe/dates-required/other-costs", function (req, res) {
  var extraCosts = req.session.data["extraCosts"];

  //If the user checks 'yes':
  if (extraCosts == "parking") {
    // Send them to the parking cost psgr
    res.redirect("/ppe/dates-required/parking-costs");
  } else if (extraCosts == "tunnels") {
    // Send them to the tunnels cost page
    res.redirect("/ppe/dates-required/tunnel-costs");
  } else if (extraCosts == "tollroads") {
    // Send them to the toll road cost page
    res.redirect("/ppe/dates-required/tollroad-costs");
  } else if (extraCosts == "other") {
    // Send them to the other cost page
    res.redirect("/ppe/dates-required/extra-costs");
  } else if (extraCosts == "none") {
    // Send them to the summary screen
    res.redirect("/ppe/dates-required/summary");
  }
});

// (Dates-requied) - How did you travel to placement?
router.post("/ppe/dates-required/transport", function (req, res) {
  var transportType = req.session.data["transportType"];

  //If the user checks 'yes':
  if (transportType == "drive") {
    // Send them to the drive miles per week page
    res.redirect("/ppe/dates-required/drive-weeks");
  } else if (transportType == "lift") {
    // Send them to the other placement question
    res.redirect("/ppe/dates-required/other-placement");
  } else if (transportType == "taxi") {
    // Send them to the taxi cost per day
    res.redirect("/ppe/dates-required/taxi");
  } else if (transportType == "public-transport") {
    // Send them to the public tansport per day
    res.redirect("/ppe/dates-required/public-transport");
  } else if (transportType == "walk") {
    // Send them to the other placement question
    res.redirect("/ppe/dates-required/other-placement");
  } else if (transportType == "cycle") {
    // Send them to the cycle miles per week page
    res.redirect("/ppe/dates-required/cycle-weeks");
  }
});

//Did you travel to another placement addresses?
router.post("/ppe/dates-required/other-placement", function (req, res) {
  var otherTransport = req.session.data["otherTransport"];

  //If the user checks 'yes':
  if (otherTransport == "Yes") {
    // Send them to How did you travel to your placement?
    res.redirect("/ppe/dates-required/other-transport");
  } else {
    // If they check the other options continue to Did you travel to any patients houses?
    res.redirect("/ppe/dates-required/patients");
  }
});

// (Dates-requied) - How did you travel to your other placement address?
router.post("/ppe/dates-required/other-transport", function (req, res) {
  var othertransportType = req.session.data["othertransportType"];

  //If the user checks 'yes':
  if (othertransportType == "drive") {
    // Send them to the drive miles per day
    res.redirect("/ppe/dates-required/otherdrive-weeks");
  } else if (othertransportType == "lift") {
    // Send them to the travel to patients house?
    res.redirect("/ppe/dates-required/patients");
  } else if (othertransportType == "taxi") {
    // Send them to the taxi per day cost
    res.redirect("/ppe/dates-required/othertaxi");
  } else if (othertransportType == "public-transport") {
    // Send them to the public transport per day
    res.redirect("/ppe/dates-required/otherpublic-transport");
  } else if (othertransportType == "walk") {
    // Send them to the travel to patients house?
    res.redirect("/ppe/dates-required/patients");
  } else if (othertransportType == "cycle") {
    // Send them to the how many miles cycled per day
    res.redirect("/ppe/dates-required/othercycle-weeks");
  }
});

//Did you travel to another placement addresses?
router.post("/ppe/dates-required/patients", function (req, res) {
  var patientsAddress = req.session.data["patientsAddress"];

  //If the user checks 'yes':
  if (patientsAddress == "Yes") {
    // Send them to How did you travel to your patients house?
    res.redirect("/ppe/dates-required/patients-transport");
  } else {
    // If they check the other options continue to passengers
    res.redirect("/ppe/dates-required/passengers");
  }
});

// (Dates-requied) - How did you travel to the patients house?
router.post("/ppe/dates-required/patients-transport", function (req, res) {
  var patientTravel = req.session.data["patientTravel"];

  //If the user checks 'yes':
  if (patientTravel == "drive") {
    // Send them to the drive miles per week page
    res.redirect("/ppe/dates-required/patientsdrive-weeks");
  } else if (patientTravel == "lift") {
    // Send them to the other placement question
    res.redirect("/ppe/dates-required/passengers");
  } else if (patientTravel == "taxi") {
    // Send them to the taxi cost per day
    res.redirect("/ppe/dates-required/patientstaxi");
  } else if (patientTravel == "patientspublic-transport") {
    // Send them to the public tansport per day
    res.redirect("/ppe/dates-required/public-transport");
  } else if (patientTravel == "walk") {
    // Send them to the other placement question
    res.redirect("/ppe/dates-required/passengers");
  } else if (patientTravel == "cycle") {
    // Send them to the cycle miles per week page
    res.redirect("/ppe/dates-required/patientscycle-weeks");
  }
});

//(dates required) Did you have any passengers?
router.post("/ppe/dates-required/passengers", function (req, res) {
  var passengersRequired = req.session.data["passengersRequired"];

  //If the user checks 'yes':
  if (passengersRequired == "Yes") {
    // Send them to How did you travel to your patients house?
    res.redirect("/ppe/add-person/name");
  } else {
    // If they check the other options continue to passengers
    res.redirect("/ppe/dates-required/other-costs");
  }
});

//PERSON 1 AND 2 - Declaring income
router.post(
  "/person-assessment/scenarios/dependent-person1/declare-income",
  function (req, res) {
    var financeDetails = req.session.data["finance-details"];

    //If the user checks 'yes':
    if (financeDetails == "yes") {
      // Send them to How did you travel to your patients house?
      res.redirect("dashboard/dashboard");
    } else {
      // If they check the other options continue to passengers
      res.redirect("not-eligible");
    }
  }
);
router.post(
  "/person-assessment/scenarios/independent-person1/declare-income",
  function (req, res) {
    var financeDetails = req.session.data["finance-details"];

    //If the user checks 'yes':
    if (financeDetails == "yes") {
      // Send them to How did you travel to your patients house?
      res.redirect("dashboard/dashboard");
    } else {
      // If they check the other options continue to passengers
      res.redirect("not-eligible");
    }
  }
);
//eligibility - uk resident 3 years
router.post("/eligibility/branching/uk-resident-3years", function (req, res) {
  var ukResidency = req.session.data["uk-residency"];

  //If the user checks 'yes':
  if (ukResidency == "yes") {
    // Send them to How did you travel to your patients house?
    res.redirect("summary-uk3years");
  } else {
    // If they check the other options continue to passengers
    res.redirect("add-residency");
  }
});

//(dates required) Did you have any passengers?
router.post("/ppe/dates-required/passengers", function (req, res) {
  var passengersRequired = req.session.data["passengersRequired"];

  //If the user checks 'yes':
  if (passengersRequired == "Yes") {
    // Send them to How did you travel to your patients house?
    res.redirect("/ppe/add-person/name");
  } else {
    // If they check the other options continue to passengers
    res.redirect("/ppe/dates-required/other-costs");
  }
});

//Do you want accommodation?
router.post("/ppe/add-accommodation/accommodation-claim", function (req, res) {
  var accommodationRequired = req.session.data["accommodationRequired"];

  //If the user checks 'yes':
  if (accommodationRequired == "Yes") {
    // Send them to Which type of accommodation did you stay in?
    res.redirect("/ppe/add-accommodation/commercial");
  } else {
    // If they check the other options return to the task list dashboard
    res.redirect("/ppe/dashboard/task-list");
  }
});

//Passenger reciving an {{ serviceName }}
router.post("/ppe/add-person/passenger-claim", function (req, res) {
  var passengersClaim = req.session.data["passengersClaim"];

  //If the user checks 'yes':
  if (passengersClaim == "Yes") {
    // Send them to the summary screen
    res.redirect("/ppe/add-person/which-person");
  } else {
    // If they check 'no' send them to the end screen
    res.redirect("/ppe/dashboard/task-list");
  }
});

// (Plan C) Extra Costs to journey Day One
router.post("/ppe/plan-c/day-one/extracosts", function (req, res) {
  var extraCosts = req.session.data["extraCosts"];

  //If the user checks 'yes':
  if (extraCosts == "parking") {
    // Send them to the parking cost psgr
    res.redirect("/ppe/plan-c/day-one/parking-costs");
  } else if (extraCosts == "tunnels") {
    // Send them to the tunnels cost page
    res.redirect("/ppe/plan-c/day-one/tunnel-costs");
  } else if (extraCosts == "tollroads") {
    // Send them to the toll road cost page
    res.redirect("/ppe/plan-c/day-one/tollroad-costs");
  } else if (extraCosts == "other") {
    // Send them to the other cost page
    res.redirect("/ppe/plan-c/day-one/other-costs");
  } else if (extraCosts == "none") {
    // Send them to the summary screen
    res.redirect("/ppe/plan-c/day-one/passengers");
  }
});

//(Plan C) Select a passenger
router.post("/ppe/plan-c/day-one/passengers", function (req, res) {
  var passengers = req.session.data["passengers"];

  //If the user checks 'yes':
  if (passengers == "yes") {
    // Send them to the summary screen
    res.redirect("/ppe/plan-c/day-one/passenger-miles");
  } else {
    // If they check 'no' send them to the end screen
    res.redirect("/ppe/plan-c/day-one/accommodation");
  }
});

// (Plan C) One of Costs for the claim period
router.post("/ppe/plan-c/day-one/oneoff-costs", function (req, res) {
  var oneoffCosts = req.session.data["oneoffCosts"];

  //If the user checks 'yes':
  if (oneoffCosts == "carhire") {
    // Send them to the parking cost psgr
    res.redirect("/ppe/plan-c/day-one/oneoff-costs/carhire");
  } else if (oneoffCosts == "visas") {
    // Send them to the tunnels cost page
    res.redirect("/ppe/plan-c/day-one//oneoff-costs/visas");
  } else if (oneoffCosts == "vaccinations") {
    // Send them to the toll road cost page
    res.redirect("/ppe/plan-c/day-one/oneoff-costs/vaccinations");
  } else if (oneoffCosts == "insurance") {
    // Send them to the other cost page
    res.redirect("/ppe/plan-c/day-one/oneoff-costs/insurance");
  } else if (oneoffCosts == "medications") {
    // Send them to the other cost page
    res.redirect("/ppe/plan-c/day-one/oneoff-costs/medications");
  } else if (oneoffCosts == "none") {
    // Send them to the summary screen
    res.redirect("/ppe/plan-c/day-one/journey");
  }
});

//(Plan C) Do you want to claim for day 1 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-one/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day one
      res.redirect("/ppe/plan-c/scenario/day-one/journey");
    } else {
      // If they check 'no' send them to day two
      res.redirect("/ppe/plan-c/scenario/day-two/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 2 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-two/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day two
      res.redirect("/ppe/plan-c/scenario/day-two/journey");
    } else {
      // If they check 'no' send them to day three
      res.redirect("/ppe/plan-c/scenario/day-three/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 3 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-three/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day three
      res.redirect("/ppe/plan-c/scenario/day-three/journey");
    } else {
      // If they check 'no' send them to the day four
      res.redirect("/ppe/plan-c/scenario/day-four/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 4 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-four/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day four
      res.redirect("/ppe/plan-c/scenario/day-four/journey");
    } else {
      // If they check 'no' send them to the day five
      res.redirect("/ppe/plan-c/scenario/day-five/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 5 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-five/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day five
      res.redirect("/ppe/plan-c/scenario/day-five/journey");
    } else {
      // If they check 'no' send them to the day six
      res.redirect("/ppe/plan-c/scenario/day-six/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 6 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-six/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day six
      res.redirect("/ppe/plan-c/scenario/day-six/journey");
    } else {
      // If they check 'no' send them to the day seven
      res.redirect("/ppe/plan-c/scenario/day-seven/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 7 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-seven/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-seven/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-eight/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 8 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-eight/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-eight/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-nine/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 9 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-nine/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-nine/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-ten/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 10 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-ten/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-ten/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-eleven/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 11 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-eleven/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-eleven/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-twelve/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 12 ? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-twelve/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-twelve/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-thirteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 13? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-thirteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-thirteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-fourteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 14? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-fourteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-fourteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-fifteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 15? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-fifteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-fifteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-sixteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 16? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-sixteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-sixteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-seventeen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 17? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-seventeen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-seventeen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-eighteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 18? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-eighteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-eighteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/day-nineteen/claim");
    }
  }
);

//(Plan C) Do you want to claim for day 19? (UR scenario)
router.post(
  "/ppe/plan-c/scenario/day-nineteen/claim",
  function (req, res) {
    var claim = req.session.data["claim"];

    //If the user checks 'yes':
    if (claim == "yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/day-nineteen/journey");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/submit");
    }
  }
);

//(Plan C) Is this the address you will live at while attending your course?
router.post(
  "/ppe/plan-c/scenario/intro/address-change",
  function (req, res) {
    var termtimeAddress = req.session.data["termtimeAddress"];

    //If the user checks 'yes':
    if (termtimeAddress == "termtime-address-yes") {
      // Send them to the journey for day seven
      res.redirect("/ppe/plan-c/scenario/intro/address-cost");
    } else {
      // If they check 'no' send them to the day eight
      res.redirect("/ppe/plan-c/scenario/intro/address-changeno");
    }
  }
);


module.exports = router;
