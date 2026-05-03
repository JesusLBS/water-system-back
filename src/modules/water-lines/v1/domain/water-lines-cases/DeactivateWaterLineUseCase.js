class DeactivateWaterLineUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute(id) {
    const result = await this.waterLinesRepository.deactivate(id);

    if (!result) {
      throw { statusCode: 404, message: 'Data not found' };
    }

    return result;
  }
}

module.exports = DeactivateWaterLineUseCase;
