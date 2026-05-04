class UpdateWaterLineUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute({ id, name }) {
    const row = await this.waterLinesRepository.update({ id, name });

    if (!row) {
      throw { statusCode: 404, message: 'Water line not found' };
    }

    return row;
  }
}

module.exports = UpdateWaterLineUseCase;
