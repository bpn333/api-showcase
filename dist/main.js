#!/usr/bin/env node

// main.jsx
import React11 from "react";
import { render } from "ink";

// src/App.jsx
import React10, { useRef, useState as useState5 } from "react";
import { Box as Box7, Text as Text10, useInput as useInput4 } from "ink";

// config.js
var THEME = {
  box: {
    heading: {
      borderStyle: "round",
      borderColor: "greenBright",
      paddingX: 1,
      alignSelf: "flex-start"
    }
  },
  text: {
    info: {
      color: "blue"
    },
    title: {
      color: "whiteBright"
    }
  }
};

// src/components/FakeProgress.jsx
import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
function Loader({
  func,
  expectedTime = 4,
  onRes
}) {
  const total = 50;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const dta = await func();
      setProgress(total);
      onRes(dta);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const intervalMs = expectedTime * 1e3 / total;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= total - 1) {
          clearInterval(timer);
          return total;
        }
        return p + 1;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [expectedTime]);
  const bar = "\u2588".repeat(progress) + "\u2591".repeat(total - progress);
  const percent = Math.round(progress / total * 100);
  return /* @__PURE__ */ React.createElement(Box, { marginY: 1 }, /* @__PURE__ */ React.createElement(Text, { color: total * 0.8 < progress ? "green" : total * 0.3 < progress ? "yellow" : "red" }, bar), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, " ", percent, "%"));
}

// src/components/SelectInput.jsx
import React2, { useState as useState2 } from "react";
import { Box as Box2, Text as Text2, useInput } from "ink";
function SelectInput_default({ options, onSelect }) {
  const [index, setIndex] = useState2(0);
  useInput((input, key) => {
    if (key.upArrow) setIndex((i) => Math.max(0, i - 1));
    if (key.downArrow) setIndex((i) => Math.min(options.length - 1, i + 1));
    if (key.return) {
      onSelect(options[index]);
    }
  });
  return /* @__PURE__ */ React2.createElement(Box2, { flexDirection: "column" }, options.map((opt, i) => /* @__PURE__ */ React2.createElement(Text2, { key: opt, color: i === index ? "green" : "gray" }, i === index ? "\u25B6  " : "   ", opt)));
}

// src/components/FillInput.jsx
import React4, { useState as useState4 } from "react";

// src/components/TextInput.jsx
import React3, { useState as useState3 } from "react";
import { Box as Box3, Text as Text3, useInput as useInput2 } from "ink";
function TextInput({ value = "", onChange, onSubmit }) {
  const [internal, setInternal] = useState3(value);
  useInput2((input, key) => {
    if (key.return) {
      onSubmit == null ? void 0 : onSubmit(internal);
      return;
    }
    if (key.backspace || key.delete) {
      const next = internal.slice(0, -1);
      setInternal(next);
      onChange == null ? void 0 : onChange(next);
      return;
    }
    if (!key.ctrl && !key.meta) {
      const next = internal + input;
      setInternal(next);
      onChange == null ? void 0 : onChange(next);
    }
  });
  return /* @__PURE__ */ React3.createElement(Box3, null, /* @__PURE__ */ React3.createElement(Text3, { color: "cyan" }, internal), /* @__PURE__ */ React3.createElement(Text3, { color: "green" }, "\u258C"));
}

// src/components/FillInput.jsx
import { Box as Box4, Text as Text4 } from "ink";
function FillInput({ inputs, onFill }) {
  const [currentIndex, setCurrentIndex] = useState4(0);
  const [values, setValues] = useState4({});
  const currentInput = inputs[currentIndex];
  const handleSubmit = (value) => {
    const newValues = { ...values, [currentInput.key]: value };
    setValues(newValues);
    if (currentIndex < inputs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFill(newValues);
    }
  };
  return /* @__PURE__ */ React4.createElement(Box4, { flexDirection: "column" }, /* @__PURE__ */ React4.createElement(Text4, null, currentInput.label), currentInput.type == "select" ? /* @__PURE__ */ React4.createElement(
    SelectInput_default,
    {
      options: currentInput.options,
      onSelect: handleSubmit
    }
  ) : /* @__PURE__ */ React4.createElement(
    TextInput,
    {
      value: values[currentInput.key] || "",
      onChange: (value) => setValues({ ...values, [currentInput.key]: value }),
      onSubmit: handleSubmit
    }
  ));
}

