const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save_ip', (req, res) => {
  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ error: 'Invalid request. IP address is missing.' });
  }

  // IPアドレスを保存
  fs.appendFile('ip_list.txt', ip + '\n', (err) => {
    if (err) {
      console.error('Error saving IP address:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('IP address saved:', ip);
    res.json({ message: 'IP address saved successfully.' });
  });
});

app.get('/ip_list', (req, res) => {
  // 保存されたIPアドレスのリストを取得
  fs.readFile('ip_list.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading IP list:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const ipList = data.split('\n').filter(Boolean);
    res.json({ ipList });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
