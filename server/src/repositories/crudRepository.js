class CrudRepository {
  constructor(model) {
    this.model = model; 
  }

  async create(data) {
    return await this.model.create({ data });
  }

  async findAll(where = {}, include = {}) {
    return await this.model.findMany({ where, include });
  }

  async findById(id, include = {}) {
    return await this.model.findUnique({ where: { id }, include });
  }

  async update(id, data) {
    return await this.model.update({ where: { id }, data });
  }

  async delete(id) {
    return await this.model.delete({ where: { id } });
  }
}

module.exports = CrudRepository;
