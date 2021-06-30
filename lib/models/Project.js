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
  }

  static async insert(project) {
    const { rows } = await pool.query(`
    INSERT INTO projects (
      title,
      point_one,
      point_two,
      point_three,
      point_four,
      point_five,
      point_six,
      point_seven
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
      [project.title, project.pointOne, project.pointTwo, project.pointThree, project.pointFour, project.pointFive, project.pointSix, project.pointSeven]
    );

    return new Project(rows[0]);
  }

  static async getUserProjectsById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM projects 
      WHERE id = $1
      `,
      [id]
    );

    if (!rows[0]) return null;
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
      WHERE AND id = $9
      RETURNING *
      `,
      [project.title, project.pointOne, project.pointTwo, project.pointThree, project.pointFour, project.pointFive, project.pointSix, project.pointSeven, id]
    );

    return new Project(rows[0]);
  }

  static async deleteProject(id) {
    const { rows } = await pool.query(`
      DELETE FROM projects 
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );

    if (!rows[0]) return null;
    return new Project(rows[0]);
  }
};
