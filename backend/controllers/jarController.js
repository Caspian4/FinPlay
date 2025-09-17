import Jar from "../models/Jar.js";

// Create new Jar
export const createJar = async (req, res) => {
    try {
        const jar = new Jar({ ...req.body, userId: req.user?.id || "dummyUserId" });
        await jar.save();
        res.status(201).json(jar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all jars
export const getAllJars = async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        const jars = await Jar.find(filter);
        res.json(jars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single jar by ID
export const getJarById = async (req, res) => {
    try {
        const jar = await Jar.findById(req.params.id);
        if (!jar) return res.status(404).json({ error: "Jar not found" });
        res.json(jar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Contribute to a jar
export const contributeToJar = async (req, res) => {
    try {
        const { amount } = req.body;
        const jar = await Jar.findById(req.params.id);
        if (!jar) return res.status(404).json({ error: "Jar not found" });

        jar.currentAmount += amount;
        jar.contributions.push({ amount });

        if (jar.currentAmount >= jar.goalAmount) jar.status = "completed";

        await jar.save();
        res.json(jar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update jar status manually
export const updateJarStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const jar = await Jar.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!jar) return res.status(404).json({ error: "Jar not found" });
        res.json(jar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete jar
export const deleteJar = async (req, res) => {
    try {
        const jar = await Jar.findByIdAndDelete(req.params.id);
        if (!jar) return res.status(404).json({ error: "Jar not found" });
        res.json({ message: "Jar deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createJar,
    getAllJars,
    getJarById,
    contributeToJar,
    updateJarStatus,
    deleteJar,
};