class GetWaterLineWaterTakesUseCase {
  constructor(waterLinesRepository) {
    this.waterLinesRepository = waterLinesRepository;
  }

  async execute(waterLineId) {
    const data = await this.waterLinesRepository.getWaterTakesByWaterLine(waterLineId);

    if (!data) {
      throw { statusCode: 404, message: 'Water line not found or no data' };
    }

    return data;
  }
}

module.exports = GetWaterLineWaterTakesUseCase;
