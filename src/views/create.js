import { html } from "../../node_modules/lit-html/lit-html.js";
import { createBike } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>
`;

export function showCreate(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (
      !data.model ||
      !data.year ||
      !data.mileage ||
      !data.imageUrl ||
      !data.contact ||
      !data.about
    ) {
      return;
    }

    try {
      await createBike(data);

      ctx.page.redirect("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  }
}