// src/API/RandomQuote.jsx
import React5 from "react";
import { Box as Box5, Text as Text5 } from "ink";
function RandomQuote({ result }) {
  if (result.error) {
    return /* @__PURE__ */ React5.createElement(Text5, { color: "red" }, JSON.stringify(result, null, 5));
  }
  return /* @__PURE__ */ React5.createElement(
    Box5,
    {
      flexDirection: "column",
      gap: 1,
      width: 80,
      borderStyle: "round",
      borderColor: "cyanBright",
      padding: 1,
      justifyContent: "flex-start"
    },
    /* @__PURE__ */ React5.createElement(Text5, { color: "yellowBright" }, result.quote),
    /* @__PURE__ */ React5.createElement(Box5, { justifyContent: "flex-end", marginTop: 1 }, /* @__PURE__ */ React5.createElement(Text5, { color: "magentaBright" }, result.author))
  );
}

// src/API/RandomAnime.jsx
import open from "open";
import React6 from "react";
import { Box as Box6, Text as Text6, useInput as useInput3 } from "ink";
function RandomAnime({ result }) {
  var _a, _b;
  useInput3((inpt, key) => {
    if (inpt == "o")
      open(result.url);
  }, { isActive: !result.error });
  if (result.error) {
    return /* @__PURE__ */ React6.createElement(Text6, { color: "red" }, "ERROR FETCHING ", result.url);
  }
  return /* @__PURE__ */ React6.createElement(
    Box6,
    {
      flexDirection: "column",
      gap: 1,
      width: 80,
      borderStyle: "round",
      borderColor: "cyanBright",
      padding: 1,
      justifyContent: "flex-start"
    },
    /* @__PURE__ */ React6.createElement(Text6, { ...THEME.text.info }, "Press 'o' to open anime page"),
    /* @__PURE__ */ React6.createElement(
      Text6,
      {
        color: "yellowBright"
      },
      "Name: ",
      (_a = result.titles) == null ? void 0 : _a.map((n, indx) => {
        var _a2;
        const repeatCount = 3;
        if (indx == ((_a2 = result == null ? void 0 : result.titles) == null ? void 0 : _a2.length) - 1)
          return n.title;
        else
          return n.title + " ".repeat(repeatCount) + "|" + " ".repeat(repeatCount);
      })
    ),
    /* @__PURE__ */ React6.createElement(
      Text6,
      {
        color: "magentaBright"
      },
      "Genres: ",
      result.genres.map((nm) => " " + nm.name)
    ),
    /* @__PURE__ */ React6.createElement(
      Text6,
      {
        color: "whiteBright"
      },
      "Score: ",
      result.score,
      " | Popularity: ",
      result.popularity
    ),
    /* @__PURE__ */ React6.createElement(
      Text6,
      {
        color: "green"
      },
      "Episodes: ",
      result.episodes,
      " | Status: ",
      result.status
    ),
    /* @__PURE__ */ React6.createElement(
      Text6,
      {
        color: "gray"
      },
      "Aired On: ",
      (_b = result.aired) == null ? void 0 : _b.string
    )
  );
}

// src/API/IPInfo.jsx
import React7 from "react";
import { Text as Text7 } from "ink";
function IPInfo({ result }) {
  if (result.error) {
    return /* @__PURE__ */ React7.createElement(Text7, { color: "red" }, JSON.stringify(result, null, 5));
  }
  return /* @__PURE__ */ React7.createElement(Text7, null, JSON.stringify(result, null, 5));
}

// src/API/FeelingLucky.jsx
import React8 from "react";
import { Text as Text8 } from "ink";
function FeelingLucky({ result }) {
  return /* @__PURE__ */ React8.createElement(Text8, null, result);
}

// src/API/Credit.jsx
import open2 from "open";
import React9, { useEffect as useEffect2 } from "react";
import { Text as Text9 } from "ink";
function Credit({ result }) {
  useEffect2(() => {
    open2("https://github.com/bpn333");
  }, []);
  return /* @__PURE__ */ React9.createElement(Text9, null, result);
}

