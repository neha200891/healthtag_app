const multer = require("multer");
const uuid = require("uuid");
const Path = require("path");
const config = require("config");
const fs = require("fs");

exports.uploadFile = async (req, folder = "/") => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `assets/${folder}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4() + file.originalname.replace(/\s/g, ""));
    },
  });

  var upload = multer({ storage: storage }).any();
  return new Promise((resolve, reject) => {
    upload(req, (res = null), async function (err) {
      if (err) reject(err);
      console.log(req.files);
      if (req.files) {
        const length = req.files.length;
        if (length === 1) {
          resolve({
            body: req.body,
            file: {
              ...req.files[0],
              path: config.get("App.baseUrl.backEndUrl") + req.files[0].path,
              length: 1,
            },
          });
        } else {
          resolve({
            body: req.body,
            file: req.files.map((image) => {
              let path = config.get("App.baseUrl.backEndUrl") + image.path;
              return { ...image, path: path };
            }),
          });
        }
      }
    });
  });
};

exports.removeFile = (file) => {
  if (!file) {
    console.log("no file");
    return;
  }
  const path = Path.join(__dirname, "../", file.replace(config.get("App.baseUrl.backEndUrl"), ""));
  console.log("remove file path", path);
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      console.log(err);
    });
    return "success";
  }
  return "doesn't exist";
};

exports.validationFileObj = (file) => {
  let fields = new Object();
  if (file instanceof Array) {
    file.map((each) => {
      fields[each.fieldname] = each.path;
    });
  } else {
    fields[file.fieldname] = file.path;
  }
  return fields;
};

//upload file in node js without multer?
