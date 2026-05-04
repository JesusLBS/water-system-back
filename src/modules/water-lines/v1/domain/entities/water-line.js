class WaterLine {
  constructor(id, name, status, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

class WaterLineShow extends WaterLine {
  constructor({ id, name, status, createdAt, updatedAt, deletedAt, waterTakesCount }) {
    super(id, name, status, createdAt, updatedAt);
    this.deletedAt = deletedAt;
    this.waterTakesCount = waterTakesCount;
  }

  toResponse() {
    return {
      ...super.toResponse(),
      waterTakesCount: this.waterTakesCount,
    };
  }
}

module.exports = {
  WaterLine,
  WaterLineShow,
};
