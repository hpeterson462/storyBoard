const pool = require('../utils/pool');

module.exports = class Project {
  id;
  title;
  pointOne;
  pointTwo;
  pointThree;
  pointFour;
  pointFive;
  pointSix;
  pointSeven;
  ownerId;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.pointOne = row.point_one;
    this.pointTwo = row.point_two;
    this.pointThree = row.point_three;
    this.pointFour = row.point_four;
    this.pointFive = row.point_five;
    this.pointSix = row.point_six;
    this.pointSeven = row.point_seven;
    this.ownerId = row.owner_id;
  }

  static async insert(project) {
    const { rows } = await pool.query(`
    INSERT INTO projects (title,
      point_one,
      point_two,
      point_three,
      point_four,
      point_five,
      point_six,
      point_seven,
      owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `
    [project.title, project.pointOne, project.pointTwo, project.pointThree, project.pointFour, project.pointFive, project.pointSix, project.pointSeven, project.ownerId]
    );

    return new Project(rows[0]);
  }

  static async getUserProjects(userId) {
    const { rows } = await pool.query(`
      SELECT * FROM projects 
      WHERE user_id = $1
      `,
      [userId]
    );

    return new Project(rows[0]);
  }

  static async updateProject(project, id) {
    const { rows } = await pool.query(`
      UPDATE projects
      SET title = $1,
        point_one = $2,
        point_two = $3,
        point_three = $4,
        point_four = $5,
        point_five = $6,
        point_six = $7,
        point_seven = $8
      WHERE id = $9 AND owner_id = $10
      RETURNING *
      `,
      [project.title, project.point_one, project.point_two, project.point_three, project.point_four, project.point_five, project.point_six, project.point_seven, project.ownerId, id]
    );

    return new Project(rows[0]);
  }

  static async deleteProject(projectId, ownerId) {
    const { rows } = await pool.query(`
      DELETE FROM projects WHERE id = $1 AND owner_id = $2
      RETURNING *
    `,
      [projectId, ownerId]
    );

    if (!rows[0]) return null;
    else return new Project(rows[0]);
  }
};
