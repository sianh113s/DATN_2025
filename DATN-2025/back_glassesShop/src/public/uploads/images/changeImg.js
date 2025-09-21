const fs = require("fs");
const path = require("path");

const folder = "./products"; // thư mục chứa ảnh
const files = fs.readdirSync(folder).filter(f =>
  /\.(jpg)$/i.test(f)
);

files.forEach((file, index) => {
  const ext = path.extname(file).toLowerCase();
  const newName = `image_${index + 1}${ext}`;
  fs.renameSync(
    path.join(folder, file),
    path.join(folder, newName)
  );
});

console.log("Đổi tên xong!");
