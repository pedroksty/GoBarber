import Sequelize, { Model } from "sequelize";

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://192.168.1.4:4444/files/${this.path}`;
          }
        }
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default File;
