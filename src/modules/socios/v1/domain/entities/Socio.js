class Socio {
  constructor(uid, fullName, email, totalDependents, status, createdAt, updatedAt, deletedAt) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.totalDependents = totalDependents;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toResponse() {
    return {
      uid: this.uid,
      fullName: this.fullName,
      email: this.email,
      totalDependents: this.totalDependents,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

class SocioShow {
  constructor({ User, age, totalDependents, WaterTake }) {
    this.userData = {
      uid: User.uid,
      name: User.name,
      email: User.email,
      roleId: User.catRoleId,
    };

    this.addressData = {
      address: User.Profile.Address.address,
      city: User.Profile.Address.city,
      country: User.Profile.Address.country,
    };

    this.profileData = {
      lastName: User.Profile.lastName,
      secondLastName: User.Profile.secondLastName,
      mobile: User.Profile.mobile,
      birthdate: User.Profile.birthdate,
      age,
      totalDependents,
    };

    this.waterTakeData = WaterTake
      ? {
          waterTakeId: WaterTake.id,
          waterLineId: WaterTake.waterLineId,
          waterLineName: WaterTake.WaterLine ? WaterTake.WaterLine.name : null,
          isSuspended: Boolean(WaterTake.deletedAt),
        }
      : null;
  }

  toResponse() {
    return {
      user: this.userData,
      address: this.addressData,
      profile: this.profileData,
      waterTake: this.waterTakeData,
    };
  }
}

module.exports = {
  Socio,
  SocioShow,
};
