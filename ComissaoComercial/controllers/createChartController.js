const createChart= require('../models/CreateChart'); // Importe o modelo

const createChartController = {
  CreateAllUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const allUserChart = await createChart.CreateAllUserChart(user);
      res.status(200).json(allUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateSellUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const sellUserChart = await createChart.CreateSellUserChart(user);
      res.status(200).json(sellUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateRenewalUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const renewalUserChart = await createChart.CreateRenewalUserChart(user);
      res.status(200).json(renewalUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateCityUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const cityUserChart = await createChart.CreateCityUserChart(user);
      res.status(200).json(cityUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateCitySellUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const cityUserChart = await createChart.CreateCitySellUserChart(user);
      res.status(200).json(cityUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateCityRenewalUserChart: async (req, res) => {
    const { user } = req.query;
    try {
      const cityRenewalUserChart = await createChart.CreateCityRenewalUserChart(user);
      res.status(200).json(cityRenewalUserChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateUserTable: async (req, res) => {
    const { user } = req.query;
    try {
      const userTable = await createChart.CreateUserTable(user);
      res.status(200).json(userTable);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateSectorAllChart: async (req, res) => {
    const { user } = req.query;
    try {
      const sectorAllChart = await createChart.CreateSectorAllChart(user);
      res.status(200).json(sectorAllChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateSectorSellChart: async (req, res) => {
    const { user } = req.query;
    try {
      const sectorSellChart = await createChart.CreateSectorSellChart(user);
      res.status(200).json(sectorSellChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  },
  CreateSectorRenewalChart: async (req, res) => {
    const { user } = req.query;
    try {
      const sectorRenewalChart = await createChart.CreateSectorRenewalChart(user);
      res.status(200).json(sectorRenewalChart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar valores do Gráfico. '+error });
    }
  }
};

module.exports = createChartController;