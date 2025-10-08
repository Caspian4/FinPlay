import React, { useState } from "react";
import {
    Coins,
    Zap,
    Waves,
    Ship,
    TrendingUp,
    Anchor,
    PlusCircle,
} from "lucide-react";
import {
    Input,
    Badge,
    Icon,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Modal,
    ModalHeader,
    ModalTitle,
    Select,
    SelectOption,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Label,
} from "./components";
import ArchiveFilters from "./ArchiveFilters";
import "./Transaction.css"
import axios from "axios";
import { useEffect } from "react";

export default function Transaction() {
    // Transactions
    const API=process.env.REACT_APP_API
    const [transactions, setTransactions] = useState([]);

    // Filters
    const [filters, setFilters] = useState({
        type: "all",
        category: "all",
        dateFrom: "",
        dateTo: "",
        search: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const getFilteredTransactions = () => {
        let filtered = [...transactions];

        if (filters.type !== "all") {
            filtered = filtered.filter((t) => t.type === filters.type);
        }
        if (filters.category !== "all") {
            filtered = filtered.filter((t) => t.category === filters.category);
        }
        if (filters.dateFrom) {
            filtered = filtered.filter((t) => t.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
            filtered = filtered.filter((t) => t.date <= filters.dateTo);
        }
        if (filters.search) {
            filtered = filtered.filter((t) =>
                t.description.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        return filtered;
    };

    // Round-up
    const [roundUpEnabled, setRoundUpEnabled] = useState(true);

    // Modals
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    // New transaction form
    const [newTransaction, setNewTransaction] = useState({
        type: "expense",
        amount: "",
        category: "",
        description: "",
    });
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo")); // â
                const token = userInfo?.token; // â

                const res = await axios.get(`${API}/api/transactions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(res.data);
            } catch (err) {
                console.error("Error fetching transactions:", err.response?.data || err);
            }
        };

        fetchTransactions();
    }, []);

    const addTransaction = async () => {
  if (!newTransaction.amount || !newTransaction.category || !newTransaction.description) return;

  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    const amountNum = Number(newTransaction.amount);

    // --- Create transaction payload ---
    const payload = {
      ...newTransaction,
      amount: amountNum,
    };

    // Round-up for expenses
    if (roundUpEnabled && newTransaction.type === "expense") {
      const roundUp = Number((Math.ceil(amountNum) - amountNum).toFixed(2));
      payload.roundUp = roundUp;
    }

    // --- Save transaction ---
    const { data: savedTransaction } = await axios.post(
        `${API}/api/transactions`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update local transactions state
    setTransactions([savedTransaction, ...transactions]);
    setNewTransaction({ type: "expense", amount: "", category: "", description: "" });
    setShowTransactionModal(false);

    // --- Fetch user's existing cards ---
    const { data: userCards } = await axios.get(
        `${API}/api/cards`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // --- TRANSACTION CARD CREATION ---
const kind = savedTransaction.type; // 'income' or 'expense'

// Validate kind before sending
if (!kind || (kind !== "income" && kind !== "expense")) {
  console.error("Transaction type is invalid, cannot create card:", kind);
  return; // do not create card
}

const subtitle = savedTransaction.description || "No description";
const amount = savedTransaction.amount || 0;
const icon = kind === "income" ? "ð°" : "âï¸";

// Determine rarity
let rarity = "common";
if (kind === "income") {
  if (amount > 10000) rarity = "legendary";
  else if (amount > 5000) rarity = "epic";
  else if (amount > 2000) rarity = "rare";
} else if (kind === "expense") {
  if (amount > 2000) rarity = "legendary";
  else if (amount > 1000) rarity = "epic";
  else if (amount > 500) rarity = "rare";
}

// Check if card exists
const existingTransactionCard = userCards.find(
  (c) => c.kind === kind && c.value === amount && c.subtitle === subtitle
);

if (!existingTransactionCard && rarity !== "common") {
  await axios.post(
      `${API}/api/cards`,
    {
      userId: userInfo._id,
      kind,
      title: kind === "income" ? `Received â¹${amount}` : `Spent â¹${amount}`,
      subtitle,
      value: amount,
      rarity,
      level: 1,
      icon,
      progress: 0,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}


    // --- TOTAL ROUND-UP CARD ---
    const totalRoundUp = transactions.reduce((sum, t) => sum + (t.roundUp || 0), 0);
    if (totalRoundUp > 0) {
      let roundUpRarity = "common";
      if (totalRoundUp > 50) roundUpRarity = "legendary";
      else if (totalRoundUp > 20) roundUpRarity = "epic";
      else if (totalRoundUp > 5) roundUpRarity = "rare";

      const existingRoundUpCard = userCards.find((c) => c.kind === "roundup");

      if (existingRoundUpCard) {
        // Update existing round-up card
        await axios.patch(
            `${API}/api/cards/${existingRoundUpCard._id}`,
          {
            title: `Total Round-up â¹${totalRoundUp.toFixed(2)}`,
            value: totalRoundUp,
            rarity: roundUpRarity,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new round-up card
        await axios.post(
            `${API}/api/cards`,
          {
            userId: userInfo._id,
            kind: "roundup",
            title: `Total Round-up â¹${totalRoundUp.toFixed(2)}`,
            subtitle: "Accumulated from all your adventures",
            value: totalRoundUp,
            rarity: roundUpRarity,
            level: 1,
            icon: "â¨",
            progress: 0,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }

  } catch (err) {
    console.error("Error adding transaction:", err.response?.data || err);
  }
};

    
    const getTotalRoundUp = () => {
        const total = transactions.reduce((sum, t) => sum + (t.roundUp || 0), 0);
        return Number(total.toFixed(2)); // â always 2 decimals
    };


    const getTotalByType = (type) => {
        return transactions
            .filter(t => t.type === type)
            .reduce((sum, t) => sum + t.amount, 0);
    };
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <h1 className="header-title">Transactions</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container">
                <div className="summary-cards">
                    <div className="card card2 p-4 text-center income">
                        <div >ð°</div>
                        <div >
                            <div >Total Treasure</div>
                            <div className="amount">â¹{getTotalByType('income').toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="card card2  p-4 text-center expense">
                        <div >âï¸</div>
                        <div >
                            <div >Storm Damage</div>
                            <div className="amount">â¹{getTotalByType('expense').toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="card card2 p-4 text-center balance">
                        <div >ð´ââ ï¸</div>
                        <div >
                            <div >Net Plunder</div>
                            <div className="amount">
                                â¹{(getTotalByType('income') - getTotalByType('expense')).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "32px 0" }}>
                    <Tabs defaultValue="transactions">
                        <TabsList>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            <TabsTrigger value="roundup">Round-up</TabsTrigger>
                        </TabsList>

                        {/* Transactions Tab */}
                        <TabsContent value="transactions" className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold treasure-glow">
                                    Transaction Log
                                </h2>
                                <Button onClick={() => setShowTransactionModal(true)}>
                                    <Icon icon={PlusCircle} /> Add Transaction
                                </Button>
                            </div>

                            {/* â Filters */}
                            <ArchiveFilters
                                filters={filters}
                                categories={[
                                    {
                                        value: "Treasure Found",
                                        label: "Treasure Found",
                                        icon: "ð°",
                                    },
                                    {
                                        value: "Bounty Reward",
                                        label: "Bounty Reward",
                                        icon: "ð´ââ ï¸",
                                    },
                                    { value: "Trade Profit", label: "Trade Profit", icon: "â" },
                                    {
                                        value: "Storm Damage",
                                        label: "Storm Damage",
                                        icon: "âï¸",
                                    },
                                    { value: "Cannon Fire", label: "Cannon Fire", icon: "ð¥" },
                                    {
                                        value: "Ship Repairs",
                                        label: "Ship Repairs",
                                        icon: "ð§",
                                    },
                                    { value: "Crew Wages", label: "Crew Wages", icon: "ð¨ââï¸" },
                                ]}
                                onChange={handleFilterChange}
                            />

                            <Card>
                                <div className="section-title">Archives</div>
                                <CardContent>
                                    <div>
                                        {getFilteredTransactions().map((transaction) => (
                                            <div
                                                key={transaction._id}   // â use _id, not id
                                                className={`transaction-item ${transaction.type === "expense" ? "expense-item" : "investment-item"
                                                    }`}
                                            >
                                                <div className="transaction-left">
                                                    {transaction.type === "income" ? "ð°" : "âï¸"}
                                                    <div className="transaction-details">
                                                        <h4>{transaction.description}</h4>
                                                        <p>
                                                            {transaction.category} â¢{" "}
                                                            {new Date(transaction.date).toLocaleDateString()} {/* â format date */}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`transaction-amount ${transaction.type === "income" ? "income" : "expense"
                                                        }`}
                                                >
                                                    {transaction.type === "income" ? "+" : "-"}â¹
                                                    {transaction.amount.toLocaleString()}
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Round-up Tab */}
                        <TabsContent value="roundup" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Icon icon={Anchor} />
                                        Round-up Treasure Collection
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">Auto Round-up</h3>
                                            <p className="text-sm">
                                                Automatically round up purchases and save the difference
                                            </p>
                                        </div>
                                        <Button
                                            variant={roundUpEnabled ? "default" : "outline"}
                                            onClick={() => setRoundUpEnabled(!roundUpEnabled)}
                                        >
                                            {roundUpEnabled ? "Enabled" : "Disabled"}
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {/* â Total Saved */}
                                        <Card className="card2 p-4 text-center">
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl font-bold income">
                                                    â¹{getTotalRoundUp().toFixed(2)}
                                                </div>
                                                <div className="text-sm">Total Saved</div>
                                            </CardContent>
                                        </Card>

                                        {/* â Transactions Count */}
                                        <Card className="card2 p-4 text-center">
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl font-bold">
                                                    {transactions.filter((t) => t.roundUp && t.roundUp > 0).length}
                                                </div>
                                                <div className="text-sm">Total Transactions with round-up</div>
                                            </CardContent>
                                        </Card>

                                        {/* â Average Saved per Transaction */}
                                        <Card className="card2 p-4 text-center">
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl font-bold">
                                                    â¹
                                                    {(
                                                        getTotalRoundUp() /
                                                        (transactions.filter((t) => t.roundUp && t.roundUp > 0).length || 1)
                                                    ).toFixed(2)}
                                                </div>
                                                <div className="text-sm">Avg per Transaction</div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </main>

            {/* Transaction Modal */}
            <Modal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
            >
                <ModalHeader>
                    <ModalTitle>Record New Adventure</ModalTitle>
                </ModalHeader>
                <div className="space-y-4">
                    <div className="form-group type-toggle">
                        <div className="toggle-buttons">
                            <button
                                type="button"
                                className={`toggle-btn ${newTransaction.type === 'expense' ? 'active' : ''}`}
                                onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense' }))}
                            >
                                âï¸ Storm (Expense)
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn ${newTransaction.type === 'income' ? 'active' : ''}`}
                                onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income' }))}
                            >
                                ð° Treasure (Income)
                            </button>
                        </div>
                    </div>


                    <div className="form-group">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={newTransaction.amount}
                            onChange={(e) =>
                                setNewTransaction({ ...newTransaction, amount: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={newTransaction.category}
                            onChange={(value) =>
                                setNewTransaction({ ...newTransaction, category: value })
                            }
                        >
                            <SelectOption value="">Select category</SelectOption>
                            {newTransaction.type === "income" ? (
                                <>
                                    <SelectOption value="Treasure Found">
                                        Treasure Found
                                    </SelectOption>
                                    <SelectOption value="Bounty Reward">
                                        Bounty Reward
                                    </SelectOption>
                                    <SelectOption value="Trade Profit">
                                        Trade Profit
                                    </SelectOption>
                                </>
                            ) : (
                                <>
                                    <SelectOption value="Storm Damage">Storm Damage</SelectOption>
                                    <SelectOption value="Cannon Fire">Cannon Fire</SelectOption>
                                    <SelectOption value="Ship Repairs">Ship Repairs</SelectOption>
                                    <SelectOption value="Crew Wages">Crew Wages</SelectOption>
                                </>
                            )}
                        </Select>
                    </div>

                    <div className="form-group">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="What happened?"
                            value={newTransaction.description}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <Button onClick={addTransaction} style={{ width: "100%" }}>
                        Record Adventure
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
