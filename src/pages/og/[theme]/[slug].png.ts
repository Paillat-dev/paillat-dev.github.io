import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { createCanvas } from "@napi-rs/canvas";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve } from "path";

const W = 1200,
  H = 630;

const font = readFileSync(resolve("src/assets/fonts/TASAOrbiter-Bold.ttf"));

type Theme = "dark" | "light";

function seededRand(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return () => {
    h ^= h >>> 16;
    h = Math.imul(h, 0x45d9f3b);
    h ^= h >>> 16;
    return (h >>> 0) / 0xffffffff;
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100,
    ln = l / 100,
    a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (ln - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))))
      .toString(16)
      .padStart(2, "0");
  };
  return "#" + f(0) + f(8) + f(4);
}

function seedToColors(seed: string, theme: Theme): string[] {
  const rand = seededRand(seed);
  const base = Math.floor(rand() * 360);
  // Light theme: lower lightness so blobs are visible on a pale bg
  const [sMin, lMin, lRange] = theme === "dark" ? [60, 55, 15] : [50, 35, 20];
  return [0, 90, 180, 270].map((off) =>
    hslToHex(
      (base + off + Math.floor(rand() * 30 - 15) + 360) % 360,
      sMin + Math.floor(rand() * 20),
      lMin + Math.floor(rand() * lRange)
    )
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function renderMesh(colors: string[], seed: string, theme: Theme): Buffer {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = theme === "dark" ? "#0d0d10" : "#f0eff4";
  ctx.fillRect(0, 0, W, H);

  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };

  for (let i = 0; i < 14; i++) {
    const [r, g, b] = hexToRgb(colors[i % colors.length]);
    const x = rand() * W,
      y = rand() * H;
    const rx = (0.35 + rand() * 0.45) * W;
    const ry = (0.35 + rand() * 0.45) * H;
    const radius = Math.max(rx, ry);
    // Light theme uses lower alpha so blobs are subtle, not washed-out
    const alphaBase = theme === "dark" ? 0.55 : 0.3;
    const alpha = alphaBase + rand() * 0.25;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx / radius, ry / radius);

    const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    g2.addColorStop(0, `rgba(${r},${g},${b},${alpha.toFixed(2)})`);
    g2.addColorStop(0.5, `rgba(${r},${g},${b},${(alpha * 0.3).toFixed(2)})`);
    g2.addColorStop(1, `rgba(${r},${g},${b},0)`);

    // Dark: screen/soft-light pops on dark bg. Light: multiply/overlay deepens on pale bg.
    if (theme === "dark") {
      ctx.globalCompositeOperation = i % 3 !== 1 ? "screen" : "soft-light";
    } else {
      ctx.globalCompositeOperation = i % 3 !== 1 ? "multiply" : "overlay";
    }

    ctx.fillStyle = g2;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  }

  // grain
  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rand() - 0.5) * 18;
    img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);

  // vignette — darkens edges on dark, lightens edges on light
  ctx.globalCompositeOperation = "source-over";
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
  if (theme === "dark") {
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.55)");
  } else {
    vig.addColorStop(0, "rgba(255,255,255,0)");
    vig.addColorStop(1, "rgba(255,255,255,0.45)");
  }
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  return canvas.toBuffer("image/png");
}

// --- route ---

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  const themes: Theme[] = ["dark", "light"];
  return posts.flatMap((post) =>
    themes.map((theme) => ({
      params: { theme, slug: post.id },
      props: { title: post.data.title, slug: post.id, theme },
    }))
  );
};

export const GET: APIRoute = async ({ props }) => {
  const { title, slug, theme } = props as { title: string; slug: string; theme: Theme };

  const textColor = theme === "dark" ? "white" : "#1a1a2e";
  const textShadow =
    theme === "dark" ? "0 2px 20px rgba(0,0,0,0.5)" : "0 2px 16px rgba(255,255,255,0.6)";

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          background: "transparent",
        },
        children: [
          {
            type: "p",
            props: {
              style: {
                fontSize: 72,
                fontWeight: 700,
                color: textColor,
                textAlign: "center",
                lineHeight: 1.2,
                textShadow,
              },
              children: title,
            },
          },
        ],
      },
    },
    { width: W, height: H, fonts: [{ name: "Inter", data: font, weight: 700 }] }
  );

  const colors = seedToColors(slug, theme);
  const png = await sharp(renderMesh(colors, slug, theme))
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();

  // @ts-expect-error - this works fine
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
