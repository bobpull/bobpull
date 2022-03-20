import 'dotenv/config'
import { app } from "./src/app";

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`재익아 오늘도 좋은 하루 보내(ง •̀_•́)ง  http://localhost:${PORT}`);
});
