import Jar from "../models/jars.js";

// Create new Jar
export const createJar = async (req, res) => {
    try {
        if (!req.user || !req.user._id) return res.status(401).json({ error: "Unauthorized" });

        const jar = new Jar({ ...req.body, userId: req.user._id });
        const savedJar = await jar.save();
        console.log("Jar saved:", savedJar);
        res.status(201).json(savedJar);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// Get all jars for logged-in user
export const getAllJars = async (req, res) => {
    try {
        if (!req.user || !req.user._id) return res.status(401).json({ error: "Unauthorized" });

        const filter = { userId: req.user._id };
        const jars = await Jar.find(filter).sort({ createdAt: -1 });
        res.json(jars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Contribute to a jar
export const contributeToJar = async (req, res) => {
    try {
        const { amount } = req.body;
        const jar = await Jar.findOne({ _id: req.params.id, userId: req.user._id });
        if (!jar) return res.status(404).json({ error: "Jar not found" });

        jar.currentAmount += Number(amount);
        jar.contributions.push({ amount: Number(amount) });

        if (jar.currentAmount >= jar.goalAmount) jar.status = "completed";

        const savedJar = await jar.save();
        res.json(savedJar);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// Delete jar
export const deleteJar = async (req, res) => {
    try {
        const jar = await Jar.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!jar) return res.status(404).json({ error: "Jar not found" });
        res.json({ message: "Jar deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
