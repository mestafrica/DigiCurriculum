import { fetchStatistics } from "../service/statisticsService.js";

export const getStatistics = async (req, res) => {
    try {
        const statistics = await fetchStatistics();
        res.status(200).json({ success: true, data: statistics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};