// src/API/COMMANDS_MAP.js
var COMMANDS_MAP_default = {
  "Get Random Quote": {
    func: () => fetch("https://quotes-api-self.vercel.app/quote").then((r) => r.json()).catch((e) => ({
      error: "Request Failed",
      url: "https://quotes-api-self.vercel.app/quote"
    })),
    component: RandomQuote,
    expectedTime: 0.8
  },
  "Get Random Anime to Watch": {
    func: () => fetch("https://api.jikan.moe/v4/random/anime").then((r) => r.json()).then((d) => {
      if (!d.data) throw Error();
      const dataa = d.data;
      const dta = {
        url: dataa.url,
        titles: dataa.titles,
        genres: dataa.genres,
        status: dataa.status,
        episodes: dataa.episodes,
        aired: dataa.aired,
        score: dataa.score,
        popularity: dataa.popularity
      };
      return dta;
    }).catch((e) => ({
      error: "Request Failed",
      url: "https://api.jikan.moe/v4/random/anime"
    })),
    component: RandomAnime,
    expectedTime: 1.3
  },
  "IP Info": {
    func: async (inpts) => {
      return fetch(`https://ipinfo.io/${inpts.ip}/json`, {
        headers: {
          "Accept": "application/json"
        }
      }).then((r) => r.json()).catch((e) => ({
        error: "Request Failed",
        url: `https://ipinfo.io/${inpts.ip}`
      }));
    },
    component: IPInfo,
    expectedTime: 1,
    inputs: [
      { label: "IP [Empty for yours]", key: "ip" }
    ]
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
        "Today\u2019s Pick",
        "Quick Smile",
        "Wildcard",
        "Let\u2019s Go",
        "Unexpected",
        "Fortune Time",
        "Click Fate",
        "Random Joy"
      ];
      return fetch(`https://asciified.thelicato.io/api/v2/ascii?text=${encodeURI(texts[Math.floor(Math.random() * texts.length)])}`).then((r) => r.text()).catch((e) => "REQUEST FAILED [https://asciified.thelicato.io/api/v2/ascii?text=bpn333]");
    },
    component: FeelingLucky,
    expectedTime: 0.5
  },
  "Credit": {
    func: () => {
      return "Thank You!";
    },
    expectedTime: 0.5,
    component: Credit
  }
};

// src/App.jsx
function App_default() {
  const [command, setCommand] = useState5();
  const [commandInputs, setCommandInputs] = useState5(null);
  const [result, setResult] = useState5();
  const refreshToken = useRef(0);
  useInput4(
    (inpt, key) => {
      if (inpt == "q" || key.escape) {
        setCommand(null);
        setCommandInputs(null);
        setResult("");
      } else if (inpt == "r") {
        setResult("");
        refreshToken.current += 1;
      }
    },
    {
      isActive: result
    }
  );
  if (!process.stdout.isTTY) {
    console.log("SORRY CANT RUN HERE");
    return;
  }
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(Box7, { marginTop: 2, marginBottom: 1, marginLeft: 2, ...THEME.box.heading }, /* @__PURE__ */ React10.createElement(Text10, { ...THEME.text.title }, "api-showcase")), command ? COMMANDS_MAP_default[command].inputs && !commandInputs ? /* @__PURE__ */ React10.createElement(FillInput, { inputs: COMMANDS_MAP_default[command].inputs, onFill: (dta) => setCommandInputs(dta) }) : /* @__PURE__ */ React10.createElement(
    Loader,
    {
      func: commandInputs ? async () => COMMANDS_MAP_default[command].func(commandInputs) : COMMANDS_MAP_default[command].func,
      expectedTime: COMMANDS_MAP_default[command].expectedTime,
      onRes: (d) => {
        setResult(React10.createElement(COMMANDS_MAP_default[command].component, { result: d }));
      },
      key: refreshToken.current
    }
  ) : /* @__PURE__ */ React10.createElement(SelectInput_default, { options: Object.keys(COMMANDS_MAP_default), onSelect: (d) => setCommand(d) }), result && /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(Box7, null, result), /* @__PURE__ */ React10.createElement(Box7, { marginY: 1 }, /* @__PURE__ */ React10.createElement(Text10, { ...THEME.text.info }, "[q|esc] to quit -:|:- [r] to redo"))));
}

// main.jsx
render(/* @__PURE__ */ React11.createElement(App_default, null));
