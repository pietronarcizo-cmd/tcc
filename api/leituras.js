
let ultima = null;

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'POST') {
    const chave = process.env.ESP_KEY;
    if (!chave || req.headers['x-api-key'] !== chave) {
      return res.status(401).json({ erro: 'chave inválida' });
    }
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    b = b || {};
    const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : null);
    ultima = {
      ts: Date.now(),
      temperatura: num(b.temperatura),
      vibracao: num(b.vibracao),
      tensao: num(b.tensao),
      corrente: num(b.corrente),
    };
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json(ultima || {});
};
