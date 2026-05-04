class User {
  constructor(uid, name, email, role, status, createdAt, updatedAt, deletedAt) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toResponse() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

class UserShow {
  constructor(uid, name, email, roleId) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.roleId = roleId;
  }
}

module.exports = {
  User,
  UserShow,
};
