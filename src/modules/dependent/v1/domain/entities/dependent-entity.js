class Dependent {
  constructor(id, name, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
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

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      secondLastName: this.secondLastName,
      mobile: this.mobile,
      birthdate: this.birthdate,
      age: this.age,
      relationshipId: this.relationshipId,
    };
  }
}

module.exports = {
  Dependent,
  DependentShow,
};
