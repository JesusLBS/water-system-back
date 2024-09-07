class Dependent {
  constructor(id, name, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

class DependentShow {
  constructor({ id, name, lastName, secondLastName, mobile, birthdate, age, catRelationshipId }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.secondLastName = secondLastName;
    this.mobile = mobile;
    this.birthdate = birthdate;
    this.age = age;
    this.relationshipId = catRelationshipId;
  }
}

module.exports = {
  Dependent,
  DependentShow,
};
