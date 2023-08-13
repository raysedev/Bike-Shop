import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBikes } from "../api/data.js";

const searchTemplate = (onSearch, bikes) => html`
<section id="search">
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
    : html` 
    <h4 id="result-heading">Results:</h4>
          <div class="search-result">
         <h2 class="no-avaliable">No result.</h2>
    `}
</section>
`;

export async function showSearch(ctx) {

    const bikes = await getAllBikes();

  ctx.render(searchTemplate(onSearch, bikes));

  async function onSearch() {
    console.log(`search`);
  }

  
}