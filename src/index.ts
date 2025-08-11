import { app } from "./server";

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API running on http://localhost:${PORT}`);
});


