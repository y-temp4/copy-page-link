import sharp from "sharp";

async function run() {
  const imageSizes = [16, 32, 48, 128];
  await Promise.all(
    imageSizes.map(async (imageSize) => {
      const label = Buffer.from(`
        <svg width="${imageSize}" height="${imageSize}" viewBox="0 0 ${imageSize} ${imageSize}">
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            dy="${imageSize / 2.6}px"
            font-size="${imageSize}px"
            font-family="Helvetica"
            font-weight="bold"
            fill="#212529"
          >
            C
          </text>
        </svg>
      `);
      await sharp({
        create: {
          width: imageSize,
          height: imageSize,
          channels: 3,
          background: "#e9ecef",
        },
      })
        .composite([
          {
            input: label,
          },
        ])
        .png()
        .toFile(`./images/icon${imageSize}.png`);
    })
  );
  console.log("generate images completed!");
}

run();

export {};
