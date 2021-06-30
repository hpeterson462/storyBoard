const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Project = require('../models/Project');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Project.insert({ ...req.body })
      .then(project => res.send(project))
      .catch(next);
  })

  .get('/user/:id', ensureAuth, (req, res, next) => {
    Project.getUserProjectsById(req.params.id)
      .then(projects => res.send(projects))
      .catch(next);
  })

  .put('/user/:id', ensureAuth, (req, res, next) => {
    Project.updateProject({ ...req.body }, req.params.id)
      .then(project => res.send(project))
      .catch(next);
  })

  .delete('/user/:id', ensureAuth, async (req, res, next) => {
    Project.deleteProject(req.params.id)
      .then(project => res.send(project))
      .catch(next);
  });
