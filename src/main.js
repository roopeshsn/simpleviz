const selector = document.getElementById('assetSelector');

// Registering plugins
const plugins = {};
function registerPlugin(plugin) {
  if (!plugin.id || !plugin.fetchData) {
    throw new Error("Invalid plugin: must have id and fetchData()");
  }
  plugins[plugin.id] = plugin;

  // Add an option to dropdown
  const option = document.createElement("option");
  option.value = plugin.id;
  option.textContent = plugin.label;
  selector.appendChild(option);
}

// Triggered on input change in the dropdown
selector.addEventListener("change", async function () {
  const pluginId = this.value;
  if (!pluginId || !plugins[pluginId]) return;

  const data = await plugins[pluginId].fetchData();
  drawChart(data, plugins[pluginId].label);
});

// Rendering the chart
const ctx = document.getElementById('priceChart').getContext('2d');
let chart;

function drawChart(data, label) {
  const labels = data.map(item => item.date);
  const prices = data.map(item => item.price);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data: prices,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price'
          }
        }
      }
    }
  });
}