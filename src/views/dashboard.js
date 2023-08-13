import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBikes } from "../api/data.js";

const dashboardTemplate = (bikes) => html`
    <h2>Available Motorcycles</h2>
    <section id="dashboard">
    ${bikes.length !== 0
      ? html`
      
            ${bikes.map(
              (a) => html`
              <div class="motorcycle">
              <img src="${a.imageUrl}" alt="example1" />
              <h3 class="model">${a.model}</h3>
              <p class="year">Year: ${a.year}</p>
              <p class="mileage">Mileage: ${a.mileage} km.</p>
              <p class="contact">Contact Number: ${a.contact}</p>
              <a class="details-btn" href="/details/${a._id}">More Info</a>
              `
            )}
            </div>
        `
      : html` <h2 class="no-avaliable">No avaliable motorcycles yet.</h2> `}
  </section>
`;

export async function showDashboard(ctx) {
  const bikes = await getAllBikes();

  ctx.render(dashboardTemplate(bikes));
}