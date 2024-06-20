import multer from "multer";
import multers3 from "multer-s3";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { config } from "@/config";
import QRCode from "qrcode";
import { read } from "fs";

const s3client = new S3Client({
  endpoint: config.spaceEndPoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretKey,
  },
});

export const fileUpload = multer({
  storage: multers3({
    s3: s3client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(
        null,
        `foodie-pos/msquarefdc-batch3/pai-thet${Date.now}_${file.originalname}`
      );
    },
  }),
}).single("file");

export const generateLinkForQrCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const qrCodeUploadImage = async (tableId: number) => {
  try {
    const qrImageData = await QRCode.toDataURL(generateLinkForQrCode(tableId), {
      scale: 20,
    });

    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/msquarefdc-batch3/pai-thet/qrcode/tableId-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3client.send(command);
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/pai-thet/qrcode/tableId-${tableId}.png`;
  } catch (error) {
    console.log(error);
  }
};
