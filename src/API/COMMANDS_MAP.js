import RandomQuote from "./RandomQuote";
import RandomAnime from "./RandomAnime";
import IPInfo from "./IPInfo";
import FeelingLucky from "./FeelingLucky";
import Credit from "./Credit";
import AnimeSearch from "./AnimeSearch";

export default {
    "Get Random Quote": {
        func: () => fetch("https://quotes-api-self.vercel.app/quote").then(r => r.json())
            .catch(e => ({
                error: "Request Failed",
                url: "https://quotes-api-self.vercel.app/quote",
            })),
        component: RandomQuote,
        expectedTime: 0.8
    },
    "Get Random Anime to Watch": {
        func: () => fetch("https://api.tenrai.org/v1/random/anime").then(r => r.json()).then(d => {
            if (!d.data) throw Error(d?.message ?? "Unknown Error");
            return d.data;
        })
            .catch(e => ({
                error: "Request Failed",
                message: e.message,
                url: "https://api.tenrai.org/v1/random/anime",
            })),
        component: RandomAnime,
        expectedTime: 1.3
    },
    "Anime Search": {
        func: ({ query, limit = 5 }) => fetch(`https://api.tenrai.org/v1/anime?q=${encodeURI(query)}&limit=${limit}`).then(r => r.json()).then(d => {
            if (!d.data) throw Error(d?.message ?? "Unknown Error");
            return d.data;
        })
            .catch(e => ({
                error: "Request Failed",
                message: e.message,
                url: `https://api.tenrai.org/v1/anime?q=${encodeURI(query)}&limit=${limit}`,
            })),
        component: AnimeSearch,
        inputs: [
            { label: "Search Query", key: "query" },
            { label: "How Much? [Max Limit]", key: "limit", type: "select", options: [5, 10, 15, 25] }
        ],
        expectedTime: 2
    },
    "IP Info": {
        func: async (inpts) => {
            return fetch(`https://ipinfo.io/${inpts.ip}/json`, {
                headers: {
                    "Accept": "application/json"
                }
            }).then(r => r.json()).catch(e => ({
                error: "Request Failed",
                url: `https://ipinfo.io/${inpts.ip}`,
            }))
        },
        component: IPInfo,
        expectedTime: 1,
        inputs: [
            { label: "IP [Empty for yours]", key: "ip" }
        ],
    },
    "Feeling Lucky": {
        func: async () => {
            const texts = [
                "bpn333",
                "Hello World",
                "Fuck You!",
                "Hello There",
                "Lucky Click",
                "Surprise Me",
                "Random Vibes",
                "Good Energy",
                "Try Again",
                "Magic Moment",
                "Why Not?",
                "Instant Win",
                "Feeling Bold",
                "Just Clicked",
                "Pure Chance",
                "Today’s Pick",
                "Quick Smile",
                "Wildcard",
                "Let’s Go",
                "Unexpected",
                "Fortune Time",
                "Click Fate",
                "Random Joy"
            ]
            return fetch(`https://asciified.thelicato.io/api/v2/ascii?text=${encodeURI(texts[Math.floor(Math.random() * texts.length)])}`)
                .then(r => r.text())
                .catch(e => `REQUEST FAILED [https://asciified.thelicato.io/api/v2/ascii?text=${encodeURI(texts[Math.floor(Math.random() * texts.length)])}]`)
        },
        component: FeelingLucky,
        expectedTime: 0.5
    },
    "Credit": {
        func: () => {
            return "Thank You!"
        },
        expectedTime: 0.5,
        component: Credit
    }
}