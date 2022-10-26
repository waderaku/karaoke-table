import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const S3_BUCKET = "anime-quiz-wmw";
const REGION = "ap-northeast-1";
const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev/";

const ACCESS_KEY = "AKIA54ZSWNJJ4B4SQIGP";
const SECRET_KEY = "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";

const myBucket = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});
export const registerImage = async (file: any, imageName: string) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };
  myBucket.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: "images/" + imageName + ".jpg",
      Body: file,
    })
  );
  return "result";
};
