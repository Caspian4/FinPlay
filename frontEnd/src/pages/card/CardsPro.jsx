import { useEffect, useState } from "react"
import { CardItem, CardSkeleton, CardsFilters } from "/src/pages/card/CardComponents"
import "/src/pages/card/card.css"
import axios from "axios";


export default function CardsPro() {
    useEffect(() => {
        try {
            if (window.VANTA && window.VANTA.WAVES) {
                const v = window.VANTA.WAVES({
                    el: '#vanta-bg',
                    waveHeight: 18,
                    waveSpeed: 0.5,
                    shininess: 40,
                    waveColor: 0x0066cc,
                    backgroundColor: 0x071229,
                });
                return () => { if (v && v.destroy) v.destroy(); };
            }
        } catch (e) {
            console.warn('Vanta init failed in CardsPro', e);
        }
    }, []);
    const [q, setQ] = useState({
        kind: "",
        rarity: "",
        page: 1,
        limit: 24,
        sort: "-createdAt",
    });
    const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                const API = import.meta.env.VITE_API_URL;
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                const token = userInfo?.token;
                const res = await axios.get(`${API}/api/cards`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                let items = res.data;

                // Apply filtering
                if (q.kind) items = items.filter((i) => i.kind === q.kind);
                if (q.rarity) items = items.filter((i) => i.rarity === q.rarity);

                // Apply sorting
                if (q.sort === "-createdAt") items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                if (q.sort === "createdAt") items.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

                setData({ items, total: items.length, page: 1, pages: 1 });
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        fetchCards();
    }, [q.kind, q.rarity, q.sort]); // fetch only when filters/sort change

    const load = (next = {}) => {
        setQ((prev) => ({ ...prev, ...next }));
    };

    return (
        <>
            <div id="vanta-bg" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}></div>
            <div className="fp-wrap">
            <div className="fp-header">
                <h1 style={{ fontSize: 24, fontWeight: 800 }}>Cards</h1>
                <CardsFilters
                    value={q}
                    onChange={load}
                    onReset={() => load({ kind: "", rarity: "", page: 1, sort: "-createdAt" })}
                />
            </div>

            <div className="fp-grid">
                {loading
                    ? Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)
                    : data.items.map((c, i) => <CardItem key={i} c={c} />)}
            </div>
            </div>
        </>
    );
}
