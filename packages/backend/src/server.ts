import express from "express";
import { htmlMain } from "./html/htmlMain";
import { PluginSettings } from "types";

const app = express();
app.use(express.json());

app.post("/api/html", async (req, res) => {
  const settings = {
    framework: "HTML",
    showLayerNames: true,
    useOldPluginVersion2025: false,
    responsiveRoot: false,
    flutterGenerationMode: "snippet",
    swiftUIGenerationMode: "snippet",
    roundTailwindValues: true,
    roundTailwindColors: true,
    useColorVariables: true,
    customTailwindPrefix: "",
    embedImages: false,
    embedVectors: false,
    htmlGenerationMode: "html",
    tailwindGenerationMode: "jsx",
    baseFontSize: 16,
    useTailwind4: false,
  };
  let passedContent = req.body.content;
  const result = await htmlMain(
    passedContent,
    {
      ...settings,
      htmlGenerationMode: "styled-components",
    } as PluginSettings,
    true,
  );
  res.json({ success: true, data: result });
});

// Add similar endpoints for tailwind, swiftui, etc.
app.get("/api", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
