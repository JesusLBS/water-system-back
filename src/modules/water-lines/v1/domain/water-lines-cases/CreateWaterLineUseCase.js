class CreateWaterLineUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute(body) {
    const row = await this.waterLinesRepository.store(body);

    if (!row) {
      throw { statusCode: 500, message: 'Water line could not be created' };
    }

    return row;
  }
}

module.exports = CreateWaterLineUseCase;
