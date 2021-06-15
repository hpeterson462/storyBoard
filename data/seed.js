const Project = require('../lib/models/Project');
const projectData = require('../data/projectData');

const seed = async () => {
  const projectsToCreate = [...projectData]
    .map(project => ({
      title: project.title,
      pointOne: project.point_one,
      pointTwo: project.point_two,
      pointThree: project.point_three,
      pointFour: project.point_four,
      pointFive: project.point_five,
      pointSix: project.point_six,
      pointSeven: project.point_seven,
      ownerId: project.owner_id
    }));

  await Promise.all(projectsToCreate.map(project => Project.insert(project)
  ));
};

module.exports = { seed };
