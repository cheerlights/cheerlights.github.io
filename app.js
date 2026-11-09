// The CheerLights color right now, from the CheerLights ThingSpeak channel.
// The page works without it: the line stays hidden if the feed cannot be read.
const LIVE_URL = "https://api.thingspeak.com/channels/1417/feeds/last.json";

async function showLiveColor() {
  try {
    const last = await (await fetch(LIVE_URL)).json();
    const name = (last.field1 || "").trim();
    const hex = (last.field2 || "").trim();
    if (!name || !/^#[0-9a-f]{6}$/i.test(hex)) return;
    document.getElementById("live-swatch").style.background = hex;
    document.getElementById("live-text").textContent = `Right now, the CheerLights color is ${name}.`;
    document.getElementById("live").hidden = false;
  } catch {
    // Offline or blocked: leave the line hidden.
  }
}

showLiveColor();
