// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = (req, res, next) => { 
  if (req.user) return next();
  next();
};

// CRUD + Actions
router.post('/', auth, jobController.createJob);        // Create job
router.get('/', jobController.getAllJobs);              // ✅ NEW: Get all jobs
router.get('/:id', jobController.getJob);               // Get job detail
router.get('/search', jobController.searchJobs);        // Search jobs
router.post('/:id/apply', auth, jobController.applyJob);
router.post('/:id/save', auth, jobController.toggleSaveJob);


module.exports = router;
