// External dependencies
const e = require('express');
const express = require('express');
const session = require('express-session');
// const moment = require('moment');
const router = express.Router();



// Routes for PARENT/PARTNER: SUBMIT INCOME AND EXPENSES DETAILS journey

// Scenario initialization routes for dashboard page
router.get('/apply/dashboard', (req, res) => {
  const userType = req.query.userType;

  // Initialize variables based on scenario
  switch (userType) {
    case 'parent':
      // Scenario 1: parent

      // Variables here
      break;

    case 'partner':
      // Scenario 2: partner

      // Variables here
      break;

  }

  res.render('change-of-circumstances/V4/apply/dashboard');
});




module.exports = router;
