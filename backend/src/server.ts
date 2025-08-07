import express, { type Request, type Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const now = new Date();

  res.status(200).json({
    status: 'success',
    message: 'เชื่อมต่อกับเซิร์ฟเวอร์สำเร็จ',
    data: {
      date: now.toLocaleDateString('th-TH'), 
      time: now.toLocaleTimeString('th-TH'),
      iso: now.toISOString()
    },
    errors: null
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
