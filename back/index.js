import 'dotenv/config'
import { app } from "./src/app";

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`불도저 지우 화이팅!! 火炎㷋 (ง •̀_•́)ง  http://localhost:${PORT}`);
});
