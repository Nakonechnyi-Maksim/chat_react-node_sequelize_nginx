module.exports = class UserDto {
  user_id;
  constructor(model) {
    this.user_id = model.user_id;
  }
};
