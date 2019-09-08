
const mode = process.env.NODE_ENV || 'development'

function getStats() {
  const Stats = require('stats.js');
  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  return stats
}

export default mode !== 'production' ? getStats() : {
  begin: () => null,
  end: () => null,
};
