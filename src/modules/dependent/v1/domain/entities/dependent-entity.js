class Dependent {
  constructor(id, name, status, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

class DependentShow {
  constructor({ id, name, lastName, secondLastName, mobile, birthdate, age, catRelationshipId, isFamilyHead }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.secondLastName = secondLastName;
    this.mobile = mobile;
    this.birthdate = birthdate;
    this.age = age;
    this.relationshipId = catRelationshipId;
    this.isFamilyHead = isFamilyHead;
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
      isFamilyHead: !!this.isFamilyHead,
    };
  }
}

module.exports = {
  Dependent,
  DependentShow,
};
