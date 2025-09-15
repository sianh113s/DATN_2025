module.exports = {
  port: process.env.SERVER_PORT || 8000,
  prefixApiVerSion: "/api/v1",
  baseImageUrl: process.env.BASE_IMAGE_URL || `${__dirname}/../src/apps/public/uploads/images`,
  jwtAccessKey: process.env.JWT_ACCESS_KEY || "sunglashop-access-key",
  jwtRefreshKey: process.env.JWT_REFRESH_KEY || "sunglashop-refresh-key"